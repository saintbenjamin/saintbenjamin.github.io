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
                <ul class="no-bullets">
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
        <ul class="outlined-text no-bullets">
            <xsl:for-each select="a:item_s/a:item">
                <ul class="outlined-text no-bullets">
                    <li>
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
                        <li>
                            <xsl:choose>
                                <xsl:when test="a:desc/@link">
                                    <a href="{a:desc/@link}" target="_blank">
                                        <xsl:value-of select="a:desc"/>
                                    </a>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="a:desc"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </li>
                    </ul>
                </ul>
            </xsl:for-each>
        </ul>
    </xsl:template> 
</xsl:stylesheet>