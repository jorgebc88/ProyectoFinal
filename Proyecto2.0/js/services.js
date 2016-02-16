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

app.service('adminService', ['$http', function ($http){
  var userList = function () {
    return $http.get('http://localhost:8080/FinalProject/user/list');
  };

  var deleteUser = function (id) {
    return $http.get('http://localhost:8080/FinalProject/user/delete/' + id);
  };

  var addUser = function (userName, password, level){
    return $http.post('http://localhost:8080/FinalProject/user/newUser', {"userName": userName, "password": password, "level": level});
  };

  var cameraList = function () {
    return $http.get('http://localhost:8080/FinalProject/camera/list');
  };

  var deleteCamera = function (id) {
    return $http.get('http://localhost:8080/FinalProject/camera/delete/' + id);
  };

  var addCamera = function (location, latitude, longitude, ip){
    return $http.post('http://localhost:8080/FinalProject/camera/newCamera', {"location": location, "latitude": latitude, "longitude": longitude, "ip": ip});
  };  

  return {
    userList : userList,
    deleteUser : deleteUser,
    addUser : addUser,
    cameraList : cameraList,
    deleteCamera : deleteCamera,
    addCamera: addCamera
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