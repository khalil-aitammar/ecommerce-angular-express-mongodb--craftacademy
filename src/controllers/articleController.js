app.controller('articleController', function ($scope, $http) {


    
        $http({
            method: 'GET',
            url: './js/films.js'
        }).then(function successCallback(response) {
            $scope.articles =response;
console.log($scope.articles);
           $scope.film= $scope.articles.data;
        
        }).then(function () {
          
        })
    
    $http({
        method: 'GET',
        url: './js/series.js'
    }).then(function successCallback(response) {
        $scope.seris =response;
        console.log($scope.seris);
        $scope.series= $scope.seris.data;

    }).then(function () {

    })



});

