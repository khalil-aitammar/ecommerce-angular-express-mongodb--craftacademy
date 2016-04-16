app.controller('seriesController', function ($scope, $http) {



    $http({
        method: 'GET',
        url: './js/series.json'
    }).then(function successCallback(response) {
        $scope.seriess =response;

        $scope.seriessss= $scope.seriess.data;

    }).then(function () {

    })

});

