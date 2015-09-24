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
app.service('StreamHandler', function(){
 var source = new EventSource('http://localhost:8080/FinalProject/detectedObject/serverSentEvents');
  
    get = function(){
  
      source.onmessage = function(event) {
        console.log(event);

      }
      source.onerror = function(error) {
        source.close();
      }
    },

    kill = function(){
      source.close();

    }
  

  return { 
      get :get,
      kill :kill
    };
})

/*app.service('statsServices', ['$http', function ($http){
    var people = [];
    var bike= [];
    var car = [];
    var bus = [];
    var allObjects = function(){
        return $http.get('http://localhost:8080/FinalProject/detectedObject/requestDetectedObject');
    };
    var detectedObject = function(){
        return { 
            people : people,
            bike : bike,
            car : car,
            bus : bus
        };
    };
    return {
        allObjects : allObjects,
        detectedObject : detectedObject
}
]);*/