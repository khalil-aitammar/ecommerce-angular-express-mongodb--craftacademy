app.controller('loginController', function ($scope, $http) {
    
    
    $scope.logout = function () {
        $http.get('/user/logout')
            .success(function (data, status) {
                if(status === 200 && data.status){
                    $scope.formup = true;
                    console.log('lougout');
                } else {
                    console.log('erreur lougout');
                }
            })
            // handle error
            .error(function (data) {
                console.log('erreur lougout');
            });
    }


    $scope.sub = function () {

        console.log("doné user", $scope.login, $scope.mp);

        var data = $.param({
            json: JSON.stringify({
                username: $scope.login,
                password: $scope.mp
            })
        });

        $http.post('/user/login',
            {username: $scope.login, password: $scope.mp})

            .success(function (data, status) {
                if (status === 200 && data.status) {
                    $scope.formup = false;
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

