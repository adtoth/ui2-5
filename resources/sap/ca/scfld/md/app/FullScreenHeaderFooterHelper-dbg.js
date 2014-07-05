jQuery.sap.declare("sap.ca.scfld.md.app.FullScreenHeaderFooterHelper");
jQuery.sap.require("sap.ushell.ui.footerbar.JamShareButton");
jQuery.sap.require("sap.ushell.ui.footerbar.JamDiscussButton");
jQuery.sap.require("sap.ushell.ui.footerbar.AddBookmarkButton");
jQuery.sap.require("sap.ca.scfld.md.app.ButtonListHelper");
jQuery.sap.require("sap.ca.scfld.md.app.CommonHeaderFooterHelper");

sap.ui.base.Object
		.extend(
				"sap.ca.scfld.md.app.FullScreenHeaderFooterHelper",
				{

					constructor : function(oApplicationImplementation) {
						this.oAppImp = oApplicationImplementation;
						this.oCommonHeaderFooterHelper = new sap.ca.scfld.md.app.CommonHeaderFooterHelper(
								oApplicationImplementation, this.detailHeaderFooterRules);
					},

					detailHeaderFooterRules : {
                        maxBtnCountXL : 4,
                        maxBtnCountL  : 3,
                        maxBtnCountM  : 2,
                        maxBtnCountS  : 1
					},

					defineHeaderFooter : function(oController) {
						var oOptions = oController.getHeaderFooterOptions();
						this.setHeaderFooter(oController, oOptions);
					},

					setHeaderFooter : function(oController, oOptions) {
						if (!oOptions) {
							return;
						}
						var oPage = this.oCommonHeaderFooterHelper.startBuild(oController, oOptions, {
							iSettingsPosition : 0
						});
						this.oCommonHeaderFooterHelper.createSettingsButton(oController);
						var bHasFooterButtons = this.needsFooter(oController);
					// important to run header before footer, as the addBookmark button relies on the title
						this.defineHeader(oController, oPage, bHasFooterButtons);
						this.defineFooter(oController, oPage, bHasFooterButtons);
						this.oCommonHeaderFooterHelper.endBuild(oController);
					},

					defineFooter : function(oController, oPage, bHasFooterButtons) {
						if (bHasFooterButtons) {
							if (oController._oControlStore.iSettingsPosition > -1) {
								if (oController._oControlStore.iSettingsPosition == 1) {
									oController._oControlStore.oHeaderBar.removeContentRight(oController._oControlStore.oSettingsButton);
								}
								oController._oControlStore.oButtonListHelper.oBar.insertContentLeft(
										oController._oControlStore.oSettingsButton, 0);
								oController._oControlStore.iSettingsPosition = -1;
							}							
							var iFooterRightCount = this.getFooterRightCount(oController);
							this.oCommonHeaderFooterHelper.defineFooterRight(oController, oPage, iFooterRightCount,
									this.oAppImp.bIsPhone, false);
							if (!this.oAppImp.bIsPhone) {
								if (!oController._oControlStore.oLeftButtonList) {
									oController._oControlStore.oLeftButtonList = new sap.ca.scfld.md.app.ButtonListHelper(this.oAppImp, 25);
									oController._oControlStore.oLeftButtonList.oBar = oController._oControlStore.oButtonListHelper.oBar;
									oController._oControlStore.oButtonListHelper
											.addButtonListHelper(oController._oControlStore.oLeftButtonList);
								}
								this.oCommonHeaderFooterHelper.getGenericButtons(3, oController,
										oController._oControlStore.oLeftButtonList);
							}
						}
					},

					defineHeader : function(oController, oPage, bHasFooterButtons) {
						this.oCommonHeaderFooterHelper.ensureHeader(oController, oPage, true);
						if (oController._oHeaderFooterOptions.sI18NFullscreenTitle){
							var oBundle = this.oAppImp.getResourceBundle();
							var sTitle = oBundle.getText(oController._oHeaderFooterOptions.sI18NFullscreenTitle);
						} else if (oController._oHeaderFooterOptions.sFullscreenTitle){
							var sTitle = oController._oHeaderFooterOptions.sFullscreenTitle;
						} else{
							var oBundle = this.oAppImp.getResourceBundle();
							var sTitle = oBundle.getText("FULLSCREEN_TITLE");								
						}
						oController._oControlStore.oTitle.setText(sTitle);
						if (!bHasFooterButtons){
							if (oController._oControlStore.iSettingsPosition < 1) {
								if (oController._oControlStore.iSettingsPosition == -1) {
									oController._oControlStore.oButtonListHelper.oBar.removeContentLeft(oController._oControlStore.oSettingsButton);
								}
								oController._oControlStore.oHeaderBar.addContentRight(oController._oControlStore.oSettingsButton);
								oController._oControlStore.iSettingsPosition = 1;
							}
						} 
						if (oController._oControlStore.oFacetFilterButton){
							oController._oControlStore.oFacetFilterButton.setVisible(!!oController._oHeaderFooterOptions.onFacetFilter);
						} else if (oController._oHeaderFooterOptions.onFacetFilter){
							oController._oControlStore.oFacetFilterButton = new sap.m.Button();
							oController._oControlStore.oFacetFilterButton.setIcon("sap-icon://filter");
							oController._oControlStore.oFacetFilterButton.attachPress(function(oEvent){
								oController._oHeaderFooterOptions.onFacetFilter(oEvent);
							});
							oController._oControlStore.oHeaderBar.addContentRight(oController._oControlStore.oFacetFilterButton);									
						}
					},

					needsFooter : function(oController) {
						return oController._oHeaderFooterOptions.onFacetFilter || 
						  this.oCommonHeaderFooterHelper.getGenericCount(oController) > 0 || 
						  this.oCommonHeaderFooterHelper.getActionsCount(oController) > 0 ||
						  this.oCommonHeaderFooterHelper.hasShareButtons(oController);
					},
					
					getFooterRightCount : function(oController){
                        var sTSize;
                        if (oController.oApplicationImplementation.bIsPhone && jQuery.device.is.portrait )
                                { sTSize = "S"; }
                        else if (oController.oApplicationImplementation.bIsPhone && jQuery.device.is.landscape )
                                { sTSize = "M"; }
                        else 
                                { sTSize = "XL"; }						
						
						if (this.oAppImp.bIsPhone){
							var iCount = this.oCommonHeaderFooterHelper.getActionsCount(oController);
							if (iCount < 2){
								return 4;
							}
							if (iCount == 2 && this.oCommonHeaderFooterHelper.getGenericCount(oController) == 0){
								return 2;
							}
							//return 1;
						}
						return this.oCommonHeaderFooterHelper.getFooterRightCount(oController, sTSize);
					}
				});