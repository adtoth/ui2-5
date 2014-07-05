// Copyright (c) 2013 SAP AG, All Rights Reserved
/*global jQuery, sap*/

(function () {
    "use strict";
    jQuery.sap.declare("sap.ushell.ui.tile.TileBaseRenderer");

    /**
     * @name sap.ushell.ui.tile.TileBaseRenderer
     * @static
     * @private
     */
    sap.ushell.ui.tile.TileBaseRenderer = {
    };

    /**
     * Searches for occurrences of given searchTerms and substitutes substrings with themselves wrapped in HTML bold tag
     *
     * @param {array} aHighlightTerms an array of strings that will be detected and replaced
     * @param {string} sText contains the text to be highlighted
     * @returns {string} the text with all occurrences wrapped
     * 
     * @private
     */
    sap.ushell.ui.tile.TileBaseRenderer.highlight = function (aHighlightTerms, sText) {
        if (aHighlightTerms && aHighlightTerms.length && aHighlightTerms.length > 0) {
            var i;
            for (i = 0; i < aHighlightTerms.length; i++) {
                // build regular expression with escaped highlight term (case insensitive + greedy)
                var hiliteTerm = new RegExp("(" + aHighlightTerms[i].replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1") + ")", "gi");
                // regexp replace occurrence with wrapped self
                sText = sText.replace(hiliteTerm, "<b>$1</b>");
            }
        }
        return sText;
    };

    /**
     * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
     * 
     * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
     * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
     */
    sap.ushell.ui.tile.TileBaseRenderer.render = function (oRm, oControl) {
        // is it necessary to wrap the control into a link?
        var bCreateLinkTag = (oControl.getTargetURL() || "") !== "",
            sInfoPrefix;
        if (bCreateLinkTag) {
            oRm.write("<a");
            oRm.addClass("sapUshellTileBaseWrapperLink");
            oRm.writeClasses();
            oRm.writeAttribute("href", oControl.getTargetURL());
            oRm.write(">");
        }

        oRm.write("<div");
        oRm.writeControlData(oControl);
        oRm.addClass("sapUshellTileBase");
        oRm.writeClasses();
        oRm.write(">");

        // plain title + subtitle wrapper
        oRm.write("<div");
        oRm.addClass("sapUshellTileBaseHeader");
        oRm.writeClasses();
        oRm.write(">");

        // title
        oRm.write("<h3");
        oRm.addClass("sapUshellTileBaseTitle");
        oRm.writeClasses();
        oRm.write(">");
        oRm.write(this.highlight(oControl.getHighlightTerms(), oControl.getTitle() || ""));
        oRm.write("</h3>");

        // subtitle
        if (oControl.getSubtitle()) {
            oRm.write("<h4");
            oRm.addClass("sapUshellTileBaseSubtitle");
            oRm.writeClasses();
            oRm.write(">");
            oRm.write(this.highlight(oControl.getHighlightTerms(), oControl.getSubtitle()));
            oRm.write("</h4>");
        }

        oRm.write("</div>");

        /* render inheriting controls  */
        if (typeof (this.renderPart) === 'function') {
            this.renderPart(oRm, oControl);
        }

        // icon
        if (oControl.getIcon()) {
            var icon = new sap.ui.core.Icon({src: oControl.getIcon()});
            icon.addStyleClass("sapUshellTileBaseIcon");
            oRm.renderControl(icon);
        }

        // begin sapUshellTileBaseInfo 
        oRm.write("<div");
        oRm.addClass("sapUshellTileBaseInfo");
        oRm.addClass(oControl.getInfoState() || sap.ushell.ui.tile.State.Neutral);
        oRm.writeClasses();
        oRm.write(">");

        // it is possible for subclasses to prefix the info with arbitrary information (e.g. unit ex DynamicTiles)
        if (typeof (this.getInfoPrefix) === 'function') {
            sInfoPrefix = this.getInfoPrefix(oControl);
            oRm.write(sInfoPrefix);
        }
        // info string
        if (oControl.getInfo()) {
            // number units are separated from info text with a comma
            if (sInfoPrefix) {
                oRm.write(", ");
            }
            oRm.write(this.highlight(oControl.getHighlightTerms(), oControl.getInfo()));
        }
        // end sapUshellTileBaseInfo
        oRm.write("</div>");

        // end control div element
        oRm.write("</div>");

        // all-enclosing link
        if (bCreateLinkTag) {
            oRm.write("</a>");
        }
    };
}());
