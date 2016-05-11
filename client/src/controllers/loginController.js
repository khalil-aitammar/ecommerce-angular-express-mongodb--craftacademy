
'use strict';
app.controller('loginController', function ($scope, $http,$window, $cookieStore) {

    
    $scope.logout = function () {
        $http.get('/user/logout')
            .success(function (data, status) {
                if(status === 200 && data.status){
                    $scope.formup = true;
                    $cookieStore.put('login', 0);
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

            .success(function (data, status,header) {
                if (status === 200 && data.status) {
                    $scope.formup = false;
                    $cookieStore.put('login', 1);
                    console.log('login succes');


                } else {
                    console.log('loula erreur login');
                    $cookieStore.put('login', 2);

                }
            })

            .error(function (data) {
                console.log(' 2 erreur login');
                $cookieStore.put('login', 2);
             
           
        });


    }
    $scope.register = function () {

        console.log("doné user", $scope.username, $scope.usermail,$scope.passuser);

        $http.post('/user/register',
            {username: $scope.username, password: $scope.passuser, usermail:$scope.usermail })

            .success(function (data, status) {
                if (status === 200 && data.status) {
                    $(".panel-body").hide();
                    $("#alert-success").show().delay(800);
                    
                    console.log('register succés');
                } else {
                    console.log(data,'erreur register');
                    $("#alert-danger").show().delay(800);
                }
            })
            // handle error
            .error(function (data) {
                console.log(data,'erreur register');
                $("#alert-danger").show().delay(800);
            });


    }

});

