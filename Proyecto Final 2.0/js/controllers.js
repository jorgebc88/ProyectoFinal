var app = angular.module('app.controllers',['ngResource','ngCookies','mgcrea.ngStrap','ngAnimate','ngSanitize']);
app.config(function($scrollspyProvider) {
  angular.extend($scrollspyProvider.defaults, {
    animation: 'am-fade-and-slide-top',
    placement: 'top'
  });
});
app.controller('indexCtrl', function ($scope,$cookieStore,$location,userConService,$http){
  $scope.userCon = userConService.userCon();
  $scope.userConnected = {'name': "", 'level': "", 'connected':""};
  if($scope.userCon.connected == true){
    $scope.userConnected.name = $scope.userCon.user.userName;
    $scope.userConnected.level = 1;
    $scope.userConnected.connected = true;
  };

  $scope.logout = function(){
    $http.get('http://192.168.2.25:8080/FinalProject/user/logout');//http://localhost:8080
    $scope.userConnected = {'name': "", 'level': "", 'connected':""};
    $cookieStore.remove('connected');
    $cookieStore.remove('level');
    $cookieStore.remove('user');
    $location.path('/');
  };


});

app.controller('loginCtrl', function ($scope,$http,$q,$log,$cookieStore,$location,userRememberService,$modal){
  var session = $q.defer();
  session.promise.then(userSession);
  $scope.userRem = userRememberService.userRem();
  if($scope.userRem.check == true){
    $scope.userName = $scope.userRem.rememberName;
    $scope.password = $scope.userRem.rememberPass;
    $scope.checkboxModel = $scope.userRem.check;
  }

  $scope.loginControl = function(){
    if($scope.userName != null && $scope.password != null){
      $scope.login();

    }   else{
      $modal({title: 'ERROR!', content: 'Please complete the fields',  animation: 'am-fade-and-scale',
        placement: 'center'});
    }
  };
  $scope.login = function (){
    var userName = $scope.userName;
    var password = $scope.password; 
    var usr = $http.get('http://192.168.2.25:8080/FinalProject/user/login?userName='+userName+'&password='+password)//localhost:8080
    .success(function(data, status, headers, config) {
      session.resolve(data);
    })
    .error(function(data, status, headers, config) {
      $modal({title: 'ERROR '+ status, content: 'User or Password invalid',  animation: 'am-fade-and-scale',
        placement: 'center'});
    });
  };
    function userSession(usr){
    $scope.userConnected.name = usr.userName;
    $scope.userConnected.level = 1;
    $scope.userConnected.connected = true;
    $log.info($scope.userConnected);
    $cookieStore.put('connected', true);
    $cookieStore.put('user', usr);
    $cookieStore.put('level', 1);
    $location.path('/ejemplo1');
    $scope.addCookieSession(usr);
  }; 
    $scope.addCookieSession = function(data){
    var name = data.userName;
    var pass = data.password;
    var check = $scope.checkboxModel
    if($scope.checkboxModel){
     
      $cookieStore.put('rememberName', name);
      $cookieStore.put('rememberPass', pass);
      $cookieStore.put('check', check);  
    }
    else
    {
      $cookieStore.remove('rememberName');
      $cookieStore.remove('rememberPass');
      $cookieStore.remove('check', check); 
    }
  };
});
app.controller('ejemplo1Ctrl', function ($scope, userConService){
  $scope.userConnected = userConService.userCon();

});
app.service('userConService', function ($cookieStore){
  this.userCon = function(){
    return { 
            user : $cookieStore.get('user'),
            connected : $cookieStore.get('connected'),
            level : $cookieStore.get('level')
  };
}
});
app.service('userRememberService', function ($cookieStore){
  this.userRem = function(){
    return { 
            rememberName : $cookieStore.get('rememberName'),
            rememberPass : $cookieStore.get('rememberPass'),
            check : $cookieStore.get('check')
  };
}
});
app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });