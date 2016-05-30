'use strict';
app.controller('adminController', function ($scope, $http, $window, $cookieStore, toastr, $location) {
    // jquery pour video la page

    $(".bloctop").hide();
    $(".owl-carousel").hide();
    $scope.back = function () {
        $(".bloctop").show();
        $(".owl-carousel").show();
        $location.url('/');
    }
//*********************** gestion users ***********************//
// récupération de tous les users

    $http({
        method: 'GET',
        url: '/user'
    }).then(function successCallback(response) {
        $scope.user = response.data;
        console.log('res user', $scope.user);


    })

// remove user

    $scope.removeUser = function (x, $index) {
        $http({
            method: 'GET',
            url: '/user/' + x._id
        }).then(function successCallback(response) {
            $scope.user = response.data;
            console.log('res user', $scope.user);
            for (var i = 0; i < $scope.user.length; i++) {
                if ($scope.user [i].length == 0)
                    $scope.user.splice($index, 1);
            }


        })
    }

    //******************** gestion films ********************************//
// récupération de tous les film

        $http({
            method: 'GET',
            url: '/api/films'
        }).then(function successCallback(response) {
            $scope.articles = response;
            console.log('respense loula ', $scope.articles.data);
            $scope.film = $scope.articles.data;
            console.log('film', $scope.film);
        })
    });

    $scope.ajouterarticle = function () {
        
        $http.post('/api/panier', {iduser: iduserdata})
            .success(function (data, status) {
                console.log('panier', data);
                toastr.success('utilisateur crée  ' + $scope.username, 'success!');
            })
            .error(function (data, status) {
                console.log(' ajout panier erreur ', data, status);
            });
        
    }
