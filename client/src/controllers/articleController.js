'use strict';
app.controller('articleController', function ($scope, $http, $cookieStore) {
    
    $http({
        method: 'GET',
        url: '/api/films'
    }).then(function successCallback(response) {
        $scope.articles = response;

        $scope.film = $scope.articles.data;
      
    }).then(function () {

    })

})


