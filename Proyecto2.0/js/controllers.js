var app = angular.module('app.controllers',['ngRoute','ngResource','ngCookies','ngSanitize','ngAnimate', 'chart.js','duScroll','mgcrea.ngStrap']);

app.controller('indexCtrl',['$scope','$cookieStore','$location','userConService','$http', '$modal', '$aside', function ($scope,$cookieStore,$location,userConService,$http,$modal,$aside){  
  var myOtherAside = $aside({scope: $scope, show: false, template: 'pages/menu.html', animation: "am-fade-and-slide-left", placement: "left"});
// Show when some event occurs (use $promise property to ensure the template has been loaded)
$scope.showAside = function () {
  myOtherAside.$promise.then(myOtherAside.show());
};
$scope.closeAside = function () {
  myOtherAside.$promise.then(myOtherAside.hide());
};
$scope.LoggedUser = [
{text: ' <span class="glyphicon glyphicon-log-out"></span> Close session', click: 'showModal()'}
];
$scope.dropdown = [
{text: 'Pie chart stats', href: '#/statistics#statistics'},
{text: 'Bar stats', href: '#/stats#statistics'},
];
$scope.isActive = function (viewLocation) { 
  return viewLocation === $location.path();
};
$scope.userCon = userConService.userCon();
$scope.userConnected = {'name': "", 'level': "", 'connected':""};
if($scope.userCon.connected == true){
  $scope.userConnected.name = $scope.userCon.user.userName;
  $scope.userConnected.level = 1;
  $scope.userConnected.connected = true;
};
var myOtherModal = $modal({title : '¿Está seguro que desea cerrar sesión?',scope: $scope, template: 'pages/modal.html', show: false});
// Show when some event occurs (use $promise property to ensure the template has been loaded)
$scope.showModal = function() {
  myOtherAside.$promise.then(myOtherAside.hide());
  myOtherModal.$promise.then(myOtherModal.show);
};
$scope.logout = function(){
$http.get('http://localhost:8080/FinalProject/user/logout');//http://192.168.2.108:8080
$scope.userConnected = {'name': "", 'level': "", 'connected':""};
$cookieStore.remove('connected');
$cookieStore.remove('level');
$cookieStore.remove('user');
$location.path('/');
myOtherModal.$promise.then(myOtherModal.hide);
};
}]);

app.controller('loginCtrl',['$scope','$http','$q','$log','$cookieStore','$location','userRememberService','$modal', function ($scope,$http,$q,$log,$cookieStore,$location,userRememberService,$modal){ 
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
    var usr = $http.post('http://localhost:8080/FinalProject/user/login', {"userName": userName, "password": password})
    .then(function(response) {
      session.resolve(response.data);
    },function(response) {
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
    $location.path('/home');
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
}]);

app.controller('homeCtrl',['$scope', '$document', '$http', '$location', function ($scope, $document, $http, $location) {

  $scope.sse = $.SSE('http://localhost:8080/FinalProject/detectedObject/serverSentEvents', {
    onOpen: function(e){  
    },
    onEnd: function(e){ 
    },
    onError: function(e){ 
      console.log("Could not connect"); 
    },
    onMessage: function(e){ 
      $scope.objectDetected = angular.fromJson(e.data);
//$scope.person = $scope.objectDetected.detectedObject[0].person + $scope.objectDetected.detectedObject[1].person;
$scope.bike = $scope.objectDetected.detectedObject[0].bike + $scope.objectDetected.detectedObject[1].bike;
$scope.car = $scope.objectDetected.detectedObject[0].car + $scope.objectDetected.detectedObject[1].car;
$scope.bus = $scope.objectDetected.detectedObject[0].bus + $scope.objectDetected.detectedObject[1].bus;
//$scope.personDown = $scope.objectDetected.detectedObject[0].person;
$scope.bikeDown = $scope.objectDetected.detectedObject[0].bike;
$scope.carDown = $scope.objectDetected.detectedObject[0].car;
$scope.busDown = $scope.objectDetected.detectedObject[0].bus;
//$scope.personUp = $scope.objectDetected.detectedObject[1].person;
$scope.bikeUp = $scope.objectDetected.detectedObject[1].bike;
$scope.carUp = $scope.objectDetected.detectedObject[1].car;
$scope.busUp = $scope.objectDetected.detectedObject[1].bus;
if ($location.path() != "/home"){
  $scope.sse.stop();
}
$scope.$apply(function () {
});
}    
});
$scope.sse.start();
var canvas = document.getElementById('videoCanvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = '#444';
ctx.fillText('Loading...', canvas.width/2-30, canvas.height/3);
// Setup the WebSocket connection and start the player
var client = new WebSocket( 'ws://localhost:8084/' );
var player = new jsmpeg(client, {canvas:canvas});
$scope.parts = [
{name: "Presentation", link: "presentation"},
{name: "Video", link: "video"},
{name: "References", link: "info"}
];
$scope.myInterval = 5000;
var slides = $scope.slides = [];
$scope.addSlide = function() {
  var newWidth = 700 + slides.length + 1;
slides.push({/*
image: 'http://placekitten.com/' + newWidth + '/403',
text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]*/
image: 'img/1.jpg/',
text: 'Camera 1'
});
};
for (var i=0; i<1; i++) {
  $scope.addSlide();
}
}]).value('duScrollOffset', 30);

app.controller("statisticsCtrl",['$scope','$http','$location', function ($scope,$http,$location) { 
  $scope.colours = [
    { // red
        fillColor: "rgba(221,75,57,0.2)",
        strokeColor: "rgba(221,75,57,1)",
        pointColor: "rgba(221,75,57,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(221,75,57,0.8)"
    }, 
    { // green
        fillColor: "rgba(0,166,90,0.2)",
        strokeColor: "rgba(0,166,90,1)",
        pointColor: "rgba(0,166,90,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(0,166,90,0.8)"
    },
    { // yellow
        fillColor: "rgba(243,156,18,0.2)",
        strokeColor: "rgba(243,156,18,1)",
        pointColor: "rgba(243,156,18,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(243,156,18,0.8)"
    }];
  $scope.objectDetected = [];
  $scope.options = {
    responsive : true,
  };

  $scope.sse = $.SSE('http://192.168.2.120:8080/REST-API/detectedObject/serverSentEvents?cameraId=2', {
    onOpen: function(e){  
    },
    onEnd: function(e){ 
    },
    onError: function(e){ 
      console.log("Could not connect"); 
    },
    onMessage: function(e){ 
      $scope.objectDetected = angular.fromJson(e.data);
      $scope.bike = $scope.objectDetected.detectedObject[0].bike;
      $scope.car = $scope.objectDetected.detectedObject[0].car;
      $scope.bus = $scope.objectDetected.detectedObject[0].bus;
      if ($location.path() != "/statistics"){
        $scope.sse.stop();
      }
      $scope.$apply(function () {
        $scope.labels = ["Bikes", "Cars", "Buses/Trucks"];
        $scope.data = [$scope.bike, $scope.car, $scope.bus];
      });
    }    
  });
$scope.sse.start();
}]);

app.controller('statsCtrl',['$scope','$http','$location', 'objectService', '$filter', function ($scope,$http,$location,objectService,$filter) { 
  $scope.Today = new Date();
  $scope.maxDate= new Date();
  $scope.fromTime = new Date();
  $scope.fromTime.setHours(0);
  $scope.fromTime.setMinutes(0);

  $scope.toTime = new Date();
  $scope.selectedTimeAsNumber = 10 * 36e5;
  $scope.selectedTimeAsString = '10:00';
  $scope.sharedDate = new Date(new Date().setMinutes(0));
  $scope.radioModel = 'Left';
  $scope.showHour=true;
  $scope.legend="";
  $scope.tabs=0;

  $scope.today = function() {
    $scope.dt = new Date();
    $scope.dt2 = new Date();
  };
  $scope.today();
  $scope.clear = function () {
    $scope.dt = null;
    $scope.dt2 = null;
  };
  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.toggleMax = function() {
    $scope.maxDate  = new Date();
  };
  $scope.toggleMax();
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };
  $scope.open2 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened2 = true;
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.mytime = new Date();
  $scope.hstep = 1;
  $scope.mstep = 1;
  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };
  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };
  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };
  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };
  $scope.clear = function() {
    $scope.mytime = null;
  };

  $scope.showToday = true;
  $scope.showDay = false;
  $scope.showRange = false;

  $scope.search = function () {
    if ($scope.showToday) {
      $scope.startDay = new Date($scope.Today);
      $scope.endDay = new Date($scope.Today);
    } 
    else if ($scope.showDay) {
      $scope.startDay = new Date($scope.selectedDate);
      $scope.endDay = new Date($scope.selectedDate);
    }
    else if ($scope.showRange) {
      $scope.startDay = new Date($scope.fromDate);
      $scope.endDay = new Date($scope.untilDate);
    }

    $scope.startDay.setHours($scope.fromTime.getHours());
    $scope.startDay.setMinutes($scope.fromTime.getMinutes());
    $scope.endDay.setHours($scope.toTime.getHours());
    $scope.endDay.setMinutes($scope.toTime.getMinutes());

    objectService.searchObjects($scope.startDay, $scope.endDay).then(function (data) {
      $scope.draw($scope.tabs, data);
    }, function(){
      $scope.draw($scope.tabs, 0);
    });
  };
  
  objectService.detectedObject().then(function (data) {
    $scope.draw(0, data);
  });
  
  $scope.draw = function (tabs, data) {

    $scope.tabs = tabs;
    if ($scope.tabs == 0) {
      $scope.legend = "All";
      $scope.colorUp = { // grey
        fillColor: "rgba(51,3,0,0.2)",
        strokeColor: "rgba(51,3,0,1)",
        pointColor: "rgba(51,3,0,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(51,3,0,0.8)"
      };
      $scope.colorDown = { // grey
        fillColor: "rgba(34,2,0,0.2)",
        strokeColor: "rgba(34,2,0,1)",
        pointColor: "rgba(34,2,0,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(34,2,0,0.8)"
      };
      $scope.objectType ="All";
    } else if ($scope.tabs == 1) {
      $scope.legend = "Bikes";
      $scope.colorUp = {
        fillColor: "rgba(221,77,51,0.2)",
        strokeColor: "rgba(221,77,51,1)",
        pointColor: "rgba(221,77,51,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(221,77,51,0.8)"
      };
      $scope.colorDown = {
        fillColor: "rgba(177,67,54,0.2)",
        strokeColor: "rgba(177,67,54,1)",
        pointColor: "rgba(177,67,54,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(177,67,54,0.8)"
      };
      $scope.objectType="Bike"; 
    } else if ($scope.tabs == 2) {
      $scope.legend = "Cars";
      $scope.colorUp = {
        fillColor: "rgba(0,166,90,0.2)",
        strokeColor: "rgba(0,166,90,1)",
        pointColor: "rgba(0,166,90,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(0,166,90,0.8)"
      };
      $scope.colorDown = {
        fillColor: "rgba(4,95,53,0.2)",
        strokeColor: "rgba(4,95,53,1)",
        pointColor: "rgba(4,95,53,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(4,95,53,0.8)"
      };
      $scope.objectType="Car"; 
    } else if ($scope.tabs == 3) {
      $scope.legend = "Buses/Trucks";
      $scope.colorUp = {
        fillColor: "rgba(243,156,18,0.2)",
        strokeColor: "rgba(243,156,18,1)",
        pointColor: "rgba(243,156,18,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(243,156,18,0.8)"
      };
      $scope.colorDown = {
        fillColor: "rgba(198,127,15,0.2)",
        strokeColor: "rgba(198,127,15,1)",
        pointColor: "rgba(198,127,15,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(198,127,15,0.8)"
      };
      $scope.objectType="Bus"; 
    }

    $scope.sundayUp = [];
    $scope.mondayUp = [];
    $scope.tuesdayUp = [];
    $scope.wednesdayUp = [];
    $scope.thursdayUp = [];
    $scope.fridayUp =[];
    $scope.saturdayUp = [];
    $scope.sundayDown = [];
    $scope.mondayDown = [];
    $scope.tuesdayDown = [];
    $scope.wednesdayDown = [];
    $scope.thursdayDown = [];
    $scope.fridayDown =[];
    $scope.saturdayDown = [];
    $scope.data = [];

    if(angular.isDefined(data)){
      $scope.values = data.data;
    }
   
    angular.forEach($scope.values, function (value, key) {
      if (value.objectType == $scope.objectType || $scope.objectType == 'All') {
        var date = new Date(value.date);
        if(date.getDay() == 0) {
          if (value.direction == "North")
            $scope.sundayUp.push(value);
          else
            $scope.sundayDown.push(value);           
        }
        else if(date.getDay() == 1) {
          if (value.direction == "North")
            $scope.mondayUp.push(value);
          else
            $scope.mondayDown.push(value);           
        }
        else if(date.getDay() == 2) {
          if (value.direction == "North")
            $scope.tuesdayUp.push(value);
          else
            $scope.tuesdayDown.push(value);           
        }
        else if(date.getDay() == 3) {
          if (value.direction == "North")
            $scope.wednesdayUp.push(value);
          else
            $scope.wednesdayDown.push(value);           
        }
        else if(date.getDay() == 4) {
          if (value.direction == "North")
            $scope.thursdayUp.push(value);
          else
            $scope.thursdayDown.push(value);           
        }
        else if(date.getDay() == 5) {
          if (value.direction == "North")
            $scope.fridayUp.push(value);
          else
            $scope.fridayDown.push(value);           
        }
        else if(date.getDay() == 6) {
          if (value.direction == "North")
            $scope.saturdayUp.push(value);
          else
            $scope.saturdayDown.push(value);           
        }
      }
    });
    $scope.labels = ['Sunday', 'Monday', 'Thursday', 'Wednesday', 'Tuesday', 'Friday', 'Saturday'];
    $scope.series = [$scope.legend + '-Up', $scope.legend + '-Down'];
    $scope.data = [
      [$scope.sundayUp.length, $scope.mondayUp.length, $scope.tuesdayUp.length, $scope.wednesdayUp.length, $scope.thursdayUp.length, $scope.fridayUp.length, $scope.saturdayUp.length],
      [$scope.sundayDown.length, $scope.mondayDown.length, $scope.tuesdayDown.length, $scope.wednesdayDown.length, $scope.thursdayDown.length, $scope.fridayDown.length, $scope.saturdayDown.length]
    ];
    $scope.colours = [$scope.colorUp, $scope.colorDown];
  }
}]);

app.controller('adminCtrl',[ '$scope', 'adminService', '$modal', '$alert', function ($scope, adminService, $modal, $alert) {
  $scope.isCollapsedAdd = false;

  $scope.userList = function () {
    adminService.userList().then(function (data){
      $scope.Users = data.data;
    });
  };
  $scope.userList();

  $scope.removeUser = function(id){ 
    var myOtherModal = $modal({title : 'Are you sure you want delete selected user?',scope: $scope, template: 'pages/modalAdmin.html', show: false});
    myOtherModal.$promise.then(myOtherModal.show);

    $scope.delete = function() {
      myOtherModal.$promise.then(myOtherModal.hide);
      adminService.deleteUser(id).then(function (data){
        var index = -1;   
        var comArr = eval( $scope.Users);
        for( var i = 0; i < comArr.length; i++ ) {
          if(comArr[i].userId === id){
            index = i;
            console.log(index);
            break;
          }
        }
        if(index === -1){
          alert("Something gone wrong");
        } else {
          $scope.Users.splice(index, 1); 
          $alert({title: 'User deleted successfully!', placement: 'top', type: 'info', show: true, duration: 2});
        } 
      }, function (data){
        alert("An error ocurred in the database. Please try again.");
      });  
    };
  };

  $scope.level = 2;

  $scope.formUserAllGood = function () {
    if($scope.usernameGood && $scope.passwordGood && $scope.passwordCGood){
      adminService.addUser($scope.userForm.username.$viewValue,$scope.userForm.password.$viewValue, $scope.userForm.level.$viewValue).then(function (response){
        $alert({title: 'New user added successfully!', placement: 'top', type: 'info', show: true, duration: 2});
        $scope.userList();
      }, function (response) {
        alert("An error ocurred in the database. Please try again.");
      });
    }
    else{
      alert("Please complete all fields.");
      return;
    }
    $scope.username='';
    $scope.password='';
    $scope.password_c='';
    $scope.userForm.$setPristine();
    return ($scope.usernameGood && $scope.passwordGood && $scope.passwordCGood)
  };

  $scope.cameraList = function () {
    adminService.cameraList().then(function (data){
      $scope.Cameras = data.data;
    });
  };
  $scope.cameraList();

  $scope.removeCamera = function(id){ 
    var myModal = $modal({title : 'Are you sure you want delete selected camera?',scope: $scope, template: 'pages/modalAdmin.html', show: false});
    myModal.$promise.then(myModal.show);

    $scope.delete = function() {
      myModal.$promise.then(myModal.hide);
      adminService.deleteCamera(id).then(function (data){
        var index = -1;   
        var comArr = eval($scope.Cameras);
        for( var i = 0; i < comArr.length; i++ ) {
          if(comArr[i].id === id){
            index = i;
            break;
          }
        }
        if(index === -1){
          alert("Something gone wrong");
        } else {
          $scope.Cameras.splice(index, 1); 
          $alert({title: 'Camera deleted successfully!', placement: 'top', type: 'info', show: true, duration: 2});
        } 
      }, function (data){
        alert("An error ocurred in the database. Please try again.");
      });  
    }
  };

  $scope.formCameraAllGood = function () {
    if($scope.locationGood && $scope.latitudeGood && $scope.longitudeGood && $scope.ipGood){
      adminService.addCamera($scope.myform.location.$viewValue,$scope.myform.latitude.$viewValue, $scope.myform.longitude.$viewValue, $scope.myform.ip.$viewValue).then(function (response){
        $alert({title: 'New camera added successfully!', placement: 'top', type: 'info', show: true, duration: 2});
        $scope.cameraList();
      }, function (response) {
        alert("An error ocurred in the database. Please try again.");
      });
    }
    else{
      alert("Please complete all fields.");
      return;
    }

    $scope.location='';
    $scope.latitude='';
    $scope.longitude='';
    $scope.ip='';
    $scope.myform.$setPristine();
    return ($scope.locationGood && $scope.latitudeGood && $scope.longitudeGood && $scope.ipGood)
  };
}]);