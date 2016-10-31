$( function () {
  "use strict";

  var elements = {};
  elements.cell = $('.item').detach();
  elements.row = $('.container').detach();

  var createWeekRow = function () {
    var i;
    var row = elements.row.clone();

    for ( i = 0; i < 7; i++ ) {
      row.append( elements.cell.clone() );
    }

    return row;
  };

  var draw = function () {
    var date = createVisualStartDate();
    var month = new Date().getMonth();
    var i;

    while ( date.getMonth() <= month ) {
      $( 'body' ).append( createWeekRow() );
      date.setDate( date.getDate() + 7 );
    }
  };

  // Returns the first date to be drawn by the calendar
  var createVisualStartDate = function ( date ) {
    date = date || new Date();

    date.setDate( 1 );

    while ( date.getDay() !== 0 ) {
      date.setDate( date.getDate() - 1 );
    }

    return date;
  };

  // Returns first date that should NOT be drawn by the calendar
  // We can do a < comparison.
  var createVisualEndDate = function ( date ) {
    date = date || new Date();
    var month = date.getMonth();

    date.setDate( 28 );
    while ( date.getMonth() === month ) {
      date.setDate( date.getDate() + 1 );
    }
    while ( date.getDay() !== 0 ) {
      date.setDate( date.getDate() + 1 );
    }

    return date;
  };

  draw();
} );
