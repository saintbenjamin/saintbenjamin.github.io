/* =========================================================
 * loader.js
 * =========================================================
 * Unified loader and renderer dispatcher.
 *
 * This replaces the old loadAndRenderXML function.
 *
 * Behavior:
 * - Automatically detects XML vs JSON input.
 * - XML is parsed via DOMParser.
 * - JSON is converted into an XML-like structure
 *   using jsonToXmlLikeDoc().
 * - Existing renderers are invoked without modification.
 * ========================================================= */

async function loaderAndRender(dataUrl, containerId, rendererFn, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { forceType = "" } = options; // "xml" | "json" | ""

  try {
    const res = await fetch(dataUrl);
    if (!res.ok) {
      throw new Error(`Failed to load: ${res.status} ${res.statusText}`);
    }

    const ct = (res.headers.get("content-type") || "").toLowerCase();
    let type = forceType;

    if (!type) {
      if (ct.includes("application/json") || dataUrl.toLowerCase().endsWith(".json")) {
        type = "json";
      } else {
        type = "xml";
      }
    }

    let xmlLikeDoc;

    if (type === "json") {
      const raw = await res.json();
      xmlLikeDoc = jsonToXmlLikeDoc(raw);
    } else {
      const xmlText = await res.text();
      const parser = new DOMParser();
      xmlLikeDoc = parser.parseFromString(xmlText, "application/xml");
    }

    clear(container);
    rendererFn(xmlLikeDoc, container);

    if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
      await window.MathJax.typesetPromise();
    } else if (window.MathJax && typeof window.MathJax.typeset === "function") {
      window.MathJax.typeset();
    }
  } catch (error) {
    console.error("Error rendering data:", error);
    container.textContent = "Error loading and rendering data.";
  }
}

/* ---------- Wire-up ---------- */

loaderAndRender("json/jesus.json", "jesus-container", renderJesus);
loaderAndRender("json/bio.json", "bio-container", renderBio);
loaderAndRender("json/edu.json", "edu-container", renderEdu);
loaderAndRender("json/exp.json", "exp-container", renderExp);
loaderAndRender("json/honor.json", "honor-container", renderHonor);
// loaderAndRender("xml/pub.xml", "pub-container", renderPub);
loaderAndRender("json/talk.json", "talk-container", renderTalk);
loaderAndRender("json/link.json", "link-container", renderLink);

/*
 * To migrate a feed from XML to JSON:
 *
 *   loaderAndRender("json/bio.json", "bio-container", renderBio);
 *
 * No renderer changes are required.
 */