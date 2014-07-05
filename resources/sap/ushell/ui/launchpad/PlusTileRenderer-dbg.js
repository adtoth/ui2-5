// Copyright (c) 2013 SAP AG, All Rights Reserved
/*global jQuery, sap*/
/**
 * @class PlusTile renderer.
 * @static
 * 
 * @private
 */
(function () {
    "use strict";

    jQuery.sap.declare("sap.ushell.ui.launchpad.PlusTileRenderer");

    /**
     * @class PlusTile renderer.
     * @static
     */
    sap.ushell.ui.launchpad.PlusTileRenderer = {};

    /**
     * Renders the HTML for the given control, using the provided
     * {@link sap.ui.core.RenderManager}.
     * 
     * @param {sap.ui.core.RenderManager}
     *            oRm the RenderManager that can be used for writing to the render
     *            output buffer
     * @param {sap.ui.core.Control}
     *            oControl an object representation of the control that should be
     *            rendered
     */
    sap.ushell.ui.launchpad.PlusTileRenderer.render = function (oRm, oControl) {
        oRm.write("<div");
        oRm.writeControlData(oControl);
        oRm.addClass("sapUshellTile");
        oRm.addClass("sapUshellPlusTile");

        oRm.writeClasses();
        oRm.write(">");
        oRm.renderControl(new sap.ui.core.Icon({
            src : 'sys-cancel',
            tooltip : sap.ushell.resources.i18n.getText("open_catalog")
        }));

        oRm.write("</div>");
    };
}());
