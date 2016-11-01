$( function () {
  "use strict";

  var $ = window.$ || ( function () { throw "jQuery not found"; } )(); 
  var elements = {};
  elements.cell = $( '.item' ).detach();
  elements.row = $( '.container' ).detach();

  var bindOnCellClick = function ( cell, date ) {
    var toid;

    cell.click( function () {
      var that = $( this );
      var selected = null;

      clearTimeout( toid );
      toid = setTimeout( function () {
        Services.Marking.create( date, selected );
      }, 500 );

      if ( that.find( '.fa-check-circle' ).length ) {
        that.find( '.fa' ).remove();
        that.append( createMinusIcon() );
        selected = 'minus';
      } else if ( that.find( '.fa-minus-circle' ).length ) {
        that.find( '.fa' ).remove();
        that.append( createTimesIcon() );
        selected = 'times';
      } else if ( that.find( '.fa-times-circle' ).length ) {
        that.find( '.fa' ).remove();
      } else {
        that.append( createCheckIcon() );
        selected = 'check';
      }
    } );
  };

  var createCheckIcon = function () {
    return $( '<div class="icon green fa fa-check-circle fa-4x"></div>' );
  };

  var createMinusIcon = function () {
    return $( '<div class="icon yellow fa fa-minus-circle fa-4x"></div>' );
  };

  var createTimesIcon = function () {
    return $( '<div class="icon red fa fa-times-circle fa-4x"></div>' );
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

  // Returns the first date to be drawn by the calendar
  var createVisualStartDate = function ( date ) {
    date = date || new Date();
    date.setDate( 1 );

    while ( date.getDay() !== 0 ) {
      date.setDate( date.getDate() - 1 );
    }

    return date;
  };

  // Draw the calendar
  var draw = function ( markings ) {
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
        bindOnCellClick( cell, new Date( date ) );
        
        if ( date.getMonth() !== month ) {
          cell.addClass( 'other-month-item' );
        }

        row.append( cell );
        date.setDate( date.getDate() + 1 );
      }
      $( 'body' ).append( row );
    }
  };

  var loadMarkings = function () {
   var d = $.Deferred();

   Services.Marking.forDateRange( createVisualStartDate(), createVisualEndDate() ).done( function ( data ) {
     d.resolve( data );
   } ); 
   
   return d.promise();
  };

  loadMarkings().done( function ( data ) {
    draw( data );
  } );
} );

