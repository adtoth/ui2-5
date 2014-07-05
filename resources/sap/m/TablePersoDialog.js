/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.TablePersoDialog");jQuery.sap.require("sap.ui.base.ManagedObject");jQuery.sap.require("sap.m.InputListItem");jQuery.sap.require("sap.m.Switch");jQuery.sap.require("sap.m.Dialog");jQuery.sap.require("sap.m.List");jQuery.sap.require("sap.m.Bar");jQuery.sap.require("sap.m.Button");sap.ui.base.ManagedObject.extend("sap.m.TablePersoDialog",{constructor:function(i,s){sap.ui.base.ManagedObject.apply(this,arguments)},metadata:{associations:{"persoDialogFor":sap.m.Table},events:{confirm:{},cancel:{}},library:"sap.m"}});
sap.m.TablePersoDialog.prototype.init=function(){jQuery.sap.log.debug("TablePersoDialog init()");var t=this;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oP13nModel=new sap.ui.model.json.JSONModel();this._columnItemTemplate=new sap.m.InputListItem({label:"{Personalization>text}",content:new sap.m.Switch({state:"{Personalization>visible}"})});this._oDialog=new sap.m.Dialog({title:this._oRb.getText("PERSODIALOG_COLUMNS_TITLE"),content:new sap.m.List({includeItemInSelection:true,mode:sap.m.ListMode.SingleSelectMaster}),subHeader:new sap.m.Bar({contentLeft:[new sap.m.Button({icon:"sap-icon://arrow-top",press:function(e){t._moveItem(-1)}}),new sap.m.Button({icon:"sap-icon://arrow-bottom",press:function(e){t._moveItem(1)}})],contentRight:new sap.m.Button({text:this._oRb.getText("PERSODIALOG_COLUMNS_ACTION_RESET"),press:function(){t._resetAll()}})}),leftButton:new sap.m.Button({text:this._oRb.getText("PERSODIALOG_OK"),press:function(){this.getParent().close();t.fireConfirm()}}),rightButton:new sap.m.Button({text:this._oRb.getText("PERSODIALOG_CANCEL"),press:function(){t._readCurrentSettingsFromTable();this.getParent().close();t.fireCancel()}})})};
sap.m.TablePersoDialog.prototype.retrievePersonalizations=function(){return this._oP13nModel.getData()};
sap.m.TablePersoDialog.prototype.open=function(){var l=this._oDialog.getContent()[0];this._readCurrentSettingsFromTable();this._oDialog.setModel(this._oP13nModel,"Personalization");l.bindAggregation("items","Personalization>/aColumns",this._columnItemTemplate);this._oDialog.open()};
sap.m.TablePersoDialog.prototype._resetAll=function(){var t=sap.ui.getCore().byId(this.getPersoDialogFor());var d={aColumns:this._tableColumnInfo(t)};d.aColumns=d.aColumns.map(function(c){c.visible=true;return c});this._oP13nModel.setData(d)};
sap.m.TablePersoDialog.prototype._tableColumnInfo=function(t){var C=t.getColumns();var d=[];for(var c=0,e=C.length;c<e;c++){var o=C[c];d.push({text:o.getHeader().getText(),order:o.getOrder(),visible:o.getVisible(),id:o.getId()})}d.sort(function(a,b){return a.order-b.order});return d};
sap.m.TablePersoDialog.prototype._moveItem=function(d){var l=this._oDialog.getContent()[0];var m=this._oP13nModel;var s=l.getSelectedItem();if(!s)return;var a=m.getData();var i=s.getBindingContext("Personalization").getPath().split("/").pop()*1;var b=i+d;if(b<0||b>=a.aColumns.length)return;var t=a.aColumns[b];a.aColumns[b]=a.aColumns[i];a.aColumns[i]=t;m.setData(a);l.removeSelections();l.setSelectedItem(l.getItems()[b],true)};
sap.m.TablePersoDialog.prototype._readCurrentSettingsFromTable=function(){var t=sap.ui.getCore().byId(this.getPersoDialogFor());this._oP13nModel.setData({aColumns:this._tableColumnInfo(t)})};
