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
            </head>
            <body>
                <ul class="outlined-text no-bullets">
                    <xsl:apply-templates/>
                    <br/>
                </ul>
            </body>
        </html>
    </xsl:template> 
    <xsl:template match="a:entry">
        <li class="outlined-text-semibig"><b><xsl:value-of select="a:title"/></b></li>
        <xsl:for-each select="a:perf_s/a:perf">
            <ul class="no-bullets">
                <li><xsl:value-of select="a:title"/></li>
                <xsl:for-each select="a:loc_s/a:loc">
                    <ul class="no-bullets">
                        <li><xsl:value-of select="."/></li>
                    </ul>
                </xsl:for-each>
            </ul>
        </xsl:for-each>
    </xsl:template> 
</xsl:stylesheet>