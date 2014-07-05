jQuery.sap.declare("sap.ca.scfld.md.app.ButtonListHelper");jQuery.sap.require("sap.ca.ui.dialog.Dialog");sap.ui.base.Object.extend("sap.ca.scfld.md.app.ButtonListHelper",{constructor:function(a,m){this.oApplicationImplementation=a;this.iMode=m;if(this.iMode==20){this.oBar=new sap.m.Bar()}else if(this.iMode>=10){this.oActionSheet=new sap.m.ActionSheet();this.oActionSheet.setPlacement(sap.m.PlacementType.Top);this.oActionSheet.setShowCancelButton(true)}this.aButtons=[];this.startBuild();if(this.iMode==25){this.sDirection="Left"}else{this.sDirection="Right"}},addButtonListHelper:function(b){if(this.oChild){this.oChild.addButtonListHelper(b)}else{this.oChild=b}},startBuild:function(){this.mButtons={};this.aCallBacks=[];this.oPositions={iActive:0,iControlPosition:0};this.bHasOverflow=false;if(this.oChild){this.oChild.startBuild()}},endBuild:function(){for(var i=this.oPositions.iActive;i<this.aButtons.length;i++){var c=this.aButtons[i];if(c.oButton){c.oButton.setVisible(false)}if(c.oSelect){c.oButton.setVisible(false)}}if(this.oChild){this.oChild.endBuild()}this.bIsOverflowReplaced=false},destroy:function(){for(var i=0;i<this.aButtons.length;i++){var c=this.aButtons[i];if(c.oButton){c.oButton.destroy(true)}if(c.oSelect){c.oSelect.destroy(true)}}if(this.oBar){this.oBar.destroy()}if(this.oActionSheet){this.oActionSheet.destroy()}if(this.oChild){this.oChild.destroy()}},ensureButton:function(b,t,m){if(m&&this.oPositions.iActive>=m){if(!this.bHasOverflow){if(!this.oOverflowList){this.oOverflowList=new sap.ca.scfld.md.app.ButtonListHelper(this.oApplicationImplementation,10);this.addButtonListHelper(this.oOverflowList);this.oOverflowList.oBarList=this}this.iOverflowPosition=this.oPositions.iActive;this.ensureButton(sap.ca.scfld.md.app.ButtonListHelper.getOverflowMeta(this),"b");this.bHasOverflow=true}return this.oOverflowList.ensureButton(b,t)}else{var B=this.oPositions.iActive;if(B==this.aButtons.length){this.aButtons.push({})}}return this.ensureControlAtPosition(b,t,B,this.oPositions)},setBtnEnabled:function(i,e){var b=this.mButtons[i];if(b){b.setEnabled(e)}else if(this.oChild){this.oChild.setBtnEnabled(i,e)}},ensureControlAtPosition:function(b,t,B,p){var c=this.aButtons[B];if(t=="b"||this.iMode<20){if(c.oSelect){p.iControlPosition=this.oBar["indexOfContent"+this.sDirection](c.oSelect);c.oSelect.setVisible(false)}if(c.oButton){c.oButton.setVisible(true);if(this.oBar){var C=this.oBar["indexOfContent"+this.sDirection](c.oButton);if(C>p.iControlPosition){p.iControlPosition=C}}}else{c.oButton=new sap.m.Button();c.oButton.attachPress(jQuery.proxy(function(e){if(this.aCallBacks[B]){this.aCallBacks[B](e)}},this));p.iControlPosition++;if(this.iMode>=20){this.oBar["insertContent"+this.sDirection](c.oButton,p.iControlPosition)}else if(this.iMode>=10){this.oActionSheet.addButton(c.oButton)}else if(this.iMode==5){this.oBar.insertContentLeft(c.oButton,p.iControlPosition)}}if(b.sI18nBtnTxt){var o=this.oApplicationImplementation.AppI18nModel.getResourceBundle();var T=o.getText(b.sI18nBtnTxt)}else{var T=b.sBtnTxt}if(this.iMode<20||!b.sIcon){if(T!=c.oButton.getText()){c.oButton.setText(T)}}if(this.iMode==20){if(c.oButton.getType()!=b.style){c.oButton.setType(b.style)}}if(t=="b"){this.aCallBacks[B]=b.onBtnPressed}else{this.aCallBacks[B]=this.getSelectReplacement(b)}var r=c.oButton}else{if(c.oButton){p.iControlPosition=this.oBar["indexOfContent"+this.sDirection](c.oButton);c.oButton.setVisible(false)}if(c.oSelect){c.oSelect.setVisible(true);var C=this.oBar["indexOfContent"+this.sDirection](c.oSelect);if(C>p.iControlPosition){p.iControlPosition=C}c.oSelect.destroyItems()}else{c.oSelect=new sap.m.Select();c.oSelect.setType(sap.m.SelectType.IconOnly);c.oSelect.setAutoAdjustWidth(true);p.iControlPosition++;this.oBar["insertContent"+this.sDirection](c.oSelect,p.iControlPosition);c.oSelect.attachChange(jQuery.proxy(function(e){var k=e.getSource().getSelectedKey();if(this.aCallBacks[B]){this.aCallBacks[B](k)}},this))}if(b.sSelectedItemKey){c.oSelect.setSelectedItem(b.sSelectedItemKey)}for(var i=0;i<b.aItems.length;i++){var s=b.aItems[i];var I=new sap.ui.core.Item(s);c.oSelect.addItem(I)}if(b.sSelectedItemKey){c.oSelect.setSelectedKey(b.sSelectedItemKey)}this.aCallBacks[B]=b.onChange;r=c.oSelect}if(b.sIcon!=r.getIcon()){r.setIcon(b.sIcon)}if(b.sId){this.mButtons[b.sId]=r}r.setEnabled(!b.bDisabled);p.iActive++;return r},getSelectReplacement:function(b){var s=b.sSelectedItemKey;var c=function(r){if(r.selectedIndex>=0){var S=b.aItems[r.selectedIndex].key;if(S!=s){s=S;b.onChange(s)}}};return function(e){var I=[];var S=0;for(var i=0;i<b.aItems.length;i++){I.push({itemContent:b.aItems[i].text});if(b.aItems[i].key==s){S=i}}s=b.aItems[S].key;sap.ca.ui.dialog.selectItem.open({title:e.getSource().getText(),items:I,defaultIndex:S},c)}},revertOverflowReplacement:function(){if(this.bIsOverflowReplaced){this.ensureControlAtPosition(sap.ca.scfld.md.app.ButtonListHelper.getOverflowMeta(this),"b",this.iOverflowPosition,{});this.bIsOverflowReplaced=false}},setBtnText:function(i,t){var b=this.mButtons[i];if(b){b.setText(t)}else if(this.oChild){this.oChild.setText(i,t)}}});
sap.ca.scfld.md.app.ButtonListHelper.getOverflowMeta=function(o){return{sIcon:"sap-icon://overflow",onBtnPressed:function(e){o.oOverflowList.oActionSheet.openBy(e.getSource())}}};