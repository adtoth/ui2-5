// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell.ui.launchpad.SearchResultAppItemRenderer");jQuery.sap.require("sap.ui.core.Renderer");jQuery.sap.require("sap.m.StandardListItemRenderer");sap.ushell.ui.launchpad.SearchResultAppItemRenderer=sap.ui.core.Renderer.extend(sap.m.StandardListItemRenderer);sap.ushell.ui.launchpad.SearchResultAppItemRenderer.renderLIAttributes=function(r,l){sap.m.StandardListItemRenderer.renderLIAttributes(r,l);r.addClass("sapUshellSearchResultAppItem")};sap.ushell.ui.launchpad.SearchResultAppItemRenderer.highlight=function(h,t){var r;if(h){r=new RegExp("("+h.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g,"\\$1")+")","gi");t=t.replace(r,"<b>$1</b>")}return t}}());