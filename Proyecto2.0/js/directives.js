var app = angular.module('app.directives',[]);
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