app.controller('articleController', function ($scope, $http) {


    $http({
        method: 'GET',
        url: '/api/films'
    }).then(function successCallback(response) {
        $scope.articles = response;
        console.log('controller article', $scope.articles);
        $scope.film = $scope.articles.data;

    }).then(function () {

    })


});

