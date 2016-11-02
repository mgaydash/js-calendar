var mongoose = require( 'mongoose' );
var assert = require('assert');

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect( 'mongodb://localhost:27017/calendar' );

var Marking = mongoose.model( 'Marking', mongoose.Schema( {
  type: String,
  date: Date
} ) );

module.exports.retrieveForDateRange = function ( startDate, endDate ) {
  return new Promise( function ( resolve, reject ) {
    Marking.find( {
      date: {
        $gte: new Date( startDate ),
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
  date = new Date( date );
  date.setUTCMilliseconds( 0 );
  date.setUTCSeconds( 0 );
  date.setUTCMinutes( 0 );
  date.setUTCHours( 0 );

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

