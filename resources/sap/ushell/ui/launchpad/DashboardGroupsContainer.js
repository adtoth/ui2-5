/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ushell.ui.launchpad.DashboardGroupsContainer");jQuery.sap.require("sap.ushell.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ushell.ui.launchpad.DashboardGroupsContainer",{metadata:{library:"sap.ushell",aggregations:{"groups":{type:"sap.ui.core.Control",multiple:true,singularName:"group"}}}});
// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";sap.ushell.ui.launchpad.DashboardGroupsContainer.prototype.updateGroups=sap.ushell.override.updateAggregatesFactory("groups")}());
