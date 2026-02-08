/* =========================================================
 * helper.js
 * =========================================================
 * Shared helper utilities.
 *
 * This file extends the original XML helper functions
 * so that the same renderers can consume:
 *   - real XML DOM nodes, or
 *   - JSON data adapted into "XML-like" nodes.
 *
 * IMPORTANT:
 * - Rendering logic is NOT modified.
 * - Renderers continue to use firstNS / childrenNS /
 *   nodeTextNS / nodeLinkAttrNS exactly as before.
 * - JSON is wrapped to behave like a minimal DOM tree.
 * ========================================================= */

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function clear(node) {
  if (!node) return;
  while (node.firstChild) node.removeChild(node.firstChild);
}

/* ---------- JSON adapter node ----------
 *
 * JsonNode is a minimal object that mimics the subset of
 * the DOM API used by existing renderers.
 *
 * Supported properties / methods:
 *   - nodeType === 1
 *   - namespaceURI
 *   - localName
 *   - childNodes[]
 *   - textContent (getter)
 *   - getAttribute(name)
 *   - getElementsByTagNameNS(ns, localName)
 *
 * This allows existing XML-based renderers to operate
 * on JSON data without any modification.
 */

function makeJsonNode(obj, ns, localName) {
  const n = {
    nodeType: 1,
    namespaceURI: ns || "",
    localName: localName || "",
    _text: "",
    _attrs: {},
    childNodes: [],
    getAttribute(name) {
      const v = this._attrs && this._attrs[name];
      return v == null ? "" : String(v);
    },
    getElementsByTagNameNS(searchNs, searchLocal) {
      const out = [];
      function dfs(node) {
        if (!node || node.nodeType !== 1) return;
        if (node.namespaceURI === searchNs && node.localName === searchLocal) {
          out.push(node);
        }
        const kids = node.childNodes || [];
        for (let i = 0; i < kids.length; i++) dfs(kids[i]);
      }
      dfs(this);
      return out;
    },
  };

  Object.defineProperty(n, "textContent", {
    get() {
      return this._text || "";
    },
  });

  // Primitive values become text nodes
  if (obj == null) return n;
  if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
    n._text = String(obj);
    return n;
  }
  if (typeof obj !== "object") return n;

  // Explicit text / attributes
  if (obj._text != null) n._text = String(obj._text);
  if (obj._attrs && typeof obj._attrs === "object") n._attrs = { ...obj._attrs };

  // Explicit children list
  if (Array.isArray(obj._children)) {
    n.childNodes = obj._children.filter(Boolean);
    return n;
  }

  // Key-based children expansion
  const children = [];

  for (const key of Object.keys(obj)) {
    if (key === "_text" || key === "_attrs" || key === "_children") continue;

    const val = obj[key];

    let childNs = ns || "";
    let childLocal = key;

    // Support prefixed keys such as "a:title"
    const m = /^([A-Za-z_][\w\-\.]*):(.*)$/.exec(key);
    if (m) {
      const prefix = m[1];
      childLocal = m[2];
      childNs = prefixToNs(prefix) || childNs;
    }

    // Repeated tags
    if (Array.isArray(val)) {
      for (const item of val) {
        children.push(makeJsonNode(item, childNs, childLocal));
      }
    } else {
      children.push(makeJsonNode(val, childNs, childLocal));
    }
  }

  n.childNodes = children;
  return n;
}

/* ---------- Namespace constants ---------- */

const ATOM_NS = "http://www.w3.org/2005/Atom";
const ARXIV_NS = "http://arxiv.org/schemas/atom";

/* ---------- Prefix → namespace mapping (JSON only) ---------- */

function prefixToNs(prefix) {
  if (prefix === "a" || prefix === "atom") return ATOM_NS;
  if (prefix === "arxiv") return ARXIV_NS;
  return "";
}

/* ---------- XML helpers (DOM + JsonNode compatible) ---------- */

function firstNS(parent, ns, localName) {
  if (!parent) return null;

  if (parent.getElementsByTagNameNS) {
    const list = parent.getElementsByTagNameNS(ns, localName);
    if (list && list.length) return list[0];
  }

  const kids = parent.childNodes || [];
  for (let i = 0; i < kids.length; i++) {
    const n = kids[i];
    if (n && n.nodeType === 1 && n.namespaceURI === ns && n.localName === localName) {
      return n;
    }
  }
  return null;
}

function childrenNS(parent, ns, localName) {
  if (!parent) return [];
  const out = [];
  const kids = parent.childNodes || [];
  for (let i = 0; i < kids.length; i++) {
    const n = kids[i];
    if (n && n.nodeType === 1 && n.namespaceURI === ns && n.localName === localName) {
      out.push(n);
    }
  }
  return out;
}

function nodeTextNS(parent, ns, localName) {
  const n = firstNS(parent, ns, localName);
  return n ? String(n.textContent || "").trim() : "";
}

function nodeLinkAttrNS(parent, ns, localName) {
  const n = firstNS(parent, ns, localName);
  if (!n || !n.getAttribute) return "";
  return String(n.getAttribute("link") || "").trim();
}

/* ---------- Rendering helpers ---------- */

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

/* ---------- JSON → XML-like document adapter ----------
 *
 * Converts raw JSON into a tree of JsonNode objects so that
 * existing XML-based renderers can consume it transparently.
 */

function jsonToXmlLikeDoc(raw) {
  const doc = makeJsonNode({}, "", "document");

  // Preferred: prefixed Atom-style JSON
  if (raw && typeof raw === "object" && raw["a:feed"]) {
    doc.childNodes = [makeJsonNode(raw["a:feed"], ATOM_NS, "feed")];
    return doc;
  }

  // Bare feed object
  if (raw && typeof raw === "object" && raw.feed) {
    doc.childNodes = [makeJsonNode(raw.feed, ATOM_NS, "feed")];
    return doc;
  }

  // Fallback: treat entire object as feed
  doc.childNodes = [makeJsonNode(raw, ATOM_NS, "feed")];
  return doc;
}