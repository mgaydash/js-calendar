$( function () {
  "use strict";

  var $ = window.$ || ( function () { throw "jQuery not found"; } )(); 
  var elements = {};
  elements.cell = $( '.item' ).detach();
  elements.row = $( '.container' ).detach();

  // Draw the calendar
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
        cell.html( '<div>' + date.getDate() + '</div>' );
        cell.click( onCellClick );
        
        if ( date.getMonth() !== month ) {
          cell.addClass( 'other-month-item' );
        }

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

  // Event handler for when users click on cells in the calendar
  var onCellClick = function () {
    var that = $( this );

    if ( that.find( '.fa-check-circle' ).length ) {
      that.find( '.fa' ).remove();
      that.append( '<div class="yellow fa fa-minus-circle fa-4x"></div>' );
    } else if ( that.find( '.fa-minus-circle' ).length ) {
      that.find( '.fa' ).remove();
      that.append( '<div class="red fa fa-times-circle fa-4x"></div>' );
    } else if ( that.find( '.fa-times-circle' ).length ) {
      that.find( '.fa' ).remove();
    } else {
      that.append( '<div class="green fa fa-check-circle fa-4x"></div>' );
    }
  };

  draw();
} );
