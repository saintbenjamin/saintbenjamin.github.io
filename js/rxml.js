/* js/rxml.js (XSLT-free renderer) */

function toggleMenu() {
  const menu = document.querySelector(".menu");
  if (!menu) return;

  menu.classList.toggle("open");

  const menuItems = document.querySelectorAll(".menu a");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });
}

const ATOM_NS = "http://www.w3.org/2005/Atom";
const ARXIV_NS = "http://arxiv.org/schemas/atom";

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function clear(node) {
  if (!node) return;
  while (node.firstChild) node.removeChild(node.firstChild);
}

function firstNS(parent, ns, localName) {
  if (!parent) return null;
  const list = parent.getElementsByTagNameNS(ns, localName);
  return list && list.length ? list[0] : null;
}

function childrenNS(parent, ns, localName) {
  if (!parent) return [];
  const out = [];
  for (let i = 0; i < parent.childNodes.length; i++) {
    const n = parent.childNodes[i];
    if (
      n.nodeType === 1 &&
      n.namespaceURI === ns &&
      n.localName === localName
    ) {
      out.push(n);
    }
  }
  return out;
}

function nodeTextNS(parent, ns, localName) {
  const n = firstNS(parent, ns, localName);
  return n ? (n.textContent || "").trim() : "";
}

function nodeLinkAttrNS(parent, ns, localName) {
  const n = firstNS(parent, ns, localName);
  if (!n) return "";
  return (n.getAttribute("link") || "").trim();
}

function appendLinkedText(parent, textValue, linkValue) {
  const text = (textValue || "").trim();
  const link = (linkValue || "").trim();

  if (link) {
    const a = document.createElement("a");
    a.href = link;
    a.target = "_blank";
    a.textContent = text;
    parent.appendChild(a);
  } else {
    parent.appendChild(document.createTextNode(text));
  }
}

function appendUnderlinedAuthor(parent, authorText) {
  const t = authorText || "";
  const key = "Benjamin J. Choi";
  const idx = t.indexOf(key);

  if (idx < 0) {
    parent.appendChild(document.createTextNode(t));
    return;
  }

  const before = t.slice(0, idx);
  const after = t.slice(idx + key.length);

  if (before) parent.appendChild(document.createTextNode(before));

  const span = document.createElement("span");
  span.style.textDecoration = "underline";
  span.textContent = key;
  parent.appendChild(span);

  if (after) parent.appendChild(document.createTextNode(after));
}

async function loadAndRenderXML(xmlUrl, containerId, rendererFn) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const xmlResponse = await fetch(xmlUrl);
    if (!xmlResponse.ok) {
      throw new Error(`Failed to load XML: ${xmlResponse.statusText}`);
    }

    const xmlText = await xmlResponse.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    clear(container);
    rendererFn(xmlDoc, container);

    if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
      await window.MathJax.typesetPromise();
    } else if (window.MathJax && typeof window.MathJax.typeset === "function") {
      window.MathJax.typeset();
    }
  } catch (error) {
    console.error("Error rendering XML:", error);
    container.textContent = "Error loading and rendering XML.";
  }
}

/* ===== Renderers (mirroring each XSL exactly) ===== */

function renderBio(xmlDoc, container) {
  const feed = firstNS(xmlDoc, ATOM_NS, "feed");
  if (!feed) return;

  const entries = childrenNS(feed, ATOM_NS, "entry");

  const ulOuter = el("ul", "no-bullets");

  entries.forEach((entry) => {
    const title = nodeTextNS(entry, ATOM_NS, "title");
    const titleLink = nodeLinkAttrNS(entry, ATOM_NS, "title");

    const liTitle = el("li", "outlined-text-semibig");
    appendLinkedText(liTitle, title, titleLink);
    ulOuter.appendChild(liTitle);

    const ulItemsWrap = el("ul", "outlined-text no-bullets");

    const itemS = firstNS(entry, ATOM_NS, "item_s");
    const items = itemS ? childrenNS(itemS, ATOM_NS, "item") : [];

    items.forEach((item) => {
      const ulItem = el("ul", "outlined-text no-bullets");
      const li = el("li");

      const itTitle = nodeTextNS(item, ATOM_NS, "title");
      const itTitleLink = nodeLinkAttrNS(item, ATOM_NS, "title");
      appendLinkedText(li, itTitle, itTitleLink);

      ulItem.appendChild(li);
      ulItemsWrap.appendChild(ulItem);
    });

    ulOuter.appendChild(ulItemsWrap);
  });

  container.appendChild(ulOuter);
}

function renderEdu(xmlDoc, container) {
  const feed = firstNS(xmlDoc, ATOM_NS, "feed");
  if (!feed) return;

  const entries = childrenNS(feed, ATOM_NS, "entry");
  const ulOuter = el("ul", "outlined-text no-bullets");

  entries.forEach((entry) => {
    const title = nodeTextNS(entry, ATOM_NS, "title");
    const titleLink = nodeLinkAttrNS(entry, ATOM_NS, "title");

    const liTitle = el("li", "outlined-text-semibig");
    appendLinkedText(liTitle, title, titleLink);
    ulOuter.appendChild(liTitle);

    const ulDetail = el("ul", "no-bullets");

    const supervisorLi = el("li");
    appendLinkedText(
      supervisorLi,
      nodeTextNS(entry, ATOM_NS, "supervisor"),
      nodeLinkAttrNS(entry, ATOM_NS, "supervisor")
    );
    ulDetail.appendChild(supervisorLi);

    const titleJpLi = el("li");
    appendLinkedText(
      titleJpLi,
      nodeTextNS(entry, ATOM_NS, "title_jp"),
      nodeLinkAttrNS(entry, ATOM_NS, "title_jp")
    );
    ulDetail.appendChild(titleJpLi);

    const locationLi = el("li");
    appendLinkedText(
      locationLi,
      nodeTextNS(entry, ATOM_NS, "location"),
      nodeLinkAttrNS(entry, ATOM_NS, "location")
    );
    ulDetail.appendChild(locationLi);

    const dateLi = el("li");
    appendLinkedText(
      dateLi,
      nodeTextNS(entry, ATOM_NS, "date"),
      nodeLinkAttrNS(entry, ATOM_NS, "date")
    );
    ulDetail.appendChild(dateLi);

    ulOuter.appendChild(ulDetail);
    ulOuter.appendChild(document.createElement("br"));
  });

  container.appendChild(ulOuter);
}

function renderExp(xmlDoc, container) {
  const feed = firstNS(xmlDoc, ATOM_NS, "feed");
  if (!feed) return;

  const entries = childrenNS(feed, ATOM_NS, "entry");
  const ulOuter = el("ul", "outlined-text no-bullets");

  entries.forEach((entry) => {
    const title = nodeTextNS(entry, ATOM_NS, "title");
    const titleLink = nodeLinkAttrNS(entry, ATOM_NS, "title");

    const liTitle = el("li", "outlined-text-semibig");
    appendLinkedText(liTitle, title, titleLink);
    ulOuter.appendChild(liTitle);

    const ulDetail = el("ul", "no-bullets");

    const titleJpLi = el("li");
    appendLinkedText(
      titleJpLi,
      nodeTextNS(entry, ATOM_NS, "title_jp"),
      nodeLinkAttrNS(entry, ATOM_NS, "title_jp")
    );
    ulDetail.appendChild(titleJpLi);

    const locationLi = el("li");
    appendLinkedText(
      locationLi,
      nodeTextNS(entry, ATOM_NS, "location"),
      nodeLinkAttrNS(entry, ATOM_NS, "location")
    );
    ulDetail.appendChild(locationLi);

    const descLi = el("li");
    appendLinkedText(
      descLi,
      nodeTextNS(entry, ATOM_NS, "desc"),
      nodeLinkAttrNS(entry, ATOM_NS, "desc")
    );
    ulDetail.appendChild(descLi);

    const dateLi = el("li");
    appendLinkedText(
      dateLi,
      nodeTextNS(entry, ATOM_NS, "date"),
      nodeLinkAttrNS(entry, ATOM_NS, "date")
    );
    ulDetail.appendChild(dateLi);

    ulOuter.appendChild(ulDetail);
    ulOuter.appendChild(document.createElement("br"));
  });

  container.appendChild(ulOuter);
}

function renderHonor(xmlDoc, container) {
  const feed = firstNS(xmlDoc, ATOM_NS, "feed");
  if (!feed) return;

  const entries = childrenNS(feed, ATOM_NS, "entry");
  const ulOuter = el("ul", "outlined-text no-bullets");

  entries.forEach((entry) => {
    const title = nodeTextNS(entry, ATOM_NS, "title");

    const liTitle = el("li", "outlined-text-semibig");
    liTitle.textContent = title;
    ulOuter.appendChild(liTitle);

    const ulDetail = el("ul", "no-bullets");

    const titleJpLi = el("li");
    titleJpLi.textContent = nodeTextNS(entry, ATOM_NS, "title_jp");
    ulDetail.appendChild(titleJpLi);

    const dateLi = el("li");
    dateLi.textContent = nodeTextNS(entry, ATOM_NS, "date");
    ulDetail.appendChild(dateLi);

    ulOuter.appendChild(ulDetail);
    ulOuter.appendChild(document.createElement("br"));
  });

  container.appendChild(ulOuter);
}

function renderJesus(xmlDoc, container) {
  const feed = firstNS(xmlDoc, ATOM_NS, "feed");
  if (!feed) return;

  const entries = childrenNS(feed, ATOM_NS, "entry");
  const ulOuter = el("ul", "outlined-text no-bullets");

  entries.forEach((entry) => {
    const liEn = el("li");
    appendLinkedText(
      liEn,
      nodeTextNS(entry, ATOM_NS, "word_en"),
      nodeLinkAttrNS(entry, ATOM_NS, "word_en")
    );
    ulOuter.appendChild(liEn);

    const liJp = el("li");
    appendLinkedText(
      liJp,
      nodeTextNS(entry, ATOM_NS, "word_jp"),
      nodeLinkAttrNS(entry, ATOM_NS, "word_jp")
    );
    ulOuter.appendChild(liJp);

    ulOuter.appendChild(document.createElement("br"));
  });

  container.appendChild(ulOuter);
}

function renderLink(xmlDoc, container) {
  const feed = firstNS(xmlDoc, ATOM_NS, "feed");
  if (!feed) return;

  const entries = childrenNS(feed, ATOM_NS, "entry");
  const ulOuter = el("ul", "no-bullets");

  entries.forEach((entry) => {
    const title = nodeTextNS(entry, ATOM_NS, "title");
    const titleLink = nodeLinkAttrNS(entry, ATOM_NS, "title");

    const liTitle = el("li", "outlined-text-semibig");
    appendLinkedText(liTitle, title, titleLink);
    ulOuter.appendChild(liTitle);

    const ulItemsWrap = el("ul", "outlined-text no-bullets");

    const itemS = firstNS(entry, ATOM_NS, "item_s");
    const items = itemS ? childrenNS(itemS, ATOM_NS, "item") : [];

    items.forEach((item) => {
      const ulItem = el("ul", "outlined-text no-bullets");

      const liItemTitle = el("li");
      appendLinkedText(
        liItemTitle,
        nodeTextNS(item, ATOM_NS, "title"),
        nodeLinkAttrNS(item, ATOM_NS, "title")
      );
      ulItem.appendChild(liItemTitle);

      const ulDesc = el("ul", "outlined-text no-bullets");
      const liDesc = el("li");
      appendLinkedText(
        liDesc,
        nodeTextNS(item, ATOM_NS, "desc"),
        nodeLinkAttrNS(item, ATOM_NS, "desc")
      );
      ulDesc.appendChild(liDesc);

      ulItem.appendChild(ulDesc);
      ulItemsWrap.appendChild(ulItem);
    });

    ulOuter.appendChild(ulItemsWrap);
  });

  container.appendChild(ulOuter);
}

function renderTalk(xmlDoc, container) {
  const feed = firstNS(xmlDoc, ATOM_NS, "feed");
  if (!feed) return;

  const entries = childrenNS(feed, ATOM_NS, "entry");

  // XSL: <ol> ... <xsl:apply-templates/> ... </ol>
  // So the outer list must be <ol> to get 1., 2., 3. numbering.
  const olOuter = document.createElement("ol");

  entries.forEach((entry) => {
    const title = nodeTextNS(entry, ATOM_NS, "title");
    const titleLink = nodeLinkAttrNS(entry, ATOM_NS, "title");

    const liTitle = el("li", "outlined-text-semibig");
    appendLinkedText(liTitle, title, titleLink);
    olOuter.appendChild(liTitle);

    // XSL: <ul class="outlined-text no-bullets"> ... </ul>
    const ulDetail = el("ul", "outlined-text no-bullets");

    const updatedLi = el("li");
    updatedLi.textContent = nodeTextNS(entry, ATOM_NS, "updated");
    ulDetail.appendChild(updatedLi);

    const authorLi = el("li");
    appendUnderlinedAuthor(authorLi, nodeTextNS(entry, ATOM_NS, "author"));
    ulDetail.appendChild(authorLi);

    const confEnLi = el("li");
    appendLinkedText(
      confEnLi,
      nodeTextNS(entry, ATOM_NS, "conf_en"),
      nodeLinkAttrNS(entry, ATOM_NS, "conf_en")
    );
    ulDetail.appendChild(confEnLi);

    const confJpLi = el("li");
    appendLinkedText(
      confJpLi,
      nodeTextNS(entry, ATOM_NS, "conf_jp"),
      nodeLinkAttrNS(entry, ATOM_NS, "conf_jp")
    );
    ulDetail.appendChild(confJpLi);

    const locEnLi = el("li");
    appendLinkedText(
      locEnLi,
      nodeTextNS(entry, ATOM_NS, "loc_en"),
      nodeLinkAttrNS(entry, ATOM_NS, "loc_en")
    );
    ulDetail.appendChild(locEnLi);

    const locJpLi = el("li");
    appendLinkedText(
      locJpLi,
      nodeTextNS(entry, ATOM_NS, "loc_jp"),
      nodeLinkAttrNS(entry, ATOM_NS, "loc_jp")
    );
    ulDetail.appendChild(locJpLi);

    const sessionLi = el("li");
    sessionLi.textContent = nodeTextNS(entry, ATOM_NS, "session");
    ulDetail.appendChild(sessionLi);

    olOuter.appendChild(ulDetail);
    olOuter.appendChild(document.createElement("br"));
  });

  container.appendChild(olOuter);
}

function renderPub(xmlDoc, container) {
  const feed = firstNS(xmlDoc, ATOM_NS, "feed");
  if (!feed) return;

  const entries = childrenNS(feed, ATOM_NS, "entry");
  const ulOuter = el("ul", "outlined-text no-bullets");

  entries.forEach((entry) => {
    const title = nodeTextNS(entry, ATOM_NS, "title");
    const idUrl = nodeTextNS(entry, ATOM_NS, "id");

    const liTitle = el("li", "outlined-text-semibig");
    appendLinkedText(liTitle, title, idUrl);
    ulOuter.appendChild(liTitle);

    const ulDetail = el("ul", "no-bullets");

    const updatedLi = el("li");
    updatedLi.textContent = nodeTextNS(entry, ATOM_NS, "updated");
    ulDetail.appendChild(updatedLi);

    const authorLi = el("li");
    appendUnderlinedAuthor(authorLi, nodeTextNS(entry, ATOM_NS, "author"));
    ulDetail.appendChild(authorLi);

    const journalRefText = nodeTextNS(entry, ARXIV_NS, "journal_ref");
    const doiUrl = nodeTextNS(entry, ATOM_NS, "doi");
    const pdfUrl = nodeTextNS(entry, ATOM_NS, "pdf");

    const journalLi = el("li");
    if (doiUrl) {
      appendLinkedText(journalLi, journalRefText, doiUrl);
    } else if (pdfUrl) {
      appendLinkedText(journalLi, journalRefText, pdfUrl);
    } else {
      journalLi.textContent = journalRefText;
    }
    ulDetail.appendChild(journalLi);

    ulOuter.appendChild(ulDetail);
    ulOuter.appendChild(document.createElement("br"));
  });

  container.appendChild(ulOuter);
}

/* ===== Wire-up (same calls as before, but without XSL path) ===== */

loadAndRenderXML("xml/jesus.xml", "jesus-container", renderJesus);
loadAndRenderXML("xml/bio.xml", "bio-container", renderBio);
loadAndRenderXML("xml/edu.xml", "edu-container", renderEdu);
loadAndRenderXML("xml/exp.xml", "exp-container", renderExp);
loadAndRenderXML("xml/honor.xml", "honor-container", renderHonor);
// loadAndRenderXML("xml/pub.xml", "pub-container", renderPub);
loadAndRenderXML("xml/talk.xml", "talk-container", renderTalk);
loadAndRenderXML("xml/link.xml", "link-container", renderLink);