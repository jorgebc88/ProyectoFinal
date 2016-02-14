var app = angular.module('myApp', ['app.controllers','app.services','app.directives','ngRoute','ngResource','ngCookies']);
app.run(['$rootScope', '$location','$cookieStore',function($rootScope, $location,$cookieStore){
  $rootScope.$on('$routeChangeStart',function(event, next, current){
    if($cookieStore.get('connected') == false || $cookieStore.get('connected') == null ){
      if(next.templateUrl == 'pages/home.html' || next.templateUrl == 'pages/stats.html' || next.templateUrl == 'pages/admin.html'){
        $location.path('/');
      }
    }
    else
    {
      var level = $cookieStore.get('level');
      if(next.templateUrl == 'pages/login.html' || (next.templateUrl == 'pages/admin.html' && level != 1) ){
        $location.path('/home');
      }
    }
  })
}]);
app.config(function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'dd/MM/yyyy',
    startWeek: 1
  });
});
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/login.html',
    controller: 'loginCtrl'
  })
  .when('/home', {
    controller: 'homeCtrl',
    templateUrl: 'pages/home.html'
  })
  .when('/statistics', {
    controller: 'statisticsCtrl',
    templateUrl: 'pages/statistics.html'
  })
  .when('/stats', {
    controller: 'statsCtrl',
    templateUrl: 'pages/stats.html'
  })
  .when('/admin', {
    controller: 'adminCtrl',
    templateUrl: 'pages/admin.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

