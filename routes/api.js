var express = require('express');
var router = express.Router();

var markingService = require( '../services/marking' );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send( 'hello world' );
});

router.get('/marking/create', function(req, res, next) {
  //markingService.create( 
  res.send( 'created' );
});

module.exports = router;
