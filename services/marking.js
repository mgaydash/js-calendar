var MongoClient = require( 'mongodb' ).MongoClient;
var assert = require('assert');

var services = {};

services.retrieveForDateRange = function ( startDate, endDate ) {};

services.create = function ( date, type ) {
  var obj = {};
  
  obj.date = new Date( date );
  obj.type = type;

	MongoClient.connect( 'mongodb://localhost:27017/calendar', function( err, db ) {
    assert.equal( null, err );

    db.collection( 'marking' ).insertOne( obj, function( err, r ) {
      assert.equal( null, err );
      assert.equal( 1, r.insertedCount );

      db.close();
    } );
	} );
};

module.exports = services;

