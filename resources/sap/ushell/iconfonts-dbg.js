// Copyright (c) 2013 SAP AG, All Rights Reserved
/**
 * @fileOverview This file contains the functionality needed to register
 * the Fiori Wave 2 font icons
 */

(function () {
    "use strict";
    /*global jQuery, sap, setTimeout */

    jQuery.sap.require("sap.ui.core.IconPool");

    jQuery.sap.declare("sap.ushell.iconfonts");
    sap.ushell.iconfonts = { };

    /*
     * loads SAP Fiori Wave 2 launch icon font and font icons that are needed in
     * launchpad UI itself
     */
    sap.ushell.iconfonts.registerFiori2IconFont = function () {
        // the lists of icons as [name, unicode code point] tuples
        // ... for Launchpad UI
        var oLaunchpadIcons = {
                fontFamily: "BusinessSuiteInAppSymbols",
                collectionName: "BusinessSuiteInAppSymbols",
                icons : [
                    ["icon-heart", "E000"], ["icon-quarter", "E001"], ["icon-year", "E002"],
                    ["icon-equalizer", "E003"], ["icon-component", "E004"], ["icon-component-private", "E005"],
                    ["icon-raw-material", "E006"], ["icon-sms", "E007"], ["icon-add-note", "E008"],
                    ["icon-change-time-horizon", "E009"], ["icon-table-chart-customization", "E00a"], ["icon-delegated-important-task", "E00b"],
                    ["icon-forklift", "E00c"], ["icon-coins", "E00d"], ["icon-filter-menu", "E00e"],
                    ["icon-target-to-date", "E00f"], ["icon-program", "E010"], ["icon-phase", "E011"],
                    ["icon-checklist", "E012"], ["icon-mirrored-task", "E013"], ["icon-sub-project", "E014"],
                    ["icon-checklist-item", "E015"], ["icon-adhoc-analysis", "E016"], ["icon-change-analysis", "E017"],
                    ["icon-review-demands", "E018"], ["icon-project-definition", "E019"], ["icon-data-access", "E01a"],
                    ["icon-define-shortage", "E01b"], ["icon-review-supplies", "E01c"], ["icon-change-log", "E01d"],
                    ["icon-priority-1", "E01e"], ["icon-priority-2", "E01f"], ["icon-jam", "E020"], ["icon-milestone", "E021"]
                ]
            },
            // old Fiori1 app icons
            oFiori1Icons = {
                fontFamily: "SAP-Icons",
                collectionName: "Fiori2",
                icons: [
                    ["F0017", "e05e"], ["F0018", "e0c3"], ["F0019", "e0c3"], ["F0020", "e0c3"],
                    ["F0021", "e10d"], ["F0366", "e129"], ["F0392", "e04f"], ["F0394", "e044"],
                    ["F0395", "e132"], ["F0396", "e064"], ["F0397", "e0a4"], ["F0398", "e0a4"],
                    ["F0399", "e044"],
                    // TODO: as soon as it's created, add
                    //["F0400", ""],
                    ["F0401", "e08d"], ["F0402", "e13e"],
                    ["F0403", "e13e"], ["F0404", "e033"], ["F0405", "e0b3"], ["F0406", "e043"],
                    ["F0407", "e043"], ["F0408", "e043"], ["F0409", "e075"], ["F0410", "e007"],
                    ["F0411", "e075"]
                ]
            },
            // Fiori2 app icons
            oAppIcons = {
                fontFamily: "Fiori2",
                collectionName: "Fiori2",
                icons : [
                    // transaction app icons
                    ["F0002", "E236"], ["F0003", "E202"], ["F0004", "E203"], ["F0005", "E204"],
                    ["F0006", "E205"], ["F0009", "E206"], ["F0010", "E207"], ["F0012", "E208"],
                    ["F0014", "E209"], ["F0018", "E200"], ["F0019", "E201"], ["F0023", "E20A"],
                    ["F0024", "E20B"], ["F0025", "E20C"], ["F0026", "E20D"], ["F0072", "E23A"],
                    ["F0100", "E23B"], ["F0101", "E23C"], ["F0102", "E23D"], ["F0106", "E20F"],
                    ["F0144", "E210"], ["F0190", "E23E"], ["F0194", "E23F"], ["F0210", "E242"],
                    ["F0211", "E243"], ["F0212", "E244"], ["F0217", "E211"], ["F0220", "E213"],
                    ["F0243", "E215"], ["F0244", "E216"], ["F0245", "E217"], ["F0246", "E218"],
                    ["F0247", "E219"], ["F0248", "E21A"], ["F0249", "E21B"], ["F0250", "E21C"],
                    ["F0251", "E21D"], ["F0252", "E21E"], ["F0257", "E21F"], ["F0281", "E220"],
                    ["F0282", "E221"], ["F0283", "E222"], ["F0284", "E223"], ["F0292", "E224"],
                    ["F0295", "E225"], ["F0296", "E226"], ["F0316", "E227"], ["F0317", "E228"],
                    ["F0321", "E229"], ["F0339", "E22A"], ["F0340", "E22B"], ["F0341", "E22C"],
                    ["F0342", "E22D"], ["F0365", "E212"], ["F0366", "E22F"], ["F0367", "E230"],
                    ["F0368", "E231"], ["F0369", "E235"], ["F0370", "E22E"], ["F0372", "E232"],
                    ["F0380", "E233"], ["F0381", "E234"], ["F0382", "E246"], ["F0390", "E20E"],
                    ["F0412", "E213"], ["F0429", "E2A6"], ["F0xx1", "E240"], ["F0xx2", "E241"],

                    // analytic app icons
                    ["F0013", "E237"], ["F0016", "E238"], ["F0028", "E239"], ["F0029", "E283"],
                    ["F0030", "E284"], ["F0031", "E285"], ["F0032", "E286"], ["F0033", "E287"],
                    ["F0034", "E288"], ["F0036", "E289"], ["F0038", "E28A"], ["F0039", "E28B"],
                    ["F0041", "E28C"], ["F0044", "E28D"], ["F0293", "E28E"], ["F0294", "E28F"],
                    ["F0297", "E290"], ["F0298", "E291"], ["F0299", "E292"], ["F0300", "E293"],
                    ["F0301", "E294"], ["F0302", "E295"], ["F0303", "E296"], ["F0304", "E297"],
                    ["F0305", "E298"], ["F0306", "E299"], ["F0323", "E29A"], ["F0324", "E29B"],
                    ["F0326", "E29C"], ["F0327", "E29D"], ["F0328", "E29E"], ["F0329", "E29F"],
                    ["F0331", "E2A1"], ["F0332", "E2A2"], ["F0343", "E2A3"], ["F0344", "E2A4"],
                    ["F0345", "E2A5"], ["F0388", "E2A7"], ["F0391", "E2A0"]
                ]
            },
            sStylePath = jQuery.sap.getModulePath("sap.ushell") + "/themes/base/IconFonts.css";

        // check whether stylesheet is already loaded in <head> with the right ID
        if (jQuery("#icon-fonts-Fiori2")) {
            this.registerFonts(oFiori1Icons, oAppIcons, oLaunchpadIcons);
        } else {
            // load via callback - note that this can have side effects, as the fonts may not yet be loaded but already be requested
            jQuery.sap.includeStyleSheet(sStylePath, "icon-fonts-Fiori2",
                jQuery.proxy(this.registerFonts, this, oFiori1Icons, oAppIcons, oLaunchpadIcons),
                function () {
                    // error
                    jQuery.sap.log.error("Problems finding css for loading Fiori2 icon font in " + sStylePath);
                });
        }
    };

    /*
     * loads icon font characters
     *
     * call like <code>sap.ushell.iconfonts.registerFonts(oFontIcons1, oFontIcons2, ...);</code>
     *
     * @param {object} an object with icon font definition (see below). Note that the icon font has
     *          to be registered in CSS before (via @font-face).
     *          <code>
     *          var oIcon = {
     *              fontFamily: "FontFamilyName",   // from @font-face definition in CSS
     *              collectionName: "collection",   // IconPool collection name, e.g. 'Fiori2'
     *              icons : [["icon-name", "E001], [...], ...]  // list of tuples containing ("icon name", "unicode code point") tuples
     *          }
     *          </code>
     *
     * @private
     */
    sap.ushell.iconfonts.registerFonts = function () {
        var oIcon,
            i,
            j;
        for (i = 0; i < arguments.length; i = i + 1) {
            oIcon = arguments[i];
            for (j = 0; j < oIcon.icons.length; j = j + 1) {
                sap.ui.core.IconPool.addIcon(oIcon.icons[j][0], oIcon.collectionName, oIcon.fontFamily, oIcon.icons[j][1]);
            }
        }
    };

}());