app.controller('loginController', function ($scope, $http, $routeParams) {

    $scope.sub = function () {

        console.log($scope.login, $scope.mp);
            var data ={
                username: $scope.login,
                password: $scope.mp
            };

            var config = {
                headers: {
                    'Content-Type': 'application/json;'
                }
            }

            $http.post('/user/login', data, config)
                .success(function (data, status, headers, config) {
                    console.log("login good");
                    $scope.PostDataResponse = data;

                })
                .error(function (data, status, header, config) {
                    console.log("login good");
                    $scope.ResponseDetails = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                });



    };

});

