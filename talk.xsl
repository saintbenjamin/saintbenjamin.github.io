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
                <!-- <h1 class="outlined-text">
                    <xsl:element name="a">
                        <xsl:attribute name="href">
                            <xsl:value-of select="a:id"/>
                        </xsl:attribute>
                        <xsl:attribute name="target">_blank</xsl:attribute>
                        <xsl:value-of select="a:title"/>
                    </xsl:element>
                </h1> -->
                <ol>
                    <xsl:apply-templates/>
                </ol>
            </body>
        </html>
    </xsl:template> 
    <xsl:template match="a:entry">
        <li class="outlined-text-semibig">
            <xsl:choose>
                <xsl:when test="a:title/@link">
                    <a href="{a:title/@link}" target="_blank">
                        <xsl:value-of select="a:title"/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="a:title"/>
                </xsl:otherwise>
            </xsl:choose>
        </li>
        <ul class="outlined-text no-bullets">
            <li><xsl:value-of select="a:updated"/></li>
            <li><xsl:value-of select="substring-before(a:author, 'Benjamin J. Choi')"/>
            <u><xsl:value-of select="substring('Benjamin J. Choi', 1)"/></u>
            <xsl:value-of select="substring-after(a:author, 'Benjamin J. Choi')"/></li>
            <li>
                <xsl:choose>
                    <xsl:when test="a:conf_en/@link">
                        <a href="{a:conf_en/@link}" target="_blank">
                            <xsl:value-of select="a:conf_en"/>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="a:conf_en"/>
                    </xsl:otherwise>
                </xsl:choose>
            </li>
            <li>
                <xsl:choose>
                    <xsl:when test="a:conf_jp/@link">
                        <a href="{a:conf_jp/@link}" target="_blank">
                            <xsl:value-of select="a:conf_jp"/>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="a:conf_jp"/>
                    </xsl:otherwise>
                </xsl:choose>
            </li>
            <li>
                <xsl:choose>
                    <xsl:when test="a:loc_en/@link">
                        <a href="{a:loc_en/@link}" target="_blank">
                            <xsl:value-of select="a:loc_en"/>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="a:loc_en"/>
                    </xsl:otherwise>
                </xsl:choose>
            </li>
            <li>
                <xsl:choose>
                    <xsl:when test="a:loc_jp/@link">
                        <a href="{a:loc_jp/@link}" target="_blank">
                            <xsl:value-of select="a:loc_jp"/>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="a:loc_jp"/>
                    </xsl:otherwise>
                </xsl:choose>
            </li>
            <li><xsl:value-of select="a:session"/></li>
        </ul>
        <br/>
    </xsl:template> 
</xsl:stylesheet>