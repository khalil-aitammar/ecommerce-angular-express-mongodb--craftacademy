app.controller('loginController', function ($scope, $http) {
    $scope.login = "";
    $scope.mp = "";
    $scope.sub = function () {
        //  $location.path('/accueil');
        $http({
            method: 'GET',
            url: './js/data.json'
        }).then(function successCallback(response) {

            for (var i = 0; i < response.data.length; i++) {
                console.log($scope.login, $scope.mp);
                if (response.data[i].name == $scope.login && response.data[i].mp == $scope.mp) {

                    $scope.formup = true;

                }
            }

        }).then(function () {
            if ($scope.formup==false){
                alert("erreur");
            }
        })
    };






});

