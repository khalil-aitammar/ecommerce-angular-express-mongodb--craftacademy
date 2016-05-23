'use strict';
app.controller('detailController', function ($scope, $http, $routeParams, $cookieStore, toastr) {

    var filmid = $routeParams.id;
    var iduser = $cookieStore.get('myCookies').userid;
    console.log('doné modif ',filmid,iduser);
    $http({
        method: 'GET',
        url: '/api/films/' + filmid
    }).then(function successCallback(response) {
        $scope.film = response;
        $scope.film = $scope.film.data;


    })

    $scope.ajoutpanier = function () {
        console.log('doné modif ',filmid,iduser);
            var idfilm={
                _id:filmid
            };
        $http({
            method: 'PUT',
            url: '/api/panier/' + iduser,
            data: idfilm
        }).then(function successCallback(response) {
            console.log('modif panier dans detail',response);


        }, function errorCallback(response) {
          console.log('erre',response);
        });

    }


});

