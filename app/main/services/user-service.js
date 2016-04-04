angular.module('main')
.factory('UserService', function($http, localStorage, Config) {
  var service = {};
  var apiHost = Config.ENV.SERVER_URL;
  var inMemoryOnDuty = null, inMemoryIsResponder = null;
  
  service.isUserResponder = function (user) {
  	 if(inMemoryIsResponder === null) {
  	 	inMemoryIsResponder = false;
  	   $http.get(apiHost + '/api/users/is_user_responder?phone=' + user.phone)
  	     .then(function(response) {
          inMemoryIsResponder = response.data.result_value;
        });
    }
    return inMemoryIsResponder;
  };
  
  service.isUserOnDuty = function(user) {
  	 if(inMemoryOnDuty === null) {
  	 	inMemoryOnDuty = false;
  	   $http.get(apiHost + '/api/users/has_responder_shift_started?phone=' + user.phone).then(function(response) {
        inMemoryOnDuty = response.data.result_value;
      });
    }
    return inMemoryOnDuty; 
  };

  service.startResponderShift = function(user) {
    return $http.get(apiHost + '/api/users/start_responder_shift?phone=' + user.phone).then(function(response) {
      return response.data;
    }); 
  };
  
  service.endResponderShift = function(user) {
    return $http.get(apiHost + '/api/users/end_responder_shift?phone=' + user.phone).then(function(response) {
      return response.data;
    }); 
  };

  service.getUser = function() {
    var user = {
      name: localStorage.get('name', ''),
      phone: localStorage.get('phone', ''),
      isResponder: false,
      isVerified: localStorage.get('locallyVerified', false) == "true",
      isOnDuty: false
    };
    if(user.phone != '') {
      user.isResponder = service.isUserResponder(user);
      if(user.isResponder) {
        user.isOnDuty = service.isUserOnDuty(user);
      }
    }
    return user;
  };
  
  service.updateUser = function(user) {
    localStorage.set('name', user.name);
    localStorage.set('phone', user.phone);
    localStorage.set('locallyVerified', user.isVerified);
    inMemoryOnDuty = user.isOnDuty;
    inMemoryIsResponder = user.isResponder;
  };
  
  service.textVerificationCode = function(user, callback) {
    return $http.post(apiHost + '/api/phone_numbers.js?phone=' + user.phone).then(function(response) {
      callback(response.data);
    });
  };
  
  service.submitVerificationCode = function(user, code, callback) {
    return $http.post(apiHost + '/api/phone_numbers.js?phone=' + user.phone).then(function(response) {
      callback(response.data);
    });
  };

  return service;
});