var app = angular.module('myApp', ['app.controllers', 'ngRoute','ngResource','ngCookies','mgcrea.ngStrap','ngAnimate']);
app.run(function($rootScope, $location,$cookieStore){
  $rootScope.$on('$routeChangeStart',function(event, next, current){
    if($cookieStore.get('connected') == false || $cookieStore.get('connected') == null ){
      if(next.templateUrl == 'pages/ejemplo1.html' || next.templateUrl == 'pages/ejemplo2.html' ){
        $location.path('/');
      }
    }
    else
    {
      var level = $cookieStore.get('level');
      if(next.templateUrl == 'pages/login.html' || level != 1){
        $location.path('/ejemplo1');
      }
    }
  })
});
app.config(['$routeProvider',function($routeProvider) {
  $routeProvider
  .when('/', 
  {
    templateUrl: 'pages/login.html',
    controller: 'loginCtrl'
  })
  .when('/ejemplo1', {
    templateUrl: 'pages/ejemplo1.html',
    controller: 'ejemplo1Ctrl'
  })
  .when('/ejemplo2', {
    templateUrl: 'pages/ejemplo2.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);