var express = require('express');
var router = express.Router();

var markingService = require( '../services/marking' );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send( 'hello world' );
});

router.post('/marking/create', function(req, res, next) {
  markingService.create( req.body.date, req.body.type ); 
  console.log( req.body );
  res.send( 'saved: ' + req.body );
});

module.exports = router;
