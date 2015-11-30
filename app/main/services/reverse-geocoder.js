angular.module('main')
.factory('ReverseGeocoder', function($http) {
  return function(lat, lng) {
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?' + 'latlng=' + lat + ',' + lng + '&' + 'sensor=false';
    return $http.get(url).then(function(response) {
      var result = response.data.results[0];
      return result && result.formatted_address;
    });
  };
});

