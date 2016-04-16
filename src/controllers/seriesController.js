app.controller('seriesController', function ($scope, $http) {



    $http({
        method: 'GET',
        url: './js/series.json'
    }).then(function successCallback(response) {

        console.log('res',response.data);
        $scope.seriessss= response.data
        console.log('series',seriessss);

    }).then(function () {

    })

});

