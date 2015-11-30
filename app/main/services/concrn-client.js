angular.module('main')
.factory('ConcrnClient', function($http, localStorage) {
  var service = {};
  service.reportCrisis = function(options) {
    var params = {
      report: {
        name: localStorage.get('name'),
        phone: localStorage.get('phone'),
        address: options.address,
        lat: options.lat,
        long: options.lng
      }
    };
    return $http.post('http://localhost:3555/reports.js', params).then(function(response) {
      return response.data;
    });
  };
  service.updateReport = function(id, options) {
    return $http.post('http://localhost:3555/reports/ ' + id + '/upload.js', options).then(function(response) {
      return response.data;
    });
  };
  return service;
});
