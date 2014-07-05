/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ushell.ui.launchpad.GroupListItem");jQuery.sap.require("sap.ushell.library");jQuery.sap.require("sap.m.ListItemBase");sap.m.ListItemBase.extend("sap.ushell.ui.launchpad.GroupListItem",{metadata:{library:"sap.ushell",properties:{"title":{type:"string",group:"Misc",defaultValue:null},"defaultGroup":{type:"boolean",group:"Misc",defaultValue:false},"show":{type:"boolean",group:"Misc",defaultValue:true},"editMode":{type:"boolean",group:"Misc",defaultValue:false},"groupId":{type:"string",group:"Misc",defaultValue:null},"index":{type:"int",group:"Misc",defaultValue:null},"allowEditMode":{type:"boolean",group:"Misc",defaultValue:true},"removable":{type:"boolean",group:"Misc",defaultValue:null},"numberOfTiles":{type:"int",group:"Misc",defaultValue:0}},events:{"press":{},"change":{},"drop":{},"over":{},"afterRendering":{},"out":{}}}});sap.ushell.ui.launchpad.GroupListItem.M_EVENTS={'press':'press','change':'change','drop':'drop','over':'over','afterRendering':'afterRendering','out':'out'};
// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.require("sap.m.Input");jQuery.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-core');jQuery.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-widget');jQuery.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-mouse');jQuery.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-droppable');sap.ushell.ui.launchpad.GroupListItem.prototype.init=function(){this._sDefaultValue=sap.ushell.resources.i18n.getText("new_group_name");this._sOldTitle="";this.oEditInputField=new sap.m.Input({placeholder:this._sDefaultValue,value:this.getTitle()});this.oEditInputField.onfocusout=jQuery.proxy(this._stopEdit,this)};sap.ushell.ui.launchpad.GroupListItem.prototype.exit=function(){this.$().unbind("drop",this._handleDrop).unbind("dropover",this._handleDropOver).droppable("destroy");this.oEditInputField.destroy();sap.m.ListItemBase.prototype.exit.apply(this,arguments)};sap.ushell.ui.launchpad.GroupListItem.prototype.onBeforeRendering=function(){this.$().unbind("drop",this._handleDrop).unbind("dropover",this._handleDropOver).droppable("destroy")};sap.ushell.ui.launchpad.GroupListItem.prototype.onAfterRendering=function(){var j=jQuery.sap.byId(this.sId),h=!this.getShow()||(this.getDefaultGroup()&&this.getNumberOfTiles()===0);if(this.getEditMode()){this.focus();jQuery.sap.byId(this.oEditInputField.sId).click()}this.$().droppable({greedy:true,tolerance:"pointer",accept:".sapUshellTile",over:jQuery.proxy(this._handleOver,this),out:jQuery.proxy(this._handleOut,this),drop:jQuery.proxy(this._handleDrop,this)});if(!h){j.css("display","flex")}else{j.css("display","none")}this.fireAfterRendering()};sap.ushell.ui.launchpad.GroupListItem.prototype.getFocusDomRef=function(){return(this.getEditMode()&&this.oEditInputField&&this.oEditInputField.getFocusDomRef())||this.getDomRef()};sap.ushell.ui.launchpad.GroupListItem.prototype._startEdit=function(){if(this.getAllowEditMode()){this._sOldTitle=this.oEditInputField.getValue();this.setEditMode(true);this.focus()}};sap.ushell.ui.launchpad.GroupListItem.prototype._stopEdit=function(){if(!this.getEditMode()){return}var c=this.oEditInputField.getValue().trim(),n=c||this._sDefaultValue,h=n!==this._sOldTitle;if(h){this.setTitle(n).fireChange({newTitle:n})}this.setEditMode(false);var a=document.activeElement;if(a.nodeName.toLowerCase()!=="body"&&a.nodeName.toLowerCase()!=="span"){a.blur()}var j=jQuery("#groupList");j.trigger("resize",[j.width(),j.height()])};sap.ushell.ui.launchpad.GroupListItem.prototype._handleOver=function(e,u){jQuery("#"+this.sId).addClass("drop");this.fireOver({control:(u&&u.draggable&&(u.draggable.length>0)&&sap.ui.getCore().byId(u.draggable[0].id))||undefined})};sap.ushell.ui.launchpad.GroupListItem.prototype._handleOut=function(e,u){jQuery("#"+this.sId).removeClass("drop");this.fireOut({control:(u&&u.draggable&&(u.draggable.length>0)&&sap.ui.getCore().byId(u.draggable[0].id))||undefined})};sap.ushell.ui.launchpad.GroupListItem.prototype._handleDrop=function(e,u){this.fireDrop({control:(u&&u.draggable&&(u.draggable.length>0)&&sap.ui.getCore().byId(u.draggable[0].id))||undefined})};sap.ushell.ui.launchpad.GroupListItem.prototype.onclick=function(e){this.firePress({id:this.getId()});if(jQuery.device.is.phone){sap.ui.getCore().byId("shell").setShowPane(false)}};sap.ushell.ui.launchpad.GroupListItem.prototype.onmousedown=function(){this.focus()};sap.ushell.ui.launchpad.GroupListItem.prototype.ondblclick=function(){if(!jQuery.device.is.phone){this._startEdit()}};sap.ushell.ui.launchpad.GroupListItem.prototype.onsapenter=function(){if(!jQuery.device.is.phone){this._stopEdit()}};sap.ushell.ui.launchpad.GroupListItem.prototype.onsapescape=function(){if(!jQuery.device.is.phone){this._stopEdit()}};sap.ushell.ui.launchpad.GroupListItem.prototype.setEditMode=function(m){this.setProperty("editMode",m,true);if(jQuery.device.is.phone&&(m===false)){sap.ui.getCore().byId("shell").setShowPane(false)}setTimeout(function(){var j=jQuery("#groupList");j.trigger("resize",[j.width(),j.height()])},5);return this.toggleStyleClass("editing",m)};sap.ushell.ui.launchpad.GroupListItem.prototype.setAllowEditMode=function(a){this.setProperty("allowEditMode",a,true);return this};sap.ushell.ui.launchpad.GroupListItem.prototype.setRemovable=function(r){this.setProperty("removable",r,true);return this};sap.ushell.ui.launchpad.GroupListItem.prototype.setGroupId=function(g){this.setProperty("groupId",g,true);return this};sap.ushell.ui.launchpad.GroupListItem.prototype.setTitle=function(t){this.setProperty("title",t,true);this.oEditInputField.setValue(t);this.$().find(".sapMSLITitleOnly").text(t);return this}}());
