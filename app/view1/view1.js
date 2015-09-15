'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])


.controller('View1Ctrl', ['$scope','$http',function($scope, $http) {
  $scope.name = "jason";
  $scope.getWeather = function(callbackFunc){

    //when I put this on my site, try removing ?callback... and change to GET method
    var url = 'https://api.forecast.io/forecast/77db856faa39bdc74cce2ac5c7582a32/' + $scope.latitude +',' + $scope.longitude +'?callback=JSON_CALLBACK';
    $http({
      method: 'JSONP',
      url: url
    })
        .success(function(data){
          callbackFunc(data);
          //console.log('data',data);
        })
  };



   window.mapInit = function(){
    $scope.geocoder = new google.maps.Geocoder();
     $scope.getLocation("29334");

  };
  $scope.newLocation = function(address){
    $scope.getLocation(address);
  };
  $scope.getLocation = function(address){
    var index;
    $scope.geocoder.geocode({'address': address}, function(results, status){
      var address = results[0].address_components;
      for(var i = 0; i < address.length; i++){
        if(address[i].types[0] === "locality"){
          var city = address[i].long_name;

        }else if(address[i].types[0] === "administrative_area_level_1"){
          var state = address[i].short_name;

        }
      }
      console.log('results',results[0]);

      $scope.city = city + ", " + state;
      $scope.latitude = results[0].geometry.location.G;
      $scope.longitude = results[0].geometry.location.K;
      $scope.getWeather(function(data){
        console.log('hrer',data);
        $scope.weather = data;
      });

    });
  }

}]);