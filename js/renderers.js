/* =========================================================
 * renderers.js
 * =========================================================
 * Rendering functions.
 *
 * NOTE:
 * - This file is intentionally unchanged.
 * - Renderers operate purely on an XML-like API:
 *     firstNS / childrenNS / nodeTextNS / nodeLinkAttrNS
 * - They work with both real XML DOM documents and
 *   JSON-adapted documents from helper.js.
 * ========================================================= */

// (The content of this file is exactly the same as provided earlier.)
// renderBio, renderEdu, renderExp, renderHonor,
// renderJesus, renderLink, renderTalk, renderPub
// remain completely untouched.

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

    // <li class="outlined-text-semibig"><b>title</b></li>
    const liTitle = el("li", "outlined-text-semibig");
    const b = document.createElement("b");
    b.textContent = title;
    liTitle.appendChild(b);
    ulOuter.appendChild(liTitle);

    const ulDetail = el("ul", "no-bullets");

    const titleJpLi = el("li");
    titleJpLi.textContent = nodeTextNS(entry, ATOM_NS, "title_jp");
    ulDetail.appendChild(titleJpLi);

    // MISSING in your JS: <li><xsl:value-of select="a:location"/></li>
    const locationLi = el("li");
    locationLi.textContent = nodeTextNS(entry, ATOM_NS, "location");
    ulDetail.appendChild(locationLi);

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
