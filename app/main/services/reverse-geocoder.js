angular.module('main')
.factory('ReverseGeocoder', function($http) {
  return function(lat, lng) {
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?' + 'latlng=' + lat + ',' + lng + '&' + 'sensor=false';
    return $http.get(url).then(function(response) {
      return response.data.results[0].formatted_address;
    });
  };
});

