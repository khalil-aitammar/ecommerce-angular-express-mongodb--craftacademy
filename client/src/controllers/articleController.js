app.controller('articleController', function ($scope, $http) {



        $http({
            method: 'GET',
            url: '/api/films'
        }).then(function successCallback(response) {
            $scope.articles =response;
console.log('controller article',$scope.articles);
           $scope.film= $scope.articles.data;
        
        }).then(function () {
          
        }),
    
    $http({
        method: 'GET',
        url: './js/series.js'
    }).then(function successCallback(response) {
        $scope.seris =response;

        $scope.series= $scope.seris.data;

    }).then(function () {

    }),

    $http({
        method: 'GET',
        url: './js/categories.json'
    }).then(function successCallback(response) {
        $scope.cath =response;

        $scope.cat= $scope.cath.data;
        console.log('categ', $scope.cat[1]);

    }).then(function () {

    })

});

