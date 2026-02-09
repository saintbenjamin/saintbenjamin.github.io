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

/**
 * Apply per-line fade-in targets to dynamically rendered content.
 *
 * Strategy:
 * - Target common "line-level" elements inside `.xml-content` blocks.
 * - Add `.fade-in` class to those elements so the observer can animate them.
 *
 * Notes:
 * - This function is intentionally conservative; it only adds a class.
 * - Actual animation is controlled by CSS (`.fade-in` and `.fade-in.visible`).
 */
function applyLineFadeIn() {
  const containers = document.querySelectorAll(".xml-content");
  if (!containers.length) return;

  containers.forEach((container) => {
    // Typical line-level elements produced by renderers
    const lines = container.querySelectorAll("p, li");

    lines.forEach((line) => {
      // Avoid re-adding if already tagged
      if (!line.classList.contains("fade-in")) {
        line.classList.add("fade-in");
      }
    });
  });
}

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
    // After rendering, optionally enable per-line fade-in on generated content.
    applyLineFadeIn();

    // If a fade refresh hook exists (defined in fade.js), call it.
    // This is necessary when fade-in targets are added after DOMContentLoaded.
    if (typeof window.refreshFadeIns === "function") {
      window.refreshFadeIns();
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