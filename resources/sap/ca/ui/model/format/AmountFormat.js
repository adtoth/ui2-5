/*!
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.model.format.AmountFormat");jQuery.sap.require("sap.ui.core.LocaleData");jQuery.sap.require("sap.ca.ui.model.format.FormatHelper");jQuery.sap.require("sap.ca.ui.model.format.NumberFormat");jQuery.sap.require("sap.ca.ui.utils.resourcebundle");
sap.ca.ui.model.format.AmountFormat=function(){throw new Error()};
sap.ca.ui.model.format.AmountFormat.oValueInfo={oDefaultFormatOptions:{style:"standard",decimals:2}};sap.ca.ui.model.format.AmountFormat.oCurrencyModel=null;
sap.ca.ui.model.format.AmountFormat.getInstance=function(c,f,l){return this.createInstance(c,f,l,this.oValueInfo)};
sap.ca.ui.model.format.AmountFormat.createInstance=function(c,f,l,i){var F=jQuery.sap.newObject(this.prototype);if(f instanceof sap.ui.core.Locale){l=f;f=undefined}if(!l){F.oLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()}else{F.oLocale=new sap.ui.core.Locale(l)}F.oLocaleData=sap.ui.core.LocaleData.getInstance(F.oLocale);F.oFormatOptions=jQuery.extend(false,{},i.oDefaultFormatOptions,f);F.init(c,f);return F};
sap.ca.ui.model.format.AmountFormat.prototype.init=function(c,f){if(f){if(f.decimals!=undefined){return}}if(c){if(!sap.ca.ui.model.format.AmountFormat.oCurrencyModel){sap.ca.ui.model.format.AmountFormat.oCurrencyModel=new sap.ui.model.json.JSONModel();var p=jQuery.sap.getModulePath("sap.ca.ui");sap.ca.ui.model.format.AmountFormat.oCurrencyModel.loadData(p+"/model/currency.json","",false)}var d=sap.ca.ui.model.format.AmountFormat.oCurrencyModel.getData();for(var i=0;i<d.length;i++){if(d[i].Name===c){this.oFormatOptions.decimals=d[i].Decimals;break}}}};
sap.ca.ui.model.format.AmountFormat.prototype.format=function(v){var f=sap.ca.ui.model.format.NumberFormat.getInstance(this.oFormatOptions,this.oLocale);return f.format(v)};
sap.ca.ui.model.format.AmountFormat.prototype.parse=function(v){var f=sap.ca.ui.model.format.NumberFormat.getInstance(this.oFormatOptions,this.oLocale);return f.parse(v)};
sap.ca.ui.model.format.AmountFormat.FormatAmountShort=function(v,c,d){return sap.ca.ui.model.format.AmountFormat.getInstance(c,{style:"short",decimals:d}).format(v)};
sap.ca.ui.model.format.AmountFormat.FormatAmountStandard=function(v,c,d){return sap.ca.ui.model.format.AmountFormat.getInstance(c,{style:"standard",decimals:d}).format(v)};
sap.ca.ui.model.format.AmountFormat.prototype.formatWithCurrency=function(v,c){var r;var f=this.format(v);var a=sap.ui.core.LocaleData.getInstance(this.oLocale)._get("currencyFormat");if(!a){var s=new sap.ui.core.Locale("en");a=sap.ui.core.LocaleData.getInstance(s)._get("currencyFormat")}var b=a["standard"];if(b===undefined||b==""){r=f;jQuery.sap.log.error("no currency format available for the current locale")}else{var d=b.indexOf(";");var t="";var e=/[\.0,#]+/;if(d!=-1){var p=b.substring(0,d);t=p.replace(e,f)}else{t=b.replace(e,f)}r=t.replace(/\u00A4/,c)}return r};
sap.ca.ui.model.format.AmountFormat.FormatAmountShortWithCurrency=function(v,c,d){return sap.ca.ui.model.format.AmountFormat.getInstance(c,{style:"short",decimals:d}).formatWithCurrency(v,c)};
sap.ca.ui.model.format.AmountFormat.FormatAmountStandardWithCurrency=function(v,c,d){return sap.ca.ui.model.format.AmountFormat.getInstance(c,{style:"standard",decimals:d}).formatWithCurrency(v,c)};
