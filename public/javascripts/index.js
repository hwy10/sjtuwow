if(!app) {
  var app = angular.module('sjtuwow',[])
}
app.controller('index',function($scope, loaderCount, httpLoad) {
  $scope.notice = "";
  $scope.resource = "";
  $scope.updateNotice = function(target){
    var title = $("a[data-target="+target+"]").text();
		window.location.href = "/index/editNotice/"+target+"/"+title;
  }
  $(document).ready(function(){
    $("a.notice").each(function(){
      var url = "/notice";
      var target = $(this).attr("data-target");
      $.get(url,{target:target},function(data,event){
        $scope[target]=data.content;
      })
    })
  })
})