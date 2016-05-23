'use strict';
app.controller('detailController', function ($scope, $http, $routeParams, $cookieStore, toastr) {


    // page panier , recuperer le film et id user
    var filmid = $routeParams.id;

    $http({
        method: 'GET',
        url: '/api/films/' + filmid
    }).then(function successCallback(response) {
        $scope.film = response;
        $scope.film = $scope.film.data;


    })
// ajouter dans le panier de l'utilisateur
    $scope.ajoutpanier = function () {
        if ($cookieStore.get('myCookies')) {
            var iduser = $cookieStore.get('myCookies').userid;

            var idfilm = {
                _id: filmid,
                qt: $scope.qt
            };
            $http({
                method: 'PUT',
                url: '/api/panier/' + iduser,
                data: idfilm,
            }).then(function successCallback(response) {
                console.log('modif panier dans detail', response);
                toastr.success(' ajouter du film'+ $scope.film.titre, 'success!');

            }, function errorCallback(response) {
                console.log('erre', response);
            });


        }else{
            toastr.error('vous ne pouvez accéder au panier sans authtification', 'Error');
        }
    }

});

