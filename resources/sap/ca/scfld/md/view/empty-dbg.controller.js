jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");
//
sap.ca.scfld.md.controller.BaseDetailController.extend("sap.ca.scfld.md.view.empty", {

	onInit : function() {
		var sLink = document.createElement('link');
		sLink.setAttribute('rel', 'stylesheet');
		sLink.setAttribute('type', 'text/css');
		sLink.setAttribute('href', 'resources/sap/ca/scfld/md/css/flower.css');
		sLink.setAttribute('id', 'emptyView_stylesheet');
		document.getElementsByTagName('head')[0].appendChild(sLink);

		this.oRouter.attachRouteMatched(function(oEvent) {
			if (oEvent.getParameter("name") === "noData") {
				var oArgument = oEvent.getParameter("arguments");
				// set view title
				var oPage = this.byId("sap.ca.scfld.md.view.empty");
				var sTitle= this.oApplicationFacade.oApplicationImplementation.getResourceBundle().getText(
						oArgument.viewTitle);
				if (sTitle == undefined || sTitle == oArgument.viewTitle) {
					//fallback: show message also as title
					sTitle = this.oApplicationFacade.oApplicationImplementation.getUiLibResourceBundle().getText(
							"NO_ITEMS_AVAILABLE");
				};
				oPage.setTitle(sTitle);
				
				// set message text
				var oLabel = this.byId("emptyLabel");				
				var sMessage = this.oApplicationFacade.oApplicationImplementation.getUiLibResourceBundle().getText(
						oArgument.languageKey);
				if (sMessage == undefined || sMessage == oArgument.languageKey) {
					//fallback
					sMessage = this.oApplicationFacade.oApplicationImplementation.getUiLibResourceBundle().getText(
							"NO_ITEMS_AVAILABLE");
				};
				oLabel.setText(sMessage);
			}
		}, this);
	}

});
