/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright
 * 		2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.HierarchicalSelectDialog");jQuery.sap.require("sap.ca.ui.library");jQuery.sap.require("sap.m.Dialog");sap.m.Dialog.extend("sap.ca.ui.HierarchicalSelectDialog",{metadata:{library:"sap.ca.ui",defaultAggregation:"items",aggregations:{"items":{type:"sap.ca.ui.HierarchicalSelectDialogItem",multiple:true,singularName:"item"}},events:{"select":{},"cancel":{}}}});sap.ca.ui.HierarchicalSelectDialog.M_EVENTS={'select':'select','cancel':'cancel'};jQuery.sap.require("sap.ca.ui.utils.resourcebundle");jQuery.sap.require("sap.m.NavContainer");
sap.ca.ui.HierarchicalSelectDialog.prototype.init=function(){sap.m.Dialog.prototype.init.apply(this);this.addStyleClass("sapCaUiHSD");this._oNavContainer=new sap.m.NavContainer(this.getId()+'hsAppContainer',{pages:[]});this._pageIdx=0;sap.m.Dialog.prototype.addContent.apply(this,[this._oNavContainer]);this.setEndButton(new sap.m.Button({text:sap.ca.ui.utils.resourcebundle.getText("hsd.cancelButton"),press:jQuery.proxy(function(){this.close();this.fireCancel()},this),width:"100%"}));this.setShowHeader(false);this.setContentWidth('250px');this.setContentHeight('350px');this.attachAfterOpen(function(){this._oNavContainer.backToTop();var p=this._oNavContainer.getPages();for(var i=0;i<p.length;++i){var a=p[i];var s=sap.ui.getCore().byId(a.getId()+"-searchfield");if(s){s.clear()}}})};
sap.ca.ui.HierarchicalSelectDialog.prototype.addContent=function(c){if(c instanceof sap.ca.ui.HierarchicalSelectDialogItem){this.addItem(c)}else{jQuery.sap.log.error("Only sap.ca.ui.HierarchicalSelectDialogItem are authorized in HierarchicalSelectDialog, also please use the items aggregation")}};
sap.ca.ui.HierarchicalSelectDialog.prototype.addItem=function(i){this.insertItem(i,this.getItems().length)};
sap.ca.ui.HierarchicalSelectDialog.prototype.insertItem=function(i,I){var p="p"+this._pageIdx;var a=i.getTitle();var e=i.getEntityName();var b=i.getListItemTemplate();var n="p"+(this._pageIdx+1);var l=this._getPageContent(p,n,e,b);var c=new sap.m.Page(p,{title:a,content:l});var d=new sap.ui.core.CustomData({key:'list',value:l});var f=new sap.ui.core.CustomData({key:'itemTemplate',value:b});c.setSubHeader(new sap.m.Bar({contentMiddle:[new sap.m.SearchField(c.getId()+"-searchfield",{placeholder:sap.ca.ui.utils.resourcebundle.getText("hsd.searchTextField"),width:"100%",liveChange:this._onSearchItem,customData:[d,f]})]}));if(this._pageIdx!=0){c.setShowNavButton(true);c.attachNavButtonPress(jQuery.proxy(this._onNavigateBack,this));c.onBeforeShow=function(E){jQuery.each(E.data,function(m,h){c.setBindingContext(h,m)})}}else{this._oNavContainer.setInitialPage(c)}if(this._pageIdx>0){var g=this.getItems();g[g.length-1].getListItemTemplate().setType(sap.m.ListType.Navigation)}this._oNavContainer.addPage(c);this._pageIdx++;this.insertAggregation("items",i,I);return this};
sap.ca.ui.HierarchicalSelectDialog.prototype._onSearchItem=function(e){var s=e.getParameter("newValue");var i=e.getSource().data("itemTemplate");var l=e.getSource().data("list").getBinding("items");if(s!==null&&s!==""){var a=i.getMetadata().getProperties();var f=[];jQuery.each(a,function(p,b){var c=i.getBindingInfo(p);if(c!=null){f.push(new sap.ui.model.Filter(c.binding.getPath(),sap.ui.model.FilterOperator.Contains,s))}});l.filter(new sap.ui.model.Filter(f,false))}else{l.filter(null)}};
sap.ca.ui.HierarchicalSelectDialog.prototype._getPageContent=function(p,n,e,i){var l=new sap.m.List(p+"list");var d=new sap.ui.core.CustomData({key:'pageId',value:n});i.setType(sap.m.ListType.Active);i.setIconInset(true);i.attachPress(jQuery.proxy(this._onItemSelected,this));i.addCustomData(d);l.bindItems(e,i);return l};
sap.ca.ui.HierarchicalSelectDialog.prototype._onNavigateBack=function(c,e,d){this._oNavContainer.back()};
sap.ca.ui.HierarchicalSelectDialog.prototype._onItemSelected=function(e){var i=e.getSource();var n=i.data("pageId");var a=this._oNavContainer.getPage(n);if(a){a.setTitle(i.getTitle());this._oNavContainer.to(n,"slide",i.oBindingContexts)}else{this.fireSelect({selectedItem:i});this.close()}};
