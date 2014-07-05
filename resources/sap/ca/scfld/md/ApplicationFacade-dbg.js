jQuery.sap.declare("sap.ca.scfld.md.ApplicationFacade");

sap.ui.base.Object.extend("sap.ca.scfld.md.ApplicationFacade", {

	
  /**
   * This class represents a Master Detail App. It provides access to generic services.
   * @class
   * Note that the App does not create an instance of this class on its own.
   * The App will get access to this instance in its implementation of &lt;identity&gt;.Configuration.getApplicationParameters(oApplicationFacade).
   * It is recommended that the app stores the reference to this instance in an appropriate variable .
   */	
	constructor : function(oApplicationImplementation){
		this.oApplicationImplementation = oApplicationImplementation;
	},
	
	/**
	 * Use this method to access the resource bundle of the App
	 * @returns the resource bundle of this App
	 */
	getResourceBundle : function(){
		return this.oApplicationImplementation.getResourceBundle();
	},


  /**
   * Return a specific ODataModel based on its name as defined in the configuration.</br>
   * Note that there is a special logic in case the specified name is <i>i18n</i>. In this case the
   * resource model for this App is returned.
   * @param sName the name of the ODataModel to retrieve, or undefined for the default model
   * @returns {sap.ui.model.Model } the requested ODataModel. Actually this will be an
   * instance of <code>sap.ui.model.odata.ODataModel</code>. The only exception is, when <code>sName == 'i18n'</code>.
   * In this case it is an instance of <code>sap.ui.model.resource.ResourceModel</code>.  
   */
  getODataModel : function(sName) {
      return this.oApplicationImplementation.getODataModel(sName);
  },

	/**
	 * Utility function to determine if we are running the application against
	 * some mock data
	 * 
	 * @returns {boolean} A flag depending on the <code>responderOn</code> uri
	 *          parameter
	 */
	isMock : function() {
		return this.oApplicationImplementation.isMock();
	}	
});
