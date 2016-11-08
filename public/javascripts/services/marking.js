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

Services.Marking.forDateRange = function ( startDate, endDate ) {
  var d = $.Deferred();
  var obj = {
    startDate: startDate,
    endDate: endDate
  };

  $.post( "api/marking", obj, function( result ) {
    d.resolve( result );
  } );

  return d.promise();
};

Services.Marking.monthStatistics = function ( date ) {
  var d = $.Deferred();

  $.post( "api/marking/statistics", { date: date }, function( result ) {
    d.resolve( result );
  } );

  return d.promise();
};

