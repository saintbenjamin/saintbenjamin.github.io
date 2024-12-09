<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:a="http://www.w3.org/2005/Atom"
    xmlns:arxiv="http://arxiv.org/schemas/atom">
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
                <ul class="no-bullets">
                    <xsl:apply-templates/>
                </ul>
            </body>
        </html>
    </xsl:template> 
    <xsl:template match="a:entry">
        <li class="outlined-text">
            <xsl:choose>
                <xsl:when test="a:word_en/@link">
                    <a href="{a:word_en/@link}" target="_blank">
                        <xsl:value-of select="a:word_en"/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="a:word_en"/>
                </xsl:otherwise>
            </xsl:choose>
        </li>
        <li class="outlined-text">
            <xsl:choose>
                <xsl:when test="a:word_jp/@link">
                    <a href="{a:word_jp/@link}" target="_blank">
                        <xsl:value-of select="a:word_jp"/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="a:word_jp"/>
                </xsl:otherwise>
            </xsl:choose>
        </li>
        <br/>
    </xsl:template> 
</xsl:stylesheet>