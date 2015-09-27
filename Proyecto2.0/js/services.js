var app = angular.module('app.services',[]);

app.service('userConService',['$cookieStore', function ($cookieStore){
  this.userCon = function(){
    return { 
      user : $cookieStore.get('user'),
      connected : $cookieStore.get('connected'),
      level : $cookieStore.get('level')
    };
  }
}]);

app.service('userRememberService', ['$cookieStore', function ($cookieStore){
  this.userRem = function(){
    return { 
      rememberName : $cookieStore.get('rememberName'),
      rememberPass : $cookieStore.get('rememberPass'),
      check : $cookieStore.get('check')
    };
  }
}]);