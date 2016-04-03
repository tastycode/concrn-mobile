angular.module('main')
.factory('ConcrnClient', function($http, localStorage, Config, UserService) {
  var service = {};
  var apiHost = Config.ENV.SERVER_URL;
  
  service.reportCrisis = function(options) {
  	 var user = UserService.getUser();
    var params = {
      report: {
        name: user.name,
        phone: user.phone,
        address: options.address,
        lat: options.lat,
        long: options.lng
      }
    };
    return $http.post(apiHost + '/reports.js', params).then(function(response) {
      return response.data;
    });
  };
  
  service.updateReport = function(id, options) {
    return $http.post(apiHost + '/reports/ ' + id + '/upload.js', options).then(function(response) {
      return response.data;
    });
  };
      
  return service;
});
