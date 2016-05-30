'use strict';
app.controller('articleController', function ($scope, $http, $cookieStore) {

    $scope.pageSize=21;
    $scope.currentPage=1;


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


