/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.core.format.DateFormat");jQuery.sap.require("sap.ui.core.LocaleData");
sap.ui.core.format.DateFormat=function(){throw new Error()};
sap.ui.core.format.DateFormat.oDateInfo={oDefaultFormatOptions:{style:"medium"},aFallbackFormatOptions:[{style:"short"},{style:"medium"},{pattern:"yyyy-MM-dd"},{pattern:"yyyyMMdd"}],getPattern:function(l,s){return l.getDatePattern(s)},oRequiredParts:{"text":true,"year":true,"weekYear":true,"month":true,"day":true}};sap.ui.core.format.DateFormat.oDateTimeInfo={oDefaultFormatOptions:{style:"medium"},aFallbackFormatOptions:[{style:"short"},{style:"medium"},{pattern:"yyyy-MM-dd'T'hh:mm:ss"},{pattern:"yyyyMMdd hhmmss"}],getPattern:function(l,s){var d=l.getDateTimePattern(s),D=l.getDatePattern(s),t=l.getTimePattern(s);return d.replace("{1}",D).replace("{0}",t)},oRequiredParts:{"text":true,"year":true,"weekYear":true,"month":true,"day":true,"hour0_23":true,"hour1_24":true,"hour0_11":true,"hour1_12":true}};sap.ui.core.format.DateFormat.oTimeInfo={oDefaultFormatOptions:{style:"medium"},aFallbackFormatOptions:[{style:"short"},{style:"medium"},{pattern:"hh:mm:ss"},{pattern:"hhmmss"}],getPattern:function(l,s){return l.getTimePattern(s)},oRequiredParts:{"text":true,"hour0_23":true,"hour1_24":true,"hour0_11":true,"hour1_12":true}};
sap.ui.core.format.DateFormat.getInstance=function(f,l){return this.getDateInstance(f,l)};
sap.ui.core.format.DateFormat.getDateInstance=function(f,l){return this.createInstance(f,l,this.oDateInfo)};
sap.ui.core.format.DateFormat.getDateTimeInstance=function(f,l){return this.createInstance(f,l,this.oDateTimeInfo)};
sap.ui.core.format.DateFormat.getTimeInstance=function(f,l){return this.createInstance(f,l,this.oTimeInfo)};
sap.ui.core.format.DateFormat.createInstance=function(f,l,I){var F=jQuery.sap.newObject(this.prototype);if(f instanceof sap.ui.core.Locale){l=f;f=undefined}if(!l){l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()}F.oLocale=l;F.oLocaleData=sap.ui.core.LocaleData.getInstance(l);F.oFormatOptions=jQuery.extend(false,{},I.oDefaultFormatOptions,f);if(!F.oFormatOptions.pattern){F.oFormatOptions.pattern=I.getPattern(F.oLocaleData,F.oFormatOptions.style)}if(!I.aFallbackFormats){I.aFallbackFormats=[];jQuery.each(I.aFallbackFormatOptions,function(i,f){var o=sap.ui.core.format.DateFormat.createInstance(f,l,I);o.bIsFallback=true;I.aFallbackFormats.push(o)})}F.aFallbackFormats=I.aFallbackFormats;F.oRequiredParts=I.oRequiredParts;F.init();return F};
sap.ui.core.format.DateFormat.prototype.init=function(){this.aMonthsAbbrev=this.oLocaleData.getMonths("abbreviated");this.aMonthsWide=this.oLocaleData.getMonths("wide");this.aMonthsAbbrevSt=this.oLocaleData.getMonthsStandAlone("abbreviated");this.aMonthsWideSt=this.oLocaleData.getMonthsStandAlone("wide");this.aDaysAbbrev=this.oLocaleData.getDays("abbreviated");this.aDaysWide=this.oLocaleData.getDays("wide");this.aDaysAbbrevSt=this.oLocaleData.getDaysStandAlone("abbreviated");this.aDaysWideSt=this.oLocaleData.getDaysStandAlone("wide");this.aDayPeriods=this.oLocaleData.getDayPeriods("abbreviated");this.aFormatArray=this.parseJavaDateFormat(this.oFormatOptions.pattern)};
sap.ui.core.format.DateFormat.prototype.oStates={"G":"era","y":"year","Y":"weekYear","M":"month","L":"monthStandalone","w":"weekInYear","W":"weekInMonth","D":"dayInYear","d":"day","F":"dayOfWeekInMonth","E":"dayNameInWeek","c":"dayNameInWeekStandalone","u":"dayNumberOfWeek","a":"amPmMarker","H":"hour0_23","k":"hour1_24","K":"hour0_11","h":"hour1_12","m":"minute","s":"second","S":"millisecond","z":"timezoneGeneral","Z":"timezoneRFC822","X":"timezoneISO8601"};
sap.ui.core.format.DateFormat.prototype.format=function(d,u){var b=[],p,D=u?d.getUTCDay():d.getDay(),a=u?d.getUTCDate():d.getDate(),m=u?d.getUTCMonth():d.getMonth(),y=u?d.getUTCFullYear():d.getFullYear(),M=u?d.getUTCMilliseconds():d.getMilliseconds(),s=u?d.getUTCSeconds():d.getSeconds(),c=u?d.getUTCMinutes():d.getMinutes(),h=u?d.getUTCHours():d.getHours(),t=Math.abs(d.getTimezoneOffset()),P=d.getTimezoneOffset()>0,H=Math.floor(t/60),e=t%60,Y,w,f,r;for(var i=0;i<this.aFormatArray.length;i++){p=this.aFormatArray[i];switch(p.sType){case"text":b.push(p.sValue);break;case"day":b.push(jQuery.sap.padLeft(String(a),"0",p.iDigits));break;case"dayNameInWeek":if(p.iDigits<4){b.push(this.aDaysAbbrev[D])}else if(p.iDigits>=4){b.push(this.aDaysWide[D])}break;case"dayNameInWeekStandalone":if(p.iDigits<4){b.push(this.aDaysAbbrevSt[D])}else if(p.iDigits>=4){b.push(this.aDaysWideSt[D])}break;case"dayNumberOfWeek":b.push(D||7);break;case"month":if(p.iDigits==3){b.push(this.aMonthsAbbrev[m])}else if(p.iDigits>=4){b.push(this.aMonthsWide[m])}else{b.push(jQuery.sap.padLeft(String(m+1),"0",p.iDigits))}break;case"monthStandalone":if(p.iDigits==3){b.push(this.aMonthsAbbrevSt[m])}else if(p.iDigits>=4){b.push(this.aMonthsWideSt[m])}else{b.push(jQuery.sap.padLeft(String(m+1),"0",p.iDigits))}break;case"era":b.push("AD");break;case"year":case"weekYear":Y=""+y;if(p.iDigits==2&&Y.length>2){Y=Y.substr(Y.length-2)}b.push(jQuery.sap.padLeft(Y,"0",p.iDigits));break;case"weekInYear":w="";if(d.getWeek){w+=d.getWeek()}b.push(jQuery.sap.padLeft(w,"0",p.iDigits));break;case"hour0_23":b.push(jQuery.sap.padLeft(String(h),"0",p.iDigits));break;case"hour1_24":if(h==0){f="24"}else{f=String(h)}b.push(jQuery.sap.padLeft(f,"0",p.iDigits));break;case"hour0_11":if(h>11){f=String(h-12)}else{f=String(h)}b.push(jQuery.sap.padLeft(f,"0",p.iDigits));break;case"hour1_12":if(h>12){f=String(h-12)}else if(h==0){f="12"}else{f=String(h)}b.push(jQuery.sap.padLeft(f,"0",p.iDigits));break;case"minute":b.push(jQuery.sap.padLeft(String(c),"0",p.iDigits));break;case"second":b.push(jQuery.sap.padLeft(String(s),"0",p.iDigits));break;case"millisecond":b.push(jQuery.sap.padLeft(String(M),"0",p.iDigits));break;case"amPmMarker":var g=h<12?0:1;b.push(this.aDayPeriods[g]);break;case"timezoneGeneral":if(p.iDigits>3&&d.getTimezoneLong){b.push(d.getTimezoneLong());break}else if(d.getTimezoneShort){b.push(d.getTimezoneShort());break}b.push("GMT");case"timezoneISO8601":if(!u&&t!=0){b.push(P?"-":"+");b.push(jQuery.sap.padLeft(String(H),"0",2));b.push(":");b.push(jQuery.sap.padLeft(String(e),"0",2))}else{b.push("Z")}break;case"timezoneRFC822":if(!u&&t!=0){b.push(P?"-":"+");b.push(jQuery.sap.padLeft(String(H),"0",2));b.push(jQuery.sap.padLeft(String(e),"0",2))}break}}r=b.join("");if(sap.ui.getCore().getConfiguration().getOriginInfo()){r=new String(r);r.originInfo={source:"Common Locale Data Repository",locale:this.oLocale.toString(),style:this.oFormatOptions.style,pattern:this.oFormatOptions.pattern}}return r};
sap.ui.core.format.DateFormat.prototype.parse=function(v){var d,I=0,e=false,D=null,m=null,y=null,h=null,M=null,s=null,a=null,p=false,P,b,t=null,V=true,r=this.oRequiredParts;function c(C){return C>=48&&C<=57}function f(o){var L=0;while(L<o&&c(v.charCodeAt(I+L))){L++}return v.substr(I,L)}function g(L){var i;for(i=0;i<L.length;i++){if(v.indexOf(L[i],I)==I){return L[i]}}return null}function j(L){var i;for(i=0;i<L.length;i++){if(v.indexOf(L[i],I)==I){return i}}return null}function k(o){var q=v.charAt(I)=="+"?-1:1;I++;b=f(2);var u=parseInt(b,10);I=I+2;if(o){I++}b=f(2);I=I+2;t=parseInt(b,10);t=(t+60*u)*q}function l(o,q){if(o in r&&q){V=false}}v=jQuery.trim(v);for(var i=0;i<this.aFormatArray.length;i++){P=this.aFormatArray[i];switch(P.sType){case"text":if(v.indexOf(P.sValue,I)==I){I+=P.sValue.length}else{l(P.sType,this.aFormatArray[i+1].sType in r)}break;case"day":b=f(Math.max(P.iDigits,2));l(P.sType,b==="");I+=b.length;D=parseInt(b,10);break;case"dayNameInWeek":case"dayNameInWeekStandalone":b=g(this.aDaysWide);if(b){I+=b.length;break}b=g(this.aDaysWideSt);if(b){I+=b.length;break}b=g(this.aDaysAbbrev);if(b){I+=b.length;break}b=g(this.aDaysAbbrevSt);if(b){I+=b.length;break}break;case"dayNumberOfWeek":b=f(P.iDigits);I+=b.length;break;case"month":case"monthStandalone":if(P.iDigits<3){b=f(Math.max(P.iDigits,2));l(P.sType,b==="");m=parseInt(b,10)-1;I+=b.length}else{m=j(this.aMonthsWide);if(m!=null){I+=this.aMonthsWide[m].length;break}m=j(this.aMonthsWideSt);if(m!=null){I+=this.aMonthsWideSt[m].length;break}m=j(this.aMonthsAbbrev);if(m!=null){I+=this.aMonthsAbbrev[m].length;break}m=j(this.aMonthsAbbrevSt);if(m!=null){I+=this.aMonthsAbbrevSt[m].length;break}l(P.sType,true)}break;case"era":break;case"year":case"weekYear":if(P.iDigits==1){b=f(4);I+=b.length}else if(P.iDigits==2){b=f(2);if(b.length==2){y=parseInt(b,10);if(y<90){b="20"+b}else{b="19"+b}I+=2}else{I+=b.length}}else{b=f(P.iDigits);I+=b.length}l(P.sType,b==="");y=parseInt(b,10);break;case"weekInYear":break;case"hour0_23":b=f(Math.max(P.iDigits,2));l(P.sType,b==="");I+=b.length;h=parseInt(b,10);break;case"hour1_24":b=f(Math.max(P.iDigits,2));l(P.sType,b==="");I+=b.length;h=parseInt(b,10);if(h==24){h=0}break;case"hour0_11":b=f(Math.max(P.iDigits,2));l(P.sType,b==="");I+=b.length;h=parseInt(b,10);break;case"hour1_12":b=f(Math.max(P.iDigits,2));l(P.sType,b==="");I+=b.length;h=parseInt(b,10);if(h==12){h=0}break;case"minute":b=f(Math.max(P.iDigits,2));l(P.sType,b==="");I+=b.length;M=parseInt(b,10);break;case"second":b=f(Math.max(P.iDigits,2));l(P.sType,b==="");I+=b.length;s=parseInt(b,10);break;case"millisecond":b=f(Math.max(P.iDigits,3));b=jQuery.sap.padRight(b,"0",3);I+=b.length;a=parseInt(b,10);break;case"amPmMarker":var A=this.aDayPeriods[0],n=this.aDayPeriods[1];if(v.indexOf(A,I)==I){p=false;I+=2}else if(v.indexOf(n,I)==I){p=true;I+=2}break;case"timezoneGeneral":var T=v.substring(I,I+3);if(T==="GMT"||T==="UTC"){I=I+3}else if(v.substring(I,I+2)==="UT"){I=I+2}else if(v.charAt(I)=="Z"){I=I+1;t=0;break}else{jQuery.sap.log.error(v+" cannot be parsed correcly by sap.ui.core.format.DateFormat: The given timezone is not supported!");break}case"timezoneISO8601":if(v.charAt(I)=="Z"){I=I+1;t=0;break}k(true);break;case"timezoneRFC822":k(false);break}if(!V){break}}if(I<v.length){V=false}if(p){h+=12}if(V){if(t!=null){d=new Date(0);d.setUTCFullYear(y||1970);d.setUTCMonth(m||0);d.setUTCDate(D||1);d.setUTCHours(h||0);d.setUTCMinutes((M||0)+t);d.setUTCSeconds(s||0);d.setUTCMilliseconds(a||0)}else{d=new Date(1970,0,1,0,0,0);d.setFullYear(y||1970);d.setMonth(m||0);d.setDate(D||1);d.setHours(h||0);d.setMinutes(M||0);d.setSeconds(s||0);d.setMilliseconds(a||0)}return d}if(!this.bIsFallback){jQuery.each(this.aFallbackFormats,function(i,F){d=F.parse(v);if(d){return false}});return d}return null};
sap.ui.core.format.DateFormat.prototype.parseJavaDateFormat=function(f){var F=[],i,q=false,c=null,s="",n="";for(i=0;i<f.length;i++){var C=f.charAt(i),N,p,P;if(q){if(C=="'"){p=f.charAt(i-1);P=f.charAt(i-2);N=f.charAt(i+1);if(p=="'"&&P!="'"){q=false}else if(N=="'"){i+=1}else{q=false;continue}}if(s=="text"){c.sValue+=C}else{c={sType:"text",sValue:C};F.push(c);s="text"}}else{if(C=="'"){q=true}else if(this.oStates[C]){n=this.oStates[C];if(s==n){c.iDigits++}else{c={sType:n,iDigits:1};F.push(c);s=n}}else{if(s=="text"){c.sValue+=C}else{c={sType:"text",sValue:C};F.push(c);s="text"}}}}return F};
