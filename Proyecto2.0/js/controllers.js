var app = angular.module('app.controllers',['ngRoute','ngResource','ngCookies','ngSanitize','ngAnimate','googlechart','duScroll','ngOboe', 'mgcrea.ngStrap']);

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

app.controller("statisticsCtrl",['$scope','$http','Oboe','$location', function ($scope,$http,Oboe,$location) { 
  $scope.flag = 0; 
  $scope.objectDetected = [];
  $scope.chart = {};
  $scope.chart.type = "PieChart";
  $scope.chart.cssStyle = "height:400px; width:auto;";
  $scope.chart.formatters = {};
  $scope.clickAll = function () {
    $scope.flag = 0;
    $scope.chart.data = [
    ['Object', 'Quantity'],
    ['Bikes', $scope.bike],
    ['Cars', $scope.car],
    ['Buses/Trucks', $scope.bus],
    ];
    $scope.chart.options = {
      "isStacked": "true",
      "fill": 20,
      "displayExactValues": true,
      "backgroundColor":"transparent",
      "vAxis": {
        "title": "Sales unit", "gridlines": {"count": 6}
      },
      "hAxis": {
        "title": "Date"
      },
      "pieHole": 0.4,
      "slices": {
        0: { color: '#DD4B39' },
        1: { color: '#00A65A' },
        2: { color: '#F39C12' },
      },
      "legend":"none",
      "chartArea":{"width":'90%',"height":'90%'}
    };
  };
  $scope.clickAll();
  $scope.clickBike = function () {
    $scope.flag = 2;
    $scope.chart.data = [
    ['Object', 'Quantity'],
    ['Bikes-Down', $scope.bikeDown],
    ['Bikes-Up', $scope.bikeUp],
    ];
    $scope.chart.options = {
      "isStacked": "true",
      "fill": 20,
      "displayExactValues": true,
      "backgroundColor":"transparent",
      "vAxis": {
        "title": "Sales unit", "gridlines": {"count": 6}
      },
      "hAxis": {
        "title": "Date"
      },
      "pieHole": 0.4,
      "slices": {
        0: { color: '#DD4B39' },
        1: { color: '#B14336' },
      },
      "legend":"none",
      "chartArea":{"width":'90%',"height":'90%'}
    };
  };
  $scope.clickCar = function () {
    $scope.flag = 3;
    $scope.chart.data = [
    ['Object', 'Quantity'],
    ['Cars-Down', $scope.carDown],
    ['Cars-Up', $scope.carUp],
    ];
    $scope.chart.options = {
      "isStacked": "true",
      "fill": 20,
      "displayExactValues": true,
      "backgroundColor":"transparent",
      "vAxis": {
        "title": "Sales unit", "gridlines": {"count": 6}
      },
      "hAxis": {
        "title": "Date"
      },
      "pieHole": 0.4,
      "slices": {
        0: { color: '#00A65A' },
        1: { color: '#045F35' },
      },
      "legend":"none",
      "chartArea":{"width":'90%',"height":'90%'}
    };
  };
  $scope.clickBus = function () {
    $scope.flag = 4;
    $scope.chart.data = [
    ['Object', 'Quantity'],
    ['Buses/Trucks-Down', $scope.busDown],
    ['Buses/Trucks-Up', $scope.busUp],
    ];
    $scope.chart.options = {
      "isStacked": "true",
      "fill": 20,
      "displayExactValues": true,
      "backgroundColor":"transparent",
      "vAxis": {
        "title": "Sales unit", "gridlines": {"count": 6}
      },
      "hAxis": {
        "title": "Date"
      },
      "pieHole": 0.4,
      "slices": {
        0: { color: '#F39C12' },
        1: { color: '#C67F0F' },
      },
      "legend":"none",
      "chartArea":{"width":'90%',"height":'90%'}
    };
  };
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
      $scope.bike = $scope.objectDetected.detectedObject[0].bike + $scope.objectDetected.detectedObject[1].bike;
      $scope.car = $scope.objectDetected.detectedObject[0].car + $scope.objectDetected.detectedObject[1].car;
      $scope.bus = $scope.objectDetected.detectedObject[0].bus + $scope.objectDetected.detectedObject[1].bus;
      $scope.bikeDown = $scope.objectDetected.detectedObject[0].bike;
      $scope.carDown = $scope.objectDetected.detectedObject[0].car;
      $scope.busDown = $scope.objectDetected.detectedObject[0].bus;
      $scope.bikeUp = $scope.objectDetected.detectedObject[1].bike;
      $scope.carUp = $scope.objectDetected.detectedObject[1].car;
      $scope.busUp = $scope.objectDetected.detectedObject[1].bus;
      if ($location.path() != "/statistics"){
        $scope.sse.stop();
      }
      $scope.$apply(function () {
        if($scope.flag == 0){
          $scope.chart.data = [
          ['Object', 'Quantity'],
          ['Bikes', $scope.bike],
          ['Cars', $scope.car],
          ['Buses/Trucks', $scope.bus],
          ];
        }
        else if($scope.flag == 2){
          $scope.chart.data = [
          ['Object', 'Quantity'],
          ['Bikes-Down', $scope.bikeDown],
          ['Bikes-Up', $scope.bikeUp],
          ];
        }
        else if($scope.flag == 3){
          $scope.chart.data = [
          ['Object', 'Quantity'],
          ['Cars-Down', $scope.carDown],
          ['Cars-Up', $scope.carUp],
          ];
        }
        else if($scope.flag == 4){
          $scope.chart.data = [
          ['Object', 'Quantity'],
          ['Buses/Trucks-Down', $scope.busDown],
          ['Buses/Trucks-Up', $scope.busUp],
          ];
        }        
      });
    }    
  });
$scope.sse.start();
$scope.tabs = [
{title:'Home', page: 'pages/template1.html',content: 'Raw denim you probably haven\'t heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica.'},
{title:'Profile', page: 'pages/template2.html',content: 'Food truck fixie locavore, accusamus mcsweeney\'s marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee.'},
{title:'About', page: 'pages/template3.html',content: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
];
$scope.tabs.activeTab = "Profile";
$scope.Today = new Date();
$scope.maxDate= new Date();
$scope.fromTime = new Date(0,0);
$scope.toTime = new Date();
$scope.selectedTimeAsNumber = 10 * 36e5;
$scope.selectedTimeAsString = '10:00';
$scope.sharedDate = new Date(new Date().setMinutes(0));
$scope.radioModel = 'Left';
$scope.showToday= true; 
$scope.showHour=true;
$scope.tab='all';
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
/*****people******/
$scope.chartObject = {
  "type": "ColumnChart",
  "displayed": true,
  "data": {
    "cols": [
    {"id": "month","label": "Month","type": "string","p": {}},
    {"id": "people-id","label": "People-Up","type": "number","p": {}},
    {"id": "people-id","label": "People-Down","type": "number","p": {}}
    ],
    "rows": [
    {"c": [
    {"v": "Jan"},
    {"v": 234,"f": "Up"},
    {"v": 234,"f": "Down"},
    null
    ]
  },
  {"c": [
  {"v": "Feb"},
  {"v": 3454,"f": "Up"},
  {"v": 456,"f": "Down"},
  null
  ]
},
{"c": [
{"v": "Mar"},
{"v": 5677,"f": "Up"},
{"v": 567,"f": "Down"},
null
]
},
{"c": [
{"v": "Apr"},
{"v": 678,"f": "Up"},
{"v": 789,"f": "Down"},
null
]
},
{"c": [
{"v": "May"},
{"v": 796,"f": "Up"},
{"v": 986,"f": "Down"},
null
]
},
{"c": [
{"v": "Jun"},
{"v": 3456,"f": "Up"},
{"v": 345,"f": "Down"},
null
]
},
{"c": [
{"v": "Jul"},
{"v": 234,"f": "Up"},
{"v": 234,"f": "Down"},
null
]
},
{"c": [
{"v": "Aug"},
{"v": 3454,"f": "Up"},
{"v": 456,"f": "Down"},
null
]
},
{"c": [
{"v": "Sep"},
{"v": 5677,"f": "Up"},
{"v": 567,"f": "Down"},
null
]
},
{"c": [
{"v": "Oct"},
{"v": 678,"f": "Up"},
{"v": 789,"f": "Down"},
null
]
},
{"c": [
{"v": "Nov"},
{"v": 796,"f": "Up"},
{"v": 986,"f": "Down"},
null
]
},
{"c": [
{"v": "Dec"},
{"v": 3456,"f": "Up"},
{"v": 345,"f": "Down"},
null
]
},
]
},
"options": {
  "isStacked": "true",
  "fill": 2,
  "displayExactValues": true,
  "vAxis": {
    "gridlines": {
      "count": 10
    }
  },
  "hAxis": {
  },
  "tooltip": {
    "isHtml": false
  },
  "allowHtml": true,
  "backgroundColor":"transparent",
  "legend":"none",
  "chartArea": {"width":'90%',"height":'80%'},
  "colors":['#333','#222']
}
}
$scope.chartObject2 = {
  "type": "ColumnChart",
  "displayed": true,
  "data": {
    "cols": [
    {"id": "month","label": "Month","type": "string","p": {}},
    {"id": "people-id","label": "People-Up","type": "number","p": {}},
    {"id": "people-id","label": "People-Down","type": "number","p": {}}
    ],
    "rows": [
    {"c": [
    {"v": "Jan"},
    {"v": 234,"f": "Up"},
    {"v": 234,"f": "Down"},
    null
    ]
  },
  {"c": [
  {"v": "Feb"},
  {"v": 3454,"f": "Up"},
  {"v": 456,"f": "Down"},
  null
  ]
},
{"c": [
{"v": "Mar"},
{"v": 5677,"f": "Up"},
{"v": 567,"f": "Down"},
null
]
},
{"c": [
{"v": "Apr"},
{"v": 678,"f": "Up"},
{"v": 789,"f": "Down"},
null
]
},
{"c": [
{"v": "May"},
{"v": 796,"f": "Up"},
{"v": 986,"f": "Down"},
null
]
},
{"c": [
{"v": "Jun"},
{"v": 3456,"f": "Up"},
{"v": 345,"f": "Down"},
null
]
},
]
},
"options": {
  "isStacked": "true",
  "fill": 2,
  "displayExactValues": true,
  "vAxis": {
    "gridlines": {
      "count": 10
    }
  },
  "hAxis": {
  },
  "tooltip": {
    "isHtml": false
  },
  "allowHtml": true,
  "backgroundColor":"transparent",
  "legend":"none",
  "chartArea": {"left":40,"width":'90%',"height":'80%'},
  "colors":['#333','#222']
}
}
$scope.chartObject3 = {
  "type": "ColumnChart",
  "displayed": true,
  "data": {
    "cols": [
    {"id": "month","label": "Month","type": "string","p": {}},
    {"id": "people-id","label": "People-Up","type": "number","p": {}},
    {"id": "people-id","label": "People-Down","type": "number","p": {}}
    ],
    "rows": [
    {"c": [
    {"v": "Jul"},
    {"v": 234,"f": "Up"},
    {"v": 234,"f": "Down"},
    null
    ]
  },
  {"c": [
  {"v": "Aug"},
  {"v": 3454,"f": "Up"},
  {"v": 456,"f": "Down"},
  null
  ]
},
{"c": [
{"v": "Sep"},
{"v": 5677,"f": "Up"},
{"v": 567,"f": "Down"},
null
]
},
{"c": [
{"v": "Oct"},
{"v": 678,"f": "Up"},
{"v": 789,"f": "Down"},
null
]
},
{"c": [
{"v": "Nov"},
{"v": 796,"f": "Up"},
{"v": 986,"f": "Down"},
null
]
},
{"c": [
{"v": "Dec"},
{"v": 3456,"f": "Up"},
{"v": 345,"f": "Down"},
null
]
},
]
},
"options": {
  "isStacked": "true",
  "fill": 2,
  "displayExactValues": true,
  "vAxis": {
    "gridlines": {
      "count": 10
    }
  },
  "hAxis": {
  },
  "tooltip": {
    "isHtml": false
  },
  "allowHtml": true,
  "backgroundColor":"transparent",
  "legend":"none",
  "chartArea": {"left":40,"width":'90%',"height":'80%'},
  "colors":['#333','#222']
}
}
}]);

app.controller('statsCtrl',[ '$scope', function ($scope) { 
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
      alert("Un error ocurrió en la Base de Datos. Por favor vuelva a intentarlo.");
    });  
    };
  };

  $scope.level = 2;

  $scope.formUserAllGood = function () {
    if($scope.usernameGood && $scope.passwordGood && $scope.passwordCGood){
      adminService.addUser($scope.myform.username.$viewValue,$scope.myform.password.$viewValue, $scope.myform.level.$viewValue).then(function (response){
        $alert({title: 'New user added successfully!', placement: 'top', type: 'info', show: true, duration: 2});
        $scope.userList();
      }, function (response) {
        alert("Un error ocurrió en la Base de Datos. Por favor vuelva a intentarlo.");
      });
    }
    else{
      alert("Please complete all fields.");
      return;
    }
    $scope.username='';
    $scope.password='';
    $scope.password_c='';
    return ($scope.usernameGood && $scope.passwordGood && $scope.passwordCGood)
  };

  $scope.cameraList = function () {
    adminService.cameraList().then(function (data){
      console.log(data);
      $scope.Cameras = data.data;
      console.log($scope.Cameras);
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
    alert("Un error ocurrió en la Base de Datos. Por favor vuelva a intentarlo.");
  });  
  };

  $scope.formCameraAllGood = function () {
    if($scope.locationGood && $scope.latitudeGood && $scope.longitudeGood && $scope.ipGood){
      adminService.addCamera($scope.myform.location.$viewValue,$scope.myform.latitude.$viewValue, $scope.myform.longitude.$viewValue, $scope.myform.ip.$viewValue).then(function (response){
        $alert({title: 'New camera added successfully!', placement: 'top', type: 'info', show: true, duration: 2});
        $scope.userList();
      }, function (response) {
        alert("Un error ocurrió en la Base de Datos. Por favor vuelva a intentarlo.");
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
    return ($scope.usernameGood && $scope.passwordGood && $scope.passwordCGood && $scope.ipGood)
  };
  };
}]);