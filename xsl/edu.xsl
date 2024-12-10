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
        <ul class="no-bullets">
            <li>
                <xsl:choose>
                    <xsl:when test="a:supervisor/@link">
                        <a href="{a:supervisor/@link}" target="_blank">
                            <xsl:value-of select="a:supervisor"/>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="a:supervisor"/>
                    </xsl:otherwise>
                </xsl:choose>
            </li>
            <li>
                <xsl:choose>
                    <xsl:when test="a:title_jp/@link">
                        <a href="{a:title_jp/@link}" target="_blank">
                            <xsl:value-of select="a:title_jp"/>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="a:title_jp"/>
                    </xsl:otherwise>
                </xsl:choose>
            </li>
            <li>
                <xsl:choose>
                    <xsl:when test="a:location/@link">
                        <a href="{a:location/@link}" target="_blank">
                            <xsl:value-of select="a:location"/>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="a:location"/>
                    </xsl:otherwise>
                </xsl:choose>
            </li>
            <li>
                <xsl:choose>
                    <xsl:when test="a:date/@link">
                        <a href="{a:date/@link}" target="_blank">
                            <xsl:value-of select="a:date"/>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="a:date"/>
                    </xsl:otherwise>
                </xsl:choose>
            </li>
        </ul>
        <br/>
    </xsl:template> 
</xsl:stylesheet>