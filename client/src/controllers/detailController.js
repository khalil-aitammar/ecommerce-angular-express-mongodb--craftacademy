'use strict';
app.controller('detailController', function ($scope, $http, $routeParams, $cookieStore) {
    var toutlesfilms = [];
  var filmid=$routeParams.id;
        $http({
            method: 'GET',
            url: '/api/films/'+filmid
        }).then(function successCallback(response) {
            $scope.film = response;
            $scope.film = $scope.film.data;



            $cookieStore.put("film", $scope.film);
            $cookieStore.put("toutlesfilms", toutlesfilms);
            console.log('cookis toutlesfilms',  $cookieStore.get("toutlesfilms"));
            console.log('cookis article',  $cookieStore.get("film"));
        })

 $scope.filmRES=$cookieStore.get("film");
    $scope.locationtemp1=$cookieStore.get("date1");
    $scope.locationtemp2=$cookieStore.get("date2");

});

