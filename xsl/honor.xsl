<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:a="http://www.w3.org/2005/Atom">
    <xsl:output method="html" encoding="UTF-8"/>
    <xsl:template match="text()"/>
    <xsl:template match="a:feed">
        <html>
            <head>
                <title>
                    <xsl:value-of select="a:title"/>
                </title>
                <script>
                    MathJax = {
                        tex: {
                            inlineMath: [['$', '$']], // Define $...$ for inline math
                            displayMath: [['$$', '$$']] // $$...$$ for block math
                        }
                    };
                </script>
                <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
            </head>
            <body>
                <ul class="outlined-text no-bullets">
                    <xsl:apply-templates/>
                </ul>
            </body>
        </html>
    </xsl:template> 
    <xsl:template match="a:entry">
        <li class="outlined-text-semibig"><b><xsl:value-of select="a:title"/></b></li>
        <ul class="no-bullets">
            <li><xsl:value-of select="a:title_jp"/></li>
            <li><xsl:value-of select="a:location"/></li>
            <li><xsl:value-of select="a:date"/></li>
        </ul>
        <br/>
    </xsl:template> 
</xsl:stylesheet>