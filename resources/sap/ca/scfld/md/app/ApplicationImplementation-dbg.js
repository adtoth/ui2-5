jQuery.sap.declare("sap.ca.scfld.md.app.ApplicationImplementation");
jQuery.sap.require("sap.ca.scfld.md.app.ConnectionManager");
jQuery.sap.require("sap.ca.scfld.md.app.MasterHeaderFooterHelper");
jQuery.sap.require("sap.ca.scfld.md.app.DetailHeaderFooterHelper");
jQuery.sap.require("sap.ca.scfld.md.app.FullScreenHeaderFooterHelper");

sap.ui.base.ManagedObject.extend("sap.ca.scfld.md.app.ApplicationImplementation", {

	metadata : {

		properties : {
			identity : "string",
			component : "object",
			oViewHook : "string"
		},
		methods : ["getConnectionManager"]
	},

	init : function() {

	},
	
	sI18N : "i18n",

	startApplication : function(oConfiguration) {

		this.oMHFHelper = new sap.ca.scfld.md.app.MasterHeaderFooterHelper(this);
		this.oDHFHelper = new sap.ca.scfld.md.app.DetailHeaderFooterHelper(this);
		this.oFHFHelper = new sap.ca.scfld.md.app.FullScreenHeaderFooterHelper(this);
		this.oConfiguration = oConfiguration;
		this.aMasterKeys = oConfiguration.getMasterKeyAttributes();
		this.aKeyValues = null;

		var oLocale = sap.ui.getCore().getConfiguration().getFormatLocale();
		var sBundleName = this.getIdentity() + ".i18n.i18n";
		this.AppI18nModel = new sap.ui.model.resource.ResourceModel({
			bundleName : sBundleName,
			bundleLocale : oLocale
		});

		var oComponent = this.getComponent();
		if (!sap.ui.getCore().getConfiguration().getDisableCustomizing()) {
			var oMetadata = oComponent.getMetadata();
			if (oMetadata) {
				var oExtServices = oMetadata.getConfig("sap.ca.i18Nconfigs");
				if (oExtServices.bundleName) {
					this.AppI18nModel.enhance(oExtServices);
				}
			}
		}
		this.UilibI18nModel = new sap.ui.model.resource.ResourceModel({
			bundleName : "sap.ca.scfld.md.i18n.i18n",
			bundleLocale : oLocale
		});

		this.oConnectionManager = sap.ca.scfld.md.app.ConnectionManager.getNewInstance(this.getIdentity(),
				this.oConfiguration, {}, this.getComponent());

		this.bIsPhone = jQuery.device.is.phone;

		var oHookPage = sap.ui.getCore().byId(this.getOViewHook());
		oHookPage.setModel(this.AppI18nModel, this.sI18N);

	},

	getResourceBundle : function() {
		return this.AppI18nModel.getResourceBundle();
	},

	getUiLibResourceBundle : function() {
		return this.UilibI18nModel.getResourceBundle();
	},

	getODataModel : function(sName) {
		if (sName == this.sI18N){
			return this.AppI18nModel;
		}
		return this.oConnectionManager.getModel(sName);
	},
	
	setModels : function(oController) {
		var view = oController.getView();
		view.setModel(this.AppI18nModel, this.sI18N);
		// FIXME: this should not be needed but don't work if
		// not here
		view.setModel(sap.ui.getCore().getModel("device"), "device");
		
		jQuery.each(this.oConnectionManager.modelList, function(name, model) {
			if (name == "undefined") {
				view.setModel(model);
			} else {
				view.setModel(model, name);
			}
		});
	},

	isMock : function() {
		// The "reponder" URL parameter defines if the app shall run with mock
		// data
		var responderOn = jQuery.sap.getUriParameters().get("responderOn");

		// set the flag for later usage
		return ("true" === responderOn);
	},

	getConnectionManager : function() {

		return this.oConnectionManager;
	},

	onMasterRefreshed : function(oController) {
		this.setStoredSelectedItem(oController);
	},

	// Called each time the list binding is changed
	onMasterChanged : function(oController) {
		this.oMHFHelper.defineMasterHeaderFooter(oController);
	},

	setStoredSelectedItem : function(oController) {
		if (!this.aKeyValues) {
			return;
		}
		var oList = oController.getList();
		var aItems = oList.getItems();
		if (aItems.length == 0)
		// empty list
		{
			return;
		}
		oList.removeSelections();
		for ( var i = 0; i < aItems.length; i++) {
			var bFound = true;
			var oListItem = aItems[i];
			if ((oListItem instanceof sap.m.GroupHeaderListItem)){
				continue;
			}
			var oItemBinding = oListItem.getBindingContext(this.sModelName);
			for ( var j = 0; bFound && j < this.aKeyValues.length; j++) {
				bFound = this.aKeyValues[j] == oItemBinding.getProperty(this.aMasterKeys[j]);
			}
			if (bFound) {
				// only phone: set line as selected
				if (this.bIsPhone) {
					oListItem.setSelected(true);
					oList.setSelectedItem(oListItem, true);
				}
				break;
			}
		}
		// stored item not found in refreshed list; select first list entry
		if (!bFound) {
			var oListItem = aItems[0];
		}
		// only non phone (split mode): trigger lead selection including navigation to detail
		if (!this.bIsPhone) {
			oList.fireSelect({
				listItem : oListItem
			});
		}
		return;
	},

	// set header and footer of a detail page
	defineDetailHeaderFooter : function(oController) {
		this.oDHFHelper.defineDetailHeaderFooter(oController);
	},

	defineFullscreenHeaderFooter : function(oController) {
		this.oFHFHelper.defineHeaderFooter(oController);

	},

	setSplitContainer : function(oSplitContainer) {
		this.oSplitContainer = oSplitContainer;
	},
	
	registerExitModule : function(fExitModule){
		if (!this.aExitModules){
			this.aExitModules = [];
			var oComponent = this.getComponent();
			if (oComponent.exit){ 
			  var fAppExit = jQuery.proxy(oComponent.exit, oComponent);
			} else {
				var fAppExit = function(){};
			}
			oComponent.exit = jQuery.proxy(function(){
	      for (var i = 0; i < this.aExitModules.length; i++){
	      	this.aExitModules[i]();
	      }
	      fAppExit();
			}, this);
		}
		this.aExitModules.push(fExitModule);
	},
	
	setMasterListBinding : function(oController, oBinding){
		if (oController._oMasterListBinding){
			oController._oMasterListBinding.detachChange(oController._onMasterListLoaded, oController);
			oController._oMasterListBinding.detachChange(oController._onMasterListChanged, oController);
		}

		oController._oMasterListBinding = oBinding;
		if (oController._oMasterListBinding){
			oController._oMasterListBinding.attachChange(oController._onMasterListLoaded, oController);
			oController._oMasterListBinding.attachChange(oController._onMasterListChanged, oController);
		}
	}
});

