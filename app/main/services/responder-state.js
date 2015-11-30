angular.module('main')
.service('responderState', function() {
  var service = {};
  service.setIsResponder = function(state) {
    service.isResponder = state;
  };
  service.getIsResponder = function() {
    return service.isResponder;
  };
  return service;
});
