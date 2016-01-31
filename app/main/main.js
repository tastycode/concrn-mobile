angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'leaflet-directive',
  'ionic-material',
  'ngMaterial'
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {
  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/map');
  $stateProvider
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
    })
      .state('main.map', {
        url: '/map',
        views: {
          pageContent: {
            templateUrl: 'main/templates/map.html',
            controller: 'MapCtrl as map'
          }
        }
      })
      .state('main.detail', {
        url: '/detail?id',
        views: {
          pageContent: {
            templateUrl: 'main/templates/detail.html',
            controller: 'DetailCtrl as detail'
          }
        }

      })
      .state('main.login', {
        url: '/login',
        views: {
          pageContent: {
            templateUrl: 'main/templates/login.html',
            controller: 'LoginCtrl as long'
          }
        }
      })
      .state('main.list', {
        url: '/list',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list-detail.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.debug', {
        url: '/debug',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/debug.html',
            controller: 'DebugCtrl as ctrl'
          }
        }
      });
})
.factory('cfpLoadingBar', function($rootScope) {
  var cfpLoadingBar = {
    complete: function() {
      $rootScope.loadMode = null;
    },
    start: function() {
      $rootScope.loadMode = 'indeterminate';
    },
    set: function(value) {
      //only used for determinate, but we only seem to get 0 for value
      $rootScope.loadProgress = value * 100;
    }
  };
  return cfpLoadingBar;
})
.config(function($httpProvider) {

  // all from https://raw.githubusercontent.com/chieffancypants/angular-loading-bar/master/src/loading-bar.js

  var interceptor = ['$q', '$cacheFactory', '$timeout', '$rootScope', '$log', 'cfpLoadingBar', function ($q, $cacheFactory, $timeout, $rootScope, $log, cfpLoadingBar) {

    /**
     * The total number of requests made
     */
    var reqsTotal = 0;

    /**
     * The number of requests completed (either successfully or not)
     */
    var reqsCompleted = 0;

    /**
     * The amount of time spent fetching before showing the loading bar
     */
    var latencyThreshold = 200;

    /**
     * $timeout handle for latencyThreshold
     */
    var startTimeout;


    /**
     * calls cfpLoadingBar.complete() which removes the
     * loading bar from the DOM.
     */
    function setComplete() {
      $timeout.cancel(startTimeout);
      cfpLoadingBar.complete();
      reqsCompleted = 0;
      reqsTotal = 0;
    }

    /**
     * Determine if the response has already been cached
     * @param  {Object}  config the config option from the request
     * @return {Boolean} retrns true if cached, otherwise false
     */
    function isCached(config) {
      var cache;
      var defaultCache = $cacheFactory.get('$http');
      var defaults = $httpProvider.defaults;

      // Choose the proper cache source. Borrowed from angular: $http service
      if ((config.cache || defaults.cache) && config.cache !== false &&
        (config.method === 'GET' || config.method === 'JSONP')) {
        cache = angular.isObject(config.cache) ? config.cache : angular.isObject(defaults.cache) ? defaults.cache : defaultCache;
      }

      var cached = cache !== undefined ?
        cache.get(config.url) !== undefined : false;

      if (config.cached !== undefined && cached !== config.cached) {
        return config.cached;
      }
      config.cached = cached;
      return cached;
    }


    return {
      'request': function(config) {
        // Check to make sure this request hasn't already been cached and that
        // the requester didn't explicitly ask us to ignore this request:
        if (!config.ignoreLoadingBar && !isCached(config)) {
          $rootScope.$broadcast('cfpLoadingBar:loading', {url: config.url});
          if (reqsTotal === 0) {
            startTimeout = $timeout(function() {
              cfpLoadingBar.start();
            }, latencyThreshold);
          }
          reqsTotal++;
          cfpLoadingBar.set(reqsCompleted / reqsTotal);
        }
        return config;
      },

      'response': function(response) {
        if (!response || !response.config) {
          $log.error('Broken interceptor detected: Config object not supplied in response:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
          return response;
        }

        if (!response.config.ignoreLoadingBar && !isCached(response.config)) {
          reqsCompleted++;
          $rootScope.$broadcast('cfpLoadingBar:loaded', {url: response.config.url, result: response});
          if (reqsCompleted >= reqsTotal) {
            setComplete();
          } else {
            cfpLoadingBar.set(reqsCompleted / reqsTotal);
          }
        }
        return response;
      },

      'responseError': function(rejection) {
        if (!rejection || !rejection.config) {
          $log.error('Broken interceptor detected: Config object not supplied in rejection:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
          return $q.reject(rejection);
        }

        if (!rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
          reqsCompleted++;
          $rootScope.$broadcast('cfpLoadingBar:loaded', {url: rejection.config.url, result: rejection});
          if (reqsCompleted >= reqsTotal) {
            setComplete();
          } else {
            cfpLoadingBar.set(reqsCompleted / reqsTotal);
          }
        }
        return $q.reject(rejection);
      }
    };
  }];

  $httpProvider.interceptors.push(interceptor);

})
.run(function($cordovaStatusbar, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    $cordovaStatusbar.style(2);  //black translucent http://ngcordova.com/docs/plugins/statusbar/
  });
});
