// Copyright (c) 2013 SAP AG, All Rights Reserved
/**
 * @fileOverview This file contains miscellaneous functions which may be used
 * to override/replace existing SAPUI5 methods.
 */

(function () {
    "use strict";
    /*global jQuery, sap, setTimeout */

    // ensure that sap.ushell exists
    jQuery.sap.declare("sap.ushell.override");

    sap.ushell.override = {};

    /**
     * Override sap.ui.base.ManagedObject.updateAggregation
     *
     * This is a generic drop-in replacement. It avoids the destroy items call.
     * Instead, the bindings of existing items are updated.
     *
     * Note: Listbindings with grouping and Treebindings are not supported. In
     * these cases, the default method is still invoked.
     */
    sap.ushell.override.updateAggregation = function (sName) {
        if (this.isTreeBinding(sName)) {
            // no idea how to handle -> delegate to parent 
            sap.ui.base.ManagedObject.prototype.updateAggregation.apply(this, arguments);
        } else {
            var oBindingInfo = this.mBindingInfos[sName],
                oBinding = oBindingInfo.binding,
                fnFactory = oBindingInfo.factory,
                oAggregationInfo = this.getMetadata().getJSONKeys()[sName],  // TODO fix handling of hidden aggregations
                oNewGroup = null,
                sGroupFunction = null,
                bGrouped = null,
                sGroup = null,
                iListIndex = 0,
                iLastIndex = 0,
                aItems = [],
                aToBeDestroyed = [],
                that = this;
//            this[oAggregationInfo._sDestructor]();

            sGroupFunction = oAggregationInfo._sMutator + "Group";
            bGrouped = oBinding.isGrouped() && this[sGroupFunction];
            if (bGrouped) {
               // do not handle grouped aggregations -> delegate to parent 
                sap.ui.base.ManagedObject.prototype.updateAggregation.apply(this, arguments);

            } else {
                aItems = this[oAggregationInfo._sGetter](); // get all items

                jQuery.each(oBinding.getContexts(), function (iIndex, oContext) {
                    /* Ignore groups part -> has been delegated 
                    if (bGrouped && oBinding.aSorters.length > 0) {
                        oNewGroup = oBinding.aSorters[0].fnGroup(oContext);
                        if (typeof oNewGroup == "string") {
                            oNewGroup = {
                                key: oNewGroup
                            };
                        } 
                        if (oNewGroup.key !== sGroup) {
                            var oGroupHeader;
                            //If factory is defined use it
                            if (oBindingInfo.groupHeaderFactory) {
                                oGroupHeader = oBindingInfo.groupHeaderFactory(oNewGroup);
                            }
                            that[sGroupFunction](oNewGroup, oGroupHeader);
                            sGroup = oNewGroup.key;
                        }
                    }
                    */

                    if (iListIndex < aItems.length) {
                        // case A: there is an existing item to reuse
                        aItems[iListIndex].setBindingContext(oContext, oBindingInfo.model);
                    } else {
                        // case B: list is too short, create new item
                        var sId = that.getId() + "-" + iIndex,
                            oClone = fnFactory(sId, oContext).setBindingContext(oContext, oBindingInfo.model);
                        that[oAggregationInfo._sMutator](oClone);
                    }
                    iLastIndex = iListIndex = iListIndex + 1;
                });

                // case C: list is too long, remove & destroy items
                for (iListIndex = aItems.length - 1; iListIndex >= iLastIndex; iListIndex = iListIndex - 1) {
                    aToBeDestroyed.push(that[oAggregationInfo._sRemoveMutator](aItems[iListIndex]));
                }

                //TODO: Check alternative to destruction: Pool in some internal cache
                if (aToBeDestroyed.length > 0) {
                    // window.setTimeout(function () { //Delayed destruction ...
                    // Delaying causes errors if elements are removed/added in quick succession -> disable 
                    jQuery.each(aToBeDestroyed, function () {
                        this.destroy();
                    });
                    // }, 1);
                }
            }
        }
    };

    /**
     * Override sap.ui.base.ManagedObject.updateAggregation
     *
     * This is a generic drop-in replacement. It avoids the destroy items call.
     * Instead, the bindings of existing items are updated. Enables grouping!
     *
     * Note: Treebindings are not supported. In
     * these cases, the default method is still invoked.
     */
    sap.ushell.override.updateAggregationGrouped = function (sName) {
        var oBindingInfo = this.mBindingInfos[sName],
            oBinding = oBindingInfo.binding,
            fnFactory = oBindingInfo.factory,
            oAggregationInfo = this.getMetadata().getJSONKeys()[sName],  // TODO fix handling of hidden aggregations
            oClone,
            oNewGroup = null,
            bGrouped = null,
            sGroup = null,
            that = this,
            aItems = that.getItems(),
            iLastIndex = 0,
            iListIndex = 0,
            i,
            sId,
            aToBeDestroyed = [];

        bGrouped = oBinding.isGrouped() && this.addItemGroup;
        jQuery.each(oBinding.getContexts(), function (iIndex, oContext) {
            if (bGrouped && oBinding.aSorters.length > 0) {
                oNewGroup = oBinding.aSorters[0].fnGroup(oContext);
                if (typeof oNewGroup === "string") {
                    oNewGroup = {
                        key: oNewGroup
                    };
                }
                if (oNewGroup.key !== sGroup) {
                    var oGroupHeader,
                        oHeader;
                    //If factory is defined use it
                    if (oBindingInfo.groupHeaderFactory) {
                        oGroupHeader = oBindingInfo.groupHeaderFactory(oNewGroup);
                    }
                    oHeader = oGroupHeader || new sap.m.GroupHeaderListItem({
                        title: oNewGroup.text || oNewGroup.key
                    }).addStyleClass("sapMListHdr");

                    that.insertAggregation("items", oHeader, iListIndex, true);
                    iListIndex = iListIndex + 1;
                    sGroup = oNewGroup.key;
                }
            }
            aItems = that.getItems();
            for (i = iListIndex; i < aItems.length; i = i + 1) {
                if (aItems[i].constructor === sap.m.GroupHeaderListItem) {
                    aToBeDestroyed.push(that.removeItem(aItems[i]));
                    aItems = that.getItems();
                }
            }
            if (iListIndex < aItems.length) {
                aItems[iListIndex].setBindingContext(oContext, oBindingInfo.model);
                if (aItems[iListIndex].aDelegates) {
                    jQuery.each(aItems[iListIndex].aDelegates, function (i, v) {
                        v.vThis = oContext;
                    });
                }
            } else {
                sId = that.getId() + "-" + iListIndex;
                oClone = fnFactory(sId, oContext);
                oClone.setBindingContext(oContext, oBindingInfo.model);
                that.addItem(oClone);
            }
            iListIndex = iListIndex + 1;
            iLastIndex = iListIndex;
        });

        for (i = aItems.length - 1; i >= iLastIndex; i = i - 1) {
            aToBeDestroyed.push(that.removeItem(aItems[i]));
        }

        setTimeout(function () {
            jQuery.each(aToBeDestroyed, function (i, v) {
                v.destroy();
            });
        }, 1);
    };

    /**
     * Create a very simple update function that will reuse the elements in the container instead
     * of creating new ones. The function does not support sorting or filtering.
     *
     * @param {string} sName
     *     the name of the aggregation
     */
    sap.ushell.override.updateAggregatesFactory = function (sName) {
        return function () {
            var sGetter = "get" + sName.substr(0, 1).toUpperCase() + sName.substr(1),
                oBindingInfo = this.mBindingInfos[sName],
                aBindingContexts = oBindingInfo.binding.getContexts(),
                fnFactory = oBindingInfo.factory,
                oAggregationInfo = this.getMetadata().getJSONKeys()[sName],
                aItems = this[sGetter](),
                that = this,
                i = 0,
                addNewItem = function (iIndex, oContext) {
                    var sId = that.getId() + "-" + iIndex,
                        oClone = fnFactory(sId, oContext);
                    oClone.setBindingContext(oContext, oBindingInfo.model);
                    that[oAggregationInfo._sMutator](oClone);
                };

            // Bind as many context as possible to existing elements. Create new ones if necessary.
            for (i = 0; i < aBindingContexts.length; ++i) {
                if (i < aItems.length) {
                    aItems[i].setBindingContext(aBindingContexts[i], oBindingInfo.model);
                } else {
                    addNewItem(i, aBindingContexts[i]);
                }
            }

            // Delete unused elements.
            for (; i < aItems.length; ++i) {
                aItems[i].destroy();
            }

            // Update the array length.
            aItems.length = aBindingContexts.length;
        };
    };
}());
