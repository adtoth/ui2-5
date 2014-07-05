/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ushell.ui.launchpad.SearchResultAppItem");jQuery.sap.require("sap.ushell.library");jQuery.sap.require("sap.m.StandardListItem");sap.m.StandardListItem.extend("sap.ushell.ui.launchpad.SearchResultAppItem",{metadata:{library:"sap.ushell",properties:{"searchTerm":{type:"string",group:"Appearance",defaultValue:null},"targetUrl":{type:"sap.ui.core.URI",group:"Behavior",defaultValue:null}}}});
// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";sap.ushell.ui.launchpad.SearchResultAppItem.prototype.init=function(){sap.m.StandardListItem.prototype.init();this.setType(sap.m.ListType.Active);this.attachPress(this._onPress,this)};sap.ushell.ui.launchpad.SearchResultAppItem.prototype.exit=function(){sap.m.StandardListItem.prototype.exit();this.detachPress(this._onPress,this)};sap.ushell.ui.launchpad.SearchResultAppItem.prototype.setActive=function(e){return this};sap.ushell.ui.launchpad.SearchResultAppItem.prototype._onPress=function(){if(this.getTargetUrl()){window.location=this.getTargetUrl()}}}());
