'use strict';
app.controller('detailController', function ($scope, $http, $routeParams, $cookieStore) {

  var filmid=$routeParams.id;
        $http({
            method: 'GET',
            url: '/api/films/'+filmid
        }).then(function successCallback(response) {
            $scope.film = response;

            $scope.film = $scope.film.data;
            console.log('film id',$scope.film);
            $cookieStore.put("film", $scope.film);
            console.log('cookis article',  $cookieStore.get("film"));
        })
 $scope.titrefilm=$cookieStore.get("film").titre;
});

