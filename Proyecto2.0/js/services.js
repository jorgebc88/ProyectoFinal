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

app.service('objectService', ['$http', function ($http){
  var detectedObject = function () {
    return $http.get('http://localhost:8080/FinalProject/detectedObject/requestDetectedObject');
  };

  var searchObjects = function(startDate, endDate) {
    return $http.get('http://localhost:8080/FinalProject/detectedObject/requestDetectedObjectByDatesBetweenAndCameraId?startDate=' + startDate + '&endDate=' + endDate + '&cameraId=' + 1);
  };

  return {
    detectedObject : detectedObject,
    searchObjects : searchObjects
  }

}]);