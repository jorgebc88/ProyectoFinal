var app = angular.module('myApp', ['ngRoute','googlechart','ui.bootstrap','duScroll']);

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
    controller: 'homeCtrl',
    templateUrl: 'pages/admin.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});

app.controller('homeCtrl', function ($scope, $document) {
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

// Disable weekend selection
/*$scope.disabled = function(date, mode) {
return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
};
$scope.disabled2 = function(date, mode) {
return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
};*/

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
$scope.mstep = 15;

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
chart1.cssStyle = "height:400px; width:auto%;";
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
  "backgroundColor":"#F2F2F2",
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
  "legend":"none"
};

chart1.formatters = {};

$scope.chart = chart1;

});