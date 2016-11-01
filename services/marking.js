var MongoClient = require( 'mongodb' ).MongoClient;
var assert = require('assert');

var services = {};

services.retrieveForDateRange = function ( startDate, endDate ) {
  return new Promise( function ( resolve, reject ) {
    var obj = {
      date: {
        $gte: new Date( startDate ),
        $lt: new Date( endDate )
      }
    };
    
    MongoClient.connect( 'mongodb://localhost:27017/calendar', function( err, db ) {
      assert.equal( null, err );

      db.collection( 'marking' ).find( obj ).toArray( function( err, markings ) {
        assert.equal( null, err );
        resolve( markings );

        db.close();
      } );
    } );
  } );
};

services.create = function ( date, type ) {
  var obj = {};

  date = new Date( date );
  date.setUTCMilliseconds( 0 );
  date.setUTCSeconds( 0 );
  date.setUTCMinutes( 0 );
  date.setUTCHours( 0 );
  
  obj.date = date;
  obj.type = type;

	MongoClient.connect( 'mongodb://localhost:27017/calendar', function( err, db ) {
    assert.equal( null, err );

    db.collection( 'marking' ).deleteMany( { date: date }, function ( err, r ) {} );

    db.collection( 'marking' ).insertOne( obj, function( err, r ) {
      assert.equal( null, err );
      assert.equal( 1, r.insertedCount );

      db.close();
    } );
	} );
};

module.exports = services;

