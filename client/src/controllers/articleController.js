'use strict';
app.controller('articleController', function ($scope, $http, $cookieStore) {

    $http({
        method: 'GET',
        url: '/api/films'
    }).then(function successCallback(response) {
        $scope.articles = response;
        console.log('respense loula ', $scope.articles.data);
        $scope.film = $scope.articles.data;
        console.log('film', $scope.film);
    }).then(function () {

    })

})


