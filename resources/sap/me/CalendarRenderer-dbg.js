/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.me.CalendarRenderer");

/**
 * @class Calendar renderer. 
 * @static
 */
sap.me.CalendarRenderer = {
};

sap.me.CalendarRenderer.render = function (oRm, oControl) {
	if(!oControl.getVisible())
		return;
		
    oRm.write("<div");
    oRm.writeControlData(oControl);
    oRm.addClass("sapMeCalendar");
    var sClass = "sapMeCalendar" + oControl.getDesign(); 
    oRm.addClass(sClass);
    oRm.writeClasses();
    var w = oControl.getWidth();
    if( w != undefined ){
        oRm.addStyle("width", w);
        oRm.writeStyles();
    }
    oRm.write(">");

    oRm.renderControl(oControl._oPrevBtn);
    oRm.renderControl(oControl._oNextBtn);

    var bSingleRow = oControl.getSingleRow();

	var sCurrentDate = oControl.getCurrentDate();
    var iMonths = bSingleRow ? 1 : oControl.getMonthsToDisplay();
    var oNow = new Date();
    var sNow = oNow.toDateString(); // so it is same time as other dates
    
    if(iMonths===1){
    	this._renderMonth(oRm, oControl, sCurrentDate, sNow);
    }
    else{
        var currentDate = new Date(sCurrentDate);
        var iMonthToGoBack = Math.floor(iMonths/2);        
        for(var i=0;i<iMonthToGoBack;i++){ // we go first back in time
        	currentDate.setDate(0); // last day of month
        	currentDate.setDate(1); // go to its first day
        }
        for(var i=0;i<iMonths;i++){
        	this._renderMonth(oRm, oControl, currentDate.toDateString(), sNow);
        	currentDate.setDate(32); // go to next month
        	currentDate.setDate(1); // go to its first day
        }
    }
    
    oRm.write("</div>"); // sapMeCalendar DIV
};


sap.me.CalendarRenderer._renderMonth = function(oRm, oControl, sMonthDate, sDateNow){
    var bSingleRow = oControl.getSingleRow();
    var iFirstDayOffset = oControl.getFirstDayOffset();
	var aWeekDays = oControl.getDays();
    var iWeekDays = aWeekDays.length;
    var iWeeksPerRow = oControl.getWeeksPerRow();
    var iDaysInRow = iWeeksPerRow * iWeekDays;
    var iDayWidth = (100 / iDaysInRow);
    var iDayHeight = oControl.getDayHeight();
    var iMonthWidth = (100 / (bSingleRow ? 1 : oControl.getMonthsPerRow()));

    var currentDate = new Date(sMonthDate);
    var iCurrentDate = currentDate.getDate();
    var iCurrentDay = currentDate.getDay();


    currentDate.setDate(1); // go to first day of month
    var iMonthFirstDay = currentDate.getDay();
    var iCurrentMonth = currentDate.getMonth();
    var dateForNbOfDaysInThisMonth = new Date(currentDate.getYear(), iCurrentMonth+1, 0);
    var nbOfDaysInThisMonth = dateForNbOfDaysInThisMonth.getDate();
    
    
	var iDaysToGoBack = bSingleRow ? iCurrentDay + 1 - iFirstDayOffset: iCurrentDate + iMonthFirstDay - iFirstDayOffset;	
	
	var nbOfRows = Math.ceil((nbOfDaysInThisMonth + iDaysToGoBack - iCurrentDate) / 7);
	var iTotalDays = bSingleRow ? iDaysInRow : (nbOfRows * 7);
	var aMonths = oControl.getMonths();

	var resBundle = sap.ui.getCore().getLibraryResourceBundle("sap.me");
    var sMonthTitle = resBundle.getText("CALENDAR_TITLE_MONTH_YEAR", [aMonths[currentDate.getMonth()], currentDate.getFullYear()]);
    
    currentDate.setDate(iCurrentDate - iDaysToGoBack + 1);
    if(bSingleRow){
    	var tempDate = new Date(currentDate.getTime());
    	tempDate.setDate(tempDate.getDate() + iTotalDays - 1);
    	var iFirstYear = currentDate.getFullYear();
    	var iLastYear = tempDate.getFullYear();
    	var iFirstMonth = currentDate.getMonth();
    	var iLastMonth = tempDate.getMonth();
    	var iFirstDate = currentDate.getDate();
    	var iLastDate = tempDate.getDate();
    	
    	if(iFirstYear != iLastYear){
    		sMonthTitle = resBundle.getText("CALENDAR_TITLE_WEEK_DISPLAY_ACROSS_2YEARS", [iFirstDate, aMonths[iFirstMonth], iFirstYear, iLastDate, aMonths[iLastMonth], iLastYear]);
    	}
    	else if(iFirstMonth != iLastMonth){
    		sMonthTitle = resBundle.getText("CALENDAR_TITLE_WEEK_DISPLAY_ACROSS_2MONTHS", [iFirstDate, aMonths[iFirstMonth], iLastDate, aMonths[iLastMonth], iLastYear]);
    	}
    	else {
    		sMonthTitle = resBundle.getText("CALENDAR_TITLE_WEEK_DISPLAY_SAME_MONTH", [iFirstDate, iLastDate, aMonths[iLastMonth], iLastYear]);
    	}
    }
    
    oRm.write('<div'); // month div
    oRm.addClass("sapMeCalendarMonth");
    if( !bSingleRow){
    	oRm.addClass("sapMeCalendarMonthNotSingle");
    }
    oRm.writeClasses();
    oRm.addStyle("width", iMonthWidth+"%");
    oRm.writeStyles();
    oRm.write(">");
    
    oRm.write('<div'); // monthname div
    oRm.addClass("sapMeCalendarMonthName");
    oRm.writeClasses();
    if(oControl.getHideMonthTitles()){
        oRm.addStyle("display", "none");
        oRm.writeStyles();
    }
    oRm.write(">");
    oRm.writeEscaped(sMonthTitle);
    oRm.write("</div>"); // monthname
    

    oRm.write('<div'); // MonthDayNames div
    oRm.addClass("sapMeCalendarMonthDayNames");
    oRm.writeClasses();
    oRm.write(">");    
    
    for (var i = 0; i < iDaysInRow; i++) {
    	var sContent = aWeekDays[(i+iFirstDayOffset)%iWeekDays];
        this._renderDay(oRm, oControl, null, sContent, iDayWidth);
    }

    oRm.write('</div>'); // MonthDayNames div

    oRm.write('<div'); // MonthDays div
    oRm.addClass("sapMeCalendarMonthDays");
    oRm.writeClasses();
    oRm.write(">");  
    
    for (var i = 0; i < iTotalDays; i++) { // max days of a month    	
    	var iMonth = currentDate.getMonth();
    	var iDayInWeek = currentDate.getDay();
    	var iCurrentDay = currentDate.getDate();
    	
    	var bNotThisMonth = iMonth !== iCurrentMonth;
    	var sId = currentDate.toDateString();
    	var bIsToday = sId == sDateNow;
        this._renderDay(oRm, oControl,sId, iCurrentDay+"", iDayWidth, iDayHeight, iDayInWeek, bNotThisMonth, bIsToday);
        
        currentDate.setDate(currentDate.getDate()+1);
    }
    
    oRm.write('</div>'); // MonthDays div
    
    oRm.write('</div>'); // month div
};

sap.me.CalendarRenderer._renderDay = function(oRm, oControl, sId, sContent, iDayWidth, iDayHeight, iDayInWeek, bNotThisMonth, bIsToday){
	oRm.write("<div");
    oRm.addClass("sapMeCalendarMonthDay");
    
    if(bIsToday){
    	oRm.addClass("sapMeCalendarDayNow");
    } 
    if(bNotThisMonth && !oControl.getSingleRow() ){
    	oRm.addClass("sapMeCalendarDayNotInCurrentMonth");
    }
    if(typeof iDayInWeek == "number"){
        oRm.addClass("sapMeCalendarWeekDay"+iDayInWeek);
    }
    oRm.writeClasses();
    oRm.addStyle("width", iDayWidth+"%");
    if(iDayHeight){
    	oRm.addStyle("height", iDayHeight+"px");
    }
    oRm.writeStyles();
    oRm.write(">");
    oRm.write('<span>');
    oRm.writeEscaped(sContent);
    oRm.write("</span>");
    oRm.write('<input type="hidden" value="' + sId + '">');
    oRm.write("</span>");
    oRm.write("</div>");
};