/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ushell.ui.launchpad.LoadingDialog");jQuery.sap.require("sap.ushell.library");jQuery.sap.require("sap.m.BusyDialog");sap.m.BusyDialog.extend("sap.ushell.ui.launchpad.LoadingDialog",{metadata:{library:"sap.ushell",properties:{"iconUri":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null}}}});
// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.require("sap.ui.core.Icon");sap.ushell.ui.launchpad.LoadingDialog.prototype.init=function(){sap.m.BusyDialog.prototype.init.call(this,arguments);this.oIcon=new sap.ui.core.Icon()};sap.ushell.ui.launchpad.LoadingDialog.prototype.exit=function(){sap.m.BusyDialog.prototype.exit.call(this,arguments);if(this.oIcon){this.oIcon.destroy();this.oIcon=null}};sap.ushell.ui.launchpad.LoadingDialog.prototype.isOpen=function(){var p=this._oPopup;return p.isOpen()};sap.ushell.ui.launchpad.LoadingDialog.prototype.setPopupVisible=function(v){this.toggleStyleClass("sapUshellLoadingDialogInvisible",!v)};sap.ushell.ui.launchpad.LoadingDialog.prototype.openLoadingScreen=function(){if(!this._oPopup.isOpen()){this.setPopupVisible(true);this.open()}};sap.ushell.ui.launchpad.LoadingDialog.prototype.showAppInfo=function(a,i){var t=this,T=function(t){t.toggleStyleClass("sapUshellLoadingDialogAppDataInvisible",false)};this.setText(a);this.setIconUri(i);this.oIcon.setSrc(i);window.setTimeout(function(){T(t)},50)};sap.ushell.ui.launchpad.LoadingDialog.prototype.closeLoadingScreen=function(){var t=this,T=function(t){if(t._oPopup.isOpen()){t.setText(null);t.setIconUri(null);t.toggleStyleClass("sapUshellLoadingDialogAppDataInvisible",true);t.close()}};if(this._oPopup.isOpen()){this.setPopupVisible(false);window.setTimeout(function(){T(t)},300)}}}());
