var Services = window.Services || {};

Services.Marking = {};

Services.Marking.create = function ( date, type ) {
  var obj = {
    date: date,
    type: type
  };

  $.post( "api/marking/create", obj, function( result ) {
    console.log( result );
  } );
};
