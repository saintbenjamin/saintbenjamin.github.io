function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open');
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('open');
        });
    });                
}
async function loadAndRenderXML(xmlUrl, xslUrl, containerId) {
    try {
            const xmlResponse = await fetch(xmlUrl);
            if (!xmlResponse.ok) throw new Error(`Failed to load XML: ${xmlResponse.statusText}`);
            const xmlText = await xmlResponse.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            const xslResponse = await fetch(xslUrl);
            if (!xslResponse.ok) throw new Error(`Failed to load XSL: ${xslResponse.statusText}`);
            const xslText = await xslResponse.text();
            const xslDoc = parser.parseFromString(xslText, "application/xml");

            const xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xslDoc);

            const resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);

            const container = document.getElementById(containerId);
            container.innerHTML = '';
            container.appendChild(resultDocument);
        } catch (error) {
            console.error('Error rendering XML:', error);
            document.getElementById(containerId).textContent = 'Error loading and rendering XML.';
        }
}
loadAndRenderXML('jesus.xml', 'jesus.xsl', 'jesus-container');
loadAndRenderXML('bio.xml', 'bio.xsl', 'bio-container');
loadAndRenderXML('edu.xml', 'edu.xsl', 'edu-container');
loadAndRenderXML('exp.xml', 'exp.xsl', 'exp-container');
loadAndRenderXML('honor.xml', 'honor.xsl', 'honor-container');
loadAndRenderXML('talk.xml', 'talk.xsl', 'talk-container');
loadAndRenderXML('pub.xml', 'pub.xsl', 'pub-container');
loadAndRenderXML('link.xml', 'link.xsl', 'link-container');