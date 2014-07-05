jQuery.sap.declare("sap.ca.ui.FileUploadRenderer");
jQuery.sap.require("sap.m.ListRenderer");
//temporary workaround needed for the jQuery plugins to work
//proper fix to be implemented
define = undefined;
jQuery.sap.require("sap.ca.ui.JS.jquery-ui-widget");
jQuery.sap.require("sap.ca.ui.JS.jquery-iframe-transport");
jQuery.sap.require("sap.ca.ui.JS.jquery-fileupload");

/**
 * @class FileUpload renderer.
 * @static
 */
sap.ca.ui.FileUploadRenderer = {};

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
sap.ca.ui.FileUploadRenderer.render = function(oRm, oControl) {
    // write the HTML into the render manager

    // oSearchField.updateAllParts(); // called depending on your 'sync'
    // approach



    oRm.write("<div");
    oRm.writeControlData(oControl);
    oRm.addClass("sapCaUiFU");
    if (oControl.getEditMode()){
        oRm.addClass("sapCaUiFUEdit");
    }
    oRm.writeClasses();
    oRm.write(">");
    oRm.renderControl(oControl.getAggregation("attachmentNumberLabel"));
    if(oControl.getUploadEnabled()) {
        oRm.write("<div class='sapCaUiFileUploadBtn sapCaUiFileUploadFileInputButton'>");
        oRm.renderControl(oControl._getAddIcon());
        oRm.write("<span>" + oControl._sUploadText + "</span>");
        oRm.write('<input ');
        oRm.writeAttributeEscaped("id", oControl.getId() + "-upload");
        if(jQuery.device.is.phone || jQuery.device.is.tablet) {
            oRm.write(' type="file" name="files[]" capture="camera"></input>');
        } else {
            oRm.write(' type="file" name="files[]" multiple></input>');
        }
        oRm.write("</div>");
    }
    oRm.renderControl(oControl.getAggregation("uploadProgressLabel"));
    oRm.renderControl(oControl.getAggregation("fileList"));
    oRm.write("</div>");
};


