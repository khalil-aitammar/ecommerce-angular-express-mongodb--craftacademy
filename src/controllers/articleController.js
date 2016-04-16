app.controller('articleController', function ($scope, $http) {


    
        $http({
            method: 'GET',
            url: './js/films.js'
        }).then(function successCallback(response) {
            $scope.articles =response;

           $scope.film= $scope.articles.data;
        
        }).then(function () {
          
        })
    
    $http({
        method: 'GET',
        url: './js/series.js'
    }).then(function successCallback(response) {
        $scope.seris =response;

        $scope.series= $scope.seris.data;

    }).then(function () {

    })



});

