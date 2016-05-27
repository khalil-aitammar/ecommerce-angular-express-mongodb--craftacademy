'use strict';
app.controller('loginController', function ($scope, $http, $window, $cookieStore, toastr) {


    $scope.logout = function () {
        $http.get('/user/logout')
            .success(function (data, status) {
                if (status === 200 && data.status) {
                    $scope.formup = true;
                    $cookieStore.remove('myCookies');
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

            .success(function (data, status, header) {
                if (status === 200) {
                    $scope.formup = false;
                    $cookieStore.put('myCookies', data);
                    console.log('cookies',data);
                    toastr.success('Authentification réussie bienvenue ' + data.username, 'success!');

                } else {
                    console.log('loula erreur login');
                    toastr.error('login ou mot de passe incorrects', 'Error');
                }
            })

            .error(function (data) {
                console.log(' 2 erreur login');
                toastr.error('login ou mot de passe incorrects', 'Error');
            });


    }
    $scope.register = function () {

        $http.post('/user/register', {username: $scope.username, password: $scope.passuser, usermail: $scope.usermail})
            .success(function (data, status) {
                console.log('register succés', data, status);
                var iduserdata = data;

                $http.post('/api/panier', {iduser: iduserdata})
                    .success(function (data, status) {
                        console.log('panier', data);
                    })
                    .error(function (data, status) {
                        console.log(' ajout panier erreur ', data, status);
                    });

            })
            .error(function (data, status) {
                console.log('register erreur', data, status);

            })

    }

});
