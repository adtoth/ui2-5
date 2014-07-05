/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.TextRenderer");jQuery.sap.require("sap.ui.core.Renderer");sap.m.TextRenderer={};sap.m.TextRenderer.getTextAlign=sap.ui.core.Renderer.getTextAlign;
sap.m.TextRenderer.render=function(r,t){if(!t.getVisible()){return}var w=t.getWidth(),T=t.getTextDirection(),s=t.getTooltip_AsString(),n=t.getMaxLines(),W=t.getWrapping(),a=t.getTextAlign();r.write("<span");r.writeControlData(t);r.addClass("sapMText");if(!W||n==1){r.addClass("sapMTextNoWrap")}else if(W&&n>1){if(sap.m.Text.hasNativeLineClamp){r.addClass("sapMTextLineClamp");r.addStyle("-webkit-line-clamp",n)}else{r.addClass("sapMTextMaxLine")}}w&&r.addStyle("width",w);T&&r.writeAttribute("dir",T);s&&r.writeAttributeEscaped("title",s);if(a){a=this.getTextAlign(a,T);if(a){r.addStyle("text-align",a)}}r.writeClasses();r.writeStyles();r.write(">");r.writeEscaped(t.getText(),W);r.write("</span>")};
