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
            <xsl:element name="a">
                <xsl:attribute name="href">
                    <xsl:value-of select="a:id"/>
                </xsl:attribute>
                <xsl:attribute name="target">_blank</xsl:attribute>
                <b><xsl:value-of select="a:title"/></b>
            </xsl:element>
        </li>
        <!-- <a href="https://inspirehep.net/literature?q={arxiv:doi}" target="_blank">
            <b><xsl:value-of select="a:title"/></b>
        </a> -->
        <ul class="outlined-text no-bullets">
            <li><xsl:value-of select="substring(a:updated, 1, 10)"/></li>
            <li><xsl:value-of select="substring-before(a:author, 'Benjamin J. Choi')"/>
            <u><xsl:value-of select="substring('Benjamin J. Choi', 1)"/></u>
            <xsl:value-of select="substring-after(a:author, 'Benjamin J. Choi')"/></li>
            <!-- <li><xsl:value-of select="a:summary"/></li>
            <li><xsl:value-of select="arxiv:comment"/></li> -->
            <li><b><xsl:value-of select="arxiv:journal_ref"/></b></li>
            <li>
                <xsl:for-each select="a:link[@title='pdf']">
                    <a href="{@href}" target="_blank">
                        <xsl:value-of select="@href"/>
                    </a>
                </xsl:for-each>
            </li>
            <li>
                <xsl:for-each select="a:link[@title='doi']">
                    <a href="{@href}" target="_blank">
                        <xsl:value-of select="@href"/>
                    </a>
                </xsl:for-each>
            </li>
        </ul>
        <br/>
    </xsl:template> 
</xsl:stylesheet>