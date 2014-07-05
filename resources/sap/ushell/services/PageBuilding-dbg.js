// Copyright (c) 2013 SAP AG, All Rights Reserved
/**
 * @fileOverview The Unified Shell's page building service.
 *
 * @version 1.16.3
 */
(function () {
    "use strict";
    /*global jQuery, sap */
    jQuery.sap.declare("sap.ushell.services.PageBuilding");

    jQuery.sap.require("sap.ui2.srvc.factory");
    jQuery.sap.require("sap.ui2.srvc.page");

    /**
     * This method MUST be called by the Unified Shell's container only, others MUST call
     * <code>sap.ushell.Container.getService("PageBuilding")</code>.
     * Constructs a new instance of the page building service.
     *
     * @param {object} oAdapter
     *     the page building adapter for the logon system
     *
     * @class The Unified Shell's page building service.
     *
     * @constructor
     * @see sap.ushell.services.Container#getService
     * @since 1.15.0
     * @private
     */
    sap.ushell.services.PageBuilding = function (oAdapter, oContainerInterface) {
        var oFactory = new sap.ui2.srvc.Factory(oAdapter.getPageBuildingService());

        /**
         * Read the catalog from the correct system. Create an adapter if necessary. The service
         * adds this function to the factory. The catalog will use this function when it exists.
         * @param {object} oRawData
         *     the catalog raw data as known so far (must at least contain <code>id</code>)
         * @param {function (object)} fnSuccess
         *     success handler, passing the resulting raw data
         * @param {function (string)} fnFailure
         *     error handler, taking an error message
         * @private
         */
        oFactory.readCatalogData = function (oRawData, fnSuccess, fnFailure) {

            // This function is used when a response from the remote system has arrived. Only the
            // chips are taken, the catalog itself remains the one from the logon system. The
            // chips' remoteCatalogId and url are adjusted.
            function onLoadRemote(oRemoteData) {
                var aChips = oRemoteData.Chips.results || oRemoteData.Chips, // fallback for HANA
                    i;
                oRawData.Chips = oRemoteData.Chips;
                for (i = 0; i < aChips.length; i += 1) {
                    aChips[i].remoteCatalogId = oRawData.id;
                }
                sap.ui2.srvc.call(fnSuccess.bind(null, oRawData), fnFailure);
            }

            // request the referenced catalog from the HANA system
            function requestFromHana() {
                // request an adapter for the system (returns a promise)
                // TODO adapter cache (either here or even in Container)
                oContainerInterface.createAdapter(new sap.ushell.System({
                    alias: oRawData.systemId,
                    platform: 'hana',
                    baseUrl: oRawData.baseUrl
                })).fail(fnFailure).done(function (oRemoteAdapter) {
                    oRemoteAdapter.getPageBuildingService().readCatalog(oRawData.remoteId,
                        onLoadRemote, fnFailure);
                });
            }

            // This function is used when a response from the logon system has arrived. It checks
            // whether the received catalog is a remote one and requests it.
            function onLoadLocal(oLocalData) {
                if (oLocalData.type === 'H') {
                    oRawData = oLocalData;  // remember the data to re-use it in onLoadRemote
                    requestFromHana();
                } else {
                    sap.ui2.srvc.call(fnSuccess.bind(null, oLocalData), fnFailure);
                }
            }

            if (typeof oRawData !== "object" || typeof oRawData.id !== "string") {
                // no further spec because this is not really an API function
                throw new sap.ushell.utils.Error("Invalid input for readCatalogData: " + oRawData,
                    "sap.ushell.services.PageBuilding");
            }
            if (oRawData.type === 'H') {
                requestFromHana();
            } else {
                // request the catalog from the logon system
                oAdapter.getPageBuildingService().readCatalog(oRawData.id, onLoadLocal,
                    fnFailure);
            }
        };

        /**
         * Returns the UI2 page building factory.
         * @returns {sap.ui2.srvc.Factory}
         *     the page building factory
         */
        this.getFactory = function () {
            return oFactory;
        };

        /**
         * Returns a stub for the page with the given ID.
         *
         * @param {string} sPageId
         *     the page ID
         *
         * @returns {sap.ui2.srvc.Page}
         *     the page, as a stub
         * @since 1.15.0
         */
        this.getPage = function (sPageId) {
            return oFactory.createPage(sPageId);
        };

        /**
         * Returns a page set.
         *
         * @param {string} sId
         *   the page set ID
         * @returns {object}
         *   a jQuery promise. Its success handler gets a sap.ui2.srvc.PageSet.
         * @since 1.15.0
         */
        this.getPageSet = function (sId) {
            var oDeferred = new jQuery.Deferred();
            oFactory.createPageSet(sId, oDeferred.resolve, oDeferred.reject.bind(oDeferred));
            return oDeferred.promise();
        };
    };
}());
