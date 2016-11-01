var Services = window.Services || {};

Services.Marking = {};

Services.Marking.create = function ( date, type ) {
  var obj = {
    date: date,
    type: type
  };

  $.get( "api/marking/create", obj, function( result ) {
    console.log( result );
  } );
};
