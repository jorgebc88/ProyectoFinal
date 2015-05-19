var app = angular.module('myApp', ['ngRoute','ngResource','ngAnimate','googlechart','duScroll','ui.bootstrap', 'mgcrea.ngStrap']);
app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'homeCtrl',
    templateUrl: 'pages/home.html'
  })
  .when('/home', {
    controller: 'homeCtrl',
    templateUrl: 'pages/home.html'
  })
  .when('/statistics', {
    controller: 'statisticsCtrl',
    templateUrl: 'pages/statistics.html'
  })
  .when('/admin', {
    controller: 'adminCtrl',
    templateUrl: 'pages/admin.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});
app.config(function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'dd/MM/yyyy',
    startWeek: 1
  });
});
app.factory('ObjResource', function ($resource){
  var factory = {
    getUsers: $resource('http://192.168.2.26:8080/RestServices-1.0-SNAPSHOT/prueba',{},{
      all: {method:'POST'}
    }),
    save: $resource('', {}, {
      newUser:{method: 'POST', params:{name:'@name',password:'@password',type:'@type'}}
    })
  };
  return factory;
});
app.controller('indexCtrl', function ($scope) {
  $scope.radioModel = 'Home';
  $scope.showme= true;
});
app.controller('homeCtrl', function ($scope, $document) {
  var canvas = document.getElementById('videoCanvas');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#444';
  ctx.fillText('Loading...', canvas.width/2-30, canvas.height/3);
// Setup the WebSocket connection and start the player
var client = new WebSocket( 'ws://192.168.2.15:8084/' );
var player = new jsmpeg(client, {canvas:canvas});
$scope.toTheTop = function() {
  $document.scrollTopAnimated(0, 5000).then(function() {
    console && console.log('You just scrolled to the top!');
  });
}
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
}).value('duScrollOffset', 30);
app.controller("statisticsCtrl", function ($scope) {
  $scope.Today = new Date();
  $scope.maxDate= new Date();
  $scope.fromTime = new Date(0,0);
  $scope.toTime = new Date();
  $scope.selectedTimeAsNumber = 10 * 36e5;
  $scope.selectedTimeAsString = '10:00';
  $scope.sharedDate = new Date(new Date().setMinutes(0));
  $scope.isCollapsed = true;
  $scope.isCollapsed2 = false;
  $scope.radioModel = 'Left';
  $scope.showToday= true; 
  $scope.showHour=true;
  $scope.tab='all';
  /*console.log();*/
  $scope.obj = {
    'people':{total:'150', totalRight:'127', totalLeft:'23'},
    'motorcycles':{total:'200', totalRight:'95', totalLeft:'105'},
    'cars':{total:'125', totalRight:'100', totalLeft:'25'},
    'buses':{total:'40', totalRight:'1', totalLeft:'39'}
  };
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
  var chart1 = {};
  chart1.type = "PieChart";
  chart1.cssStyle = "height:400px; width:auto;";
  chart1.data = [
  ['Object', 'Quantity'],
  ['People', 150],
  ['Motorcylces', 200],
  ['Cars', 125],
  ['Buses/Trucks', 40],
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
  $scope.tabs = [
  {title:'Home', page: 'pages/template.html'},
  {title:'Profile', page: 'pages/template2.html'},
  {title:'About', page: 'pages/template3.html'}
  ];
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
});
app.controller('adminCtrl', function ($scope,ObjResource) {
  $scope.Users = {
    "Cols":['#id','Username','Password','Level'],
    'Users':[
    {name:'Admin1', password:'123456',level: 1},
    {name:'Admin2', password:'123456789',level: 1},
    {name:'User1', password:'4444',level: 2},
    {name:'User2', password:'3333',level: 2}]
  };
  $scope.sss = ObjResource.getUsers.all();
  console.log($scope.sss);
/*$scope.AllGood = function(){
ObjResource.save.newUser({name:'juan',password:'123456',type:'2'});

};*/
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
});
app.directive('validUsername', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
// Any way to read the results of a "required" angular validator here?
var isBlank = viewValue === ''
var invalidChars = !isBlank && !/^[A-z0-9]+$/.test(viewValue)
/*var invalidLen = !isBlank && !invalidChars && (viewValue.length < 5 || viewValue.length > 20)*/
ctrl.$setValidity('isBlank', !isBlank)
ctrl.$setValidity('invalidChars', !invalidChars)
/*ctrl.$setValidity('invalidLen', !invalidLen)*/
scope.usernameGood = !isBlank && !invalidChars /*&& !invalidLen*/
})
    }
  }
});
app.directive('validPassword', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        var isBlank = viewValue === ''
        var invalidLen = !isBlank && (viewValue.length < 8 || viewValue.length > 20)
        /*var isWeak = !isBlank && !invalidLen && !/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/.test(viewValue)*/
        ctrl.$setValidity('isBlank', !isBlank)
        /*ctrl.$setValidity('isWeak', !isWeak)*/
        ctrl.$setValidity('invalidLen', !invalidLen)
        scope.passwordGood = !isBlank /*&& !isWeak*/ && !invalidLen
      })
    }
  }
});
app.directive('validPasswordC', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue, $scope) {
        var isBlank = viewValue === ''
        var noMatch = viewValue != scope.myform.password.$viewValue
        ctrl.$setValidity('isBlank', !isBlank)
        ctrl.$setValidity('noMatch', !noMatch)
        scope.passwordCGood = !isBlank && !noMatch
      })
    }
  }
})
