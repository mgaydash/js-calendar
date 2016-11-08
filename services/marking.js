var mongoose = require( 'mongoose' );
var assert = require('assert');

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect( 'mongodb://localhost:27017/calendar' );

var Marking = mongoose.model( 'Marking', mongoose.Schema( {
  type: String,
  date: Date
} ) );

var clearDateTime = function ( date ) {
  date = new Date( date );
  date.setUTCMilliseconds( 0 );
  date.setUTCSeconds( 0 );
  date.setUTCMinutes( 0 );
  date.setUTCHours( 0 );

  return date;
};

module.exports.monthStatistics = function ( date ) {
  var startDate = clearDateTime( date );
  var endDate = clearDateTime( date );

  // TODO
  // I don't know why I can't get this date logic to work.
  startDate.setDate( 0 );
  endDate.setDate( 28 );
  while( endDate.getMonth() === startDate.getMonth() ) {
    endDate.setDate( endDate.getDate() + 1 );
  }

  return new Promise( function ( resolve, reject ) {
    Marking.find( {
      date: {
        $gte: startDate,
        $lt: endDate
      }
    }, function ( err, markings ) {
      var i;
      var result = {};
      result.checkCount = 0;
      result.minusCount = 0;
      result.timesCount = 0;

      if ( err ) {
        console.log( err );
        reject( err );
      }

      for ( i = 0; i < markings.length; i++ ) {
        switch( markings[ i ].type ) {
          case 'times':
            result.timesCount++;
            break;
          case 'minus':
            result.minusCount++;
            break;
          case 'check':
            result.checkCount++;
            break;
          default:
            break;
        }
      }

      resolve( result );
    } );
  } );
};

module.exports.retrieveForDateRange = function ( startDate, endDate ) {
  startDate = new Date( startDate );

  // This is a little hack. We want to make sure we get all events for the first
  // day on the calendar
  startDate.setDate( startDate.getDate() - 1 );
  return new Promise( function ( resolve, reject ) {
    Marking.find( {
      date: {
        $gte: startDate,
        $lt: new Date( endDate )
      }
    }, function( err, markings ) {
      if ( err ) {
        console.log( 'Error retrieving markings for start date: ' + startDate + ' and end date ' + endDate );
        reject( err );
      }

      resolve( markings );
    } );
  } );
};

module.exports.create = function ( date, type ) {
  date = clearDateTime( date );

  Marking.remove( { date: date }, function ( err ) {
    if ( err ) {
      console.log( 'Error removing marking for date: ' + date );
    }
  } );

  new Marking( {
    date: date,
    type: type
  } ).save( function ( err ) {
    if ( err ) {
      console.log( 'Error saving marking for date: ' + date );
    }
  } );
};

