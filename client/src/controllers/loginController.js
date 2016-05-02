app.controller('loginController', function ($scope, $http, $routeParams) {

    $scope.sub = function () {

        console.log($scope.login, $scope.mp);

        var data = $.param({
            json: JSON.stringify({
                username: $scope.login,
                password: $scope.mp
            })
        });

        $http.post('/user/login',
            {username: $scope.login, password: $scope.mp})
            // handle success
            .success(function (data, status) {
                if(status === 200 && data.status){
                    $scope.formup = true;
                    console.log('cest bon  login');
                } else {
                    console.log('erreur login');
                }
            })
            // handle error
            .error(function (data) {
               console.log('erreur login');
            });



    }

});

