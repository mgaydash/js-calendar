$( function () {
  "use strict";

  var $ = window.$ || ( function () { throw "jQuery not found"; } )(); 
  var elements = {};
  elements.cell = $('.item').detach();
  elements.row = $('.container').detach();

  var draw = function () {
    var date = createVisualStartDate();
    var month = new Date().getMonth();
    var i;
    var row;
    var cell;

    while ( date.getMonth() <= month ) {
      row = elements.row.clone();
      for ( i = 0; i < 7; i++ ) {
        cell = elements.cell.clone();
        cell.html( date.getDate() );
        row.append( cell );
        date.setDate( date.getDate() + 1 );
      }
      $( 'body' ).append( row );
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

  draw();
} );
