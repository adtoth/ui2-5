jQuery.sap.require("sap.ui.core.Popup");sap.ui.base.EventProvider.extend("sap.ca.ui.Overlay",{constructor:function(){this._oPopup=new sap.ui.core.Popup();this._oPopup.setModal(true);this._oPopup.setShadow(false);this._oPopup.setAutoClose(false);this._oPopup._applyPosition=function(p){var r=this._$();r.css({left:"0px",top:"0px",right:"0px",bottom:"0px"})}}});
sap.ca.ui.Overlay.prototype.open=function(c){this.$content=c.$();if(this.$content){var d=c.getDomRef();this.$tempNode=jQuery("<div></div>");this.$content.before(this.$tempNode);this._$overlay=jQuery("<div></div>");this._$overlay.addClass("sapCaUiOverlay");this._$overlay.append(this.$content);this._oPopup.setContent(this._$overlay)}else{jQuery.sap.log.warn("Overlay: content does not exist or contains more than one child")}this._oPopup.open(200)};
sap.ca.ui.Overlay.prototype.close=function(){this.$tempNode.replaceWith(this.$content);this._oPopup.close(200);this._$overlay.remove()};
