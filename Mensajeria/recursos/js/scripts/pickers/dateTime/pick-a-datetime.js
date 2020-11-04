/*=========================================================================================
    File Name: picker-date-time.js
    Description: Pick a date/time Picker, Date Range Picker JS
    ----------------------------------------------------------------------------------------
    Item Name: Robust - Responsive Admin Template
    Version: 2.1
    Author: Pixinvent
    Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/
(function(window, document, $) {
	'use strict';

	/*******	Pick-a-date Picker	*****/
	// Basic date
	$('.pickadate').pickadate();

	// Change Day & Month strings
	$('.pickadate-short-string').pickadate({
		weekdaysShort: ['D', 'L', 'M', 'Mi', 'J', 'V', 'S'],
		showMonthsShort: true
	});

	// Select Year
	$('.pickadate-select-year').pickadate({
		selectYears: 8
	});

	// Change first weekday
	$('.pickadate-firstday').pickadate({
		firstDay: 1
	});

	// Button options
	$('.pickadate-buttons').pickadate({
		today: '',
		close: 'Cerrar',
		clear: ''
	});

	// Date limits
	$('.pickadate-limits').pickadate({
		min: [2016,8,20],
		max: [2016,10,30]
	});

	// Format options
	$('.pickadate-format').pickadate({
		// Escape any 'rule' characters with an exclamation mark (!).
		format: 'Selecte!d Date : dddd, dd mmmm, yyyy',
		formatSubmit: 'mm/dd/yyyy',
		hiddenPrefix: 'prefix__',
		hiddenSuffix: '__suffix'
	});

	$( '.pickadate-arrow' ).pickadate({
		monthPrev: '&larr;',
		monthNext: '&rarr;',
		weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
		showMonthsFull: false
	});

	// Disable weekday range
	$('.pickadate-disable-weekday').pickadate({
		disable: [
			3
		]
	});

	// Disable dates
	$('.pickadate-disable-dates').pickadate({
		disable: [
			[2016,5,10],
			[2016,5,15],
			[2016,5,20]
		]
	});

	// Month & Year selectors
	$('.pickadate-selectors').pickadate({
		labelMonthNext: 'Mes siguiente',
		labelMonthPrev: 'Mes anterior',
		labelMonthSelect: 'Seleccione el Mes',
		labelYearSelect: 'Seleccione el Año',
		selectMonths: true,
		selectYears: true
	});

	// With Select
	$('.pickadate-dropdown').pickadate({
		selectMonths: true,
		selectYears: true
	});

	// Picker Translations
	$( '.pickadate-translations' ).pickadate({
		formatSubmit: 'dd/mm/yyyy',
		monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
		monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
		weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
		today: 'Hoy',
		clear: false,
		close: 'Cerrar',
		labelMonthNext: 'Mes siguiente',
		labelMonthPrev: 'Mes anterior',
		labelMonthSelect: 'Seleccione el Mes',
		labelYearSelect: 'Seleccione el Año',
		selectMonths: true,
		selectYears: true
	});

	$( '.pickadate-minmax' ).pickadate({
		dateMin: -8,
		dateMax: true
	});

})(window, document, jQuery);