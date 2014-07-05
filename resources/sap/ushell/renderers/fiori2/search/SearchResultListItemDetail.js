// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";sap.ui.core.Control.extend("SearchResultListItemDetail",{metadata:{properties:{headerLabel:{type:"string",defaultValue:"More Information On"},itemTitle:"string",itemTitleUrl:"string",itemType:"string",status:"string",itemData:"object",firstDetailAttribute:{type:"int",defaultValue:4},maxDetailAttributes:{type:"int",defaultValue:0}}},renderer:function(r,c){r.write('<div');r.writeControlData(c);r.addClass('searchResultListItemDetail');r.writeClasses();r.write('>');r.write('<div class="searchResultListItemDetail-content">');r.write('<div class="searchResultListItemDetail-contentTitle">');r.write("</div>");r.write('<div class="searchResultListItemDetail-attributes">');if(c.getItemData()){for(var i=c.getFirstDetailAttribute();i<=c.getMaxDetailAttributes();i++){var a="attr"+i+"Name";var b="attr"+i;var l=c.getItemData()[a];var v=c.getItemData()[b];if(l===undefined||v===undefined){continue}r.write('<div class="searchResultListItemDetail-attribute">');var d=new sap.m.Label({text:l});d.setTooltip((''+l).replace(/<b>/gi,'').replace(/<\/b>/gi,''));d.addStyleClass("searchResultListItemDetail-attribute-label");r.renderControl(d);var e=new sap.m.Text({text:v});e.setTooltip((''+v).replace(/<b>/gi,'').replace(/<\/b>/gi,''));e.addStyleClass("searchResultListItemDetail-attribute-value");r.renderControl(e);r.write("</div>")}}r.write("</div>");r.write("</div>");r.write("</div>")},onAfterRendering:function(){var s=this;this._setSafeText($(this.getDomRef()).find(".searchResultListItemDetail-title, .searchResultListItemDetail-attribute-value"))},_setSafeText:function(o){o.each(function(i,d){var a=$(d);var s=a.text().replace(/<b>/gi,'').replace(/<\/b>/gi,'');if(s.indexOf('<')===-1){a.html(a.text())}})}})}());
