var express = require('express');
var router = express.Router();

var markingService = require( '../services/marking' );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send( 'hello world' );
});

router.post('/marking', function(req, res, next) {
  markingService.retrieveForDateRange( req.body.startDate, req.body.endDate ).then( function ( data ) {
    res.send( data );
  } );
});

router.post('/marking/create', function(req, res, next) {
  markingService.create( req.body.date, req.body.type ); 
  res.send( 'saved: ' + req.body );
});

router.post('/marking/statistics', function(req, res, next) {
  markingService.monthStatistics( req.body.date ).then( function ( data ) {
    res.send( data );
  } );
});

module.exports = router;
