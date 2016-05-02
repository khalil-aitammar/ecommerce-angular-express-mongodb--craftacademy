'use strict';
app.controller('detailController', function ($scope, $http, $routeParams) {
    console.log($scope.nmb);
  var filmid=$routeParams.id;
        $http({
            method: 'GET',
            url: '/api/films/'+filmid
        }).then(function successCallback(response) {
            $scope.film = response;

            $scope.film = $scope.film.data;
          
        })
 
});

