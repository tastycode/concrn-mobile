angular.module('main')
.factory('ConcrnClient', function($http, localStorage, Config) {
  var service = {};
  var apiHost = Config.ENV.SERVER_URL;
  
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
    return $http.post(apiHost + '/reports.js', params).then(function(response) {
      return response.data;
    });
  };
  
  service.updateReport = function(id, options) {
    return $http.post(apiHost + '/reports/ ' + id + '/upload.js', options).then(function(response) {
      return response.data;
    });
  };
  
  service.isUserResponder = function (phone) {
  	 return $http.get(apiHost + '/api/users/is_user_responder?phone=' + phone).then(function(response) {
      return response.data.result_value;
    });
  }
  
  service.isUserOnDuty = function(phone) {
    return $http.get(apiHost + '/api/users/is_responder_shift_started?phone=' + phone).then(function(response) {
      return response.data.result_value;
    });
  }

  service.startResponderShift = function(phone) {
    return $http.get(apiHost + '/api/users/start_responder_shift?phone=' + phone).then(function(response) {
      return response.data;
    }); 
  }
  
  service.endResponderShift = function(phone) {
    return $http.get(apiHost + '/api/users/end_responder_shift?phone=' + phone).then(function(response) {
      return response.data;
    }); 
  }

  service.getUser = function() {
    var user = {
      name: localStorage.get('name', ''),
      phone: localStorage.get('phone', ''),
      isResponder: false,
      isOnDuty: false
    };
    if(user.phone != '') {
      user.isResponder = service.isUserResponder(user.phone);
      user.isOnDuty = service.isUserOnDuty(user.phone);
    }
    return user;
  }
    
  return service;
});
