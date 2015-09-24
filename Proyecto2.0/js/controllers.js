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

app.controller('homeCtrl',['$scope', '$document', function ($scope, $document) {
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
$scope.obj = {
  'people':{total:'150', totalRight:'127', totalLeft:'23'},
  'motorcycles':{total:'200', totalRight:'95', totalLeft:'105'},
  'cars':{total:'125', totalRight:'100', totalLeft:'25'},
  'buses':{total:'40', totalRight:'1', totalLeft:'39'}
};
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

app.controller("statisticsCtrl",['$scope','$http','Oboe','$location', 'StreamHandler', function ($scope,$http,Oboe,$location,StreamHandler) {  

        if (typeof(EventSource) !== "undefined") {
            // Yes! Server-sent events support!
            var source = new EventSource('http://localhost:8080/FinalProject/detectedObject/serverSentEvents');

            source.onmessage = function (event) {
                $scope.openListingsReport = JSON.parse(event.data);
                $scope.$apply();
                console.log($scope.openListingsReport);
            };
        
    } else {
        // Sorry! No server-sent events support..
        alert('SSE not supported by browser.');
    }

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
$scope.people = [];
$scope.bike = [];
$scope.car = [];
$scope.bus = [];
$http.get('http://localhost:8080/FinalProject/detectedObject/requestDetectedObject')
.then(function(response) {
  $scope.objectDetected = response.data;
  angular.forEach($scope.objectDetected, function(value, key) {
    if(value.objectType == "Bus"){
    $scope.bus.push(value); 
  }
  else if(value.objectType == "Bike"){
    $scope.bike.push(value);
  }
  else if(value.objectType == "Car"){
    $scope.car.push(value);
  }
  else if(value.objectType == "People"){
    $scope.people.push(value);
  }
});
    var chart1 = {};
  chart1.type = "PieChart";
  chart1.cssStyle = "height:400px; width:auto;";
  chart1.data = [
  ['Object', 'Quantity'],
  ['People', $scope.people.length],
  ['Motorcylces', $scope.bike.length],
  ['Cars', $scope.car.length],
  ['Buses/Trucks', $scope.bus.length],
  ];
  chart1.options = {
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
      0: { color: '#00c0ef' },
      1: { color: '#DD4B39' },
      2: { color: '#00A65A' },
      3: { color: '#F39C12' }
    },
    "legend":"none",
    "chartArea":{"width":'90%',"height":'90%'}
  };
  chart1.formatters = {};
  $scope.chart = chart1;


  });
 
 

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

app.controller('adminCtrl',[ '$scope', function ($scope) {
  $scope.Users = {
    "Cols":['#id','Username','Password','Level'],
    'Users':[
    {name:'Admin1', password:'123456',level: 1},
    {name:'Admin2', password:'123456789',level: 1},
    {name:'User1', password:'4444',level: 2},
    {name:'User2', password:'3333',level: 2}]
  };
  $scope.isCollapsedAdd = true;
  $scope.removeRow = function(name){        
    var index = -1;   
    var comArr = eval( $scope.Users);
    for( var i = 0; i < comArr.Users.length; i++ ) {
      if( comArr.Users[i].name === name ) {
        index = i;
        break;
      }
    }
    if( index === -1 ) {
      alert( "Something gone wrong" );
    }
    $scope.Users.Users.splice( index, 1 );    
  };
  $scope.level='2';
  $scope.editRow = function () {
  };
  $scope.formAllGood = function () {
    if($scope.usernameGood && $scope.passwordGood && $scope.passwordCGood){
    $scope.Users.Users.push({ 'name':$scope.myform.username.$viewValue, 'password': $scope.myform.password.$viewValue, 'level':$scope.myform.level.$viewValue/*, 'level':$scope.level*/ });
    alert("New User Added.");
  }
  else{
    alert("Please complete all fields.");
    return;
  }
  $scope.username='';
  $scope.password='';
  $scope.password_c='';
  return ($scope.usernameGood && $scope.passwordGood && $scope.passwordCGood)
}
}]);