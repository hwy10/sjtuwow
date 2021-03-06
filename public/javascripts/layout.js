var app = angular.module('sjtuwow',[])
app.value('loaderCount',0)
app.factory('httpLoad',['$http', 'loaderCount', function($http, loaderCount) {
  return function(req,succ,err) {
    loaderCount+=1;
    $http(req).success(succ).error(err);
    loaderCount-=1;
    }
  }]);
app.controller("layout",function($scope, loaderCount, httpLoad) {
  $scope.activePage = function() {
    var path = window.location.pathname;
    var arr = path.split("/");
    return arr.length > 2 ? arr[1] : "index";
    }
  $scope.user = null;
  $scope.loaderCount = loaderCount;
  httpLoad({url:"/users"}, function(response) {
      $scope.user = response;
    }, function() {});
  })