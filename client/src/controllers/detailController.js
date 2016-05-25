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
        var trouver = false;
        if ($cookieStore.get('myCookies')) {
            var iduser = $cookieStore.get('myCookies').userid;
            // id film et quantité
            var idfilm = {
                _id: filmid,
                qt: $scope.qt,
                titre:$scope.film.titre,
                description:$scope.film.description,
                url_img:$scope.film.url_img,
                prix:$scope.film.prix,
            };

            $http({
                method: 'GET',
                url: '/api/panier/' + iduser
            }).then(function successCallback(response) {
                console.log('resulta get panier', response);
                var panier = response.data;
                console.log(panier);

                for (var i = 0; i < panier.articles.length; i++) {

                    if (panier.articles[i]._id == idfilm._id) {
                         trouver = true;
                        console.log('trouver', trouver);
                    }

                }
                
            }).then(function successCallback(response) {
             
                if (trouver == true) {
                    toastr.success(' modification du film' + $scope.film.titre, 'success!');
                  
                    $http({
                        method: 'PUT',
                        url: '/api/panier/' + iduser,
                        data: idfilm,
                    }).then(function successCallback(response) {
                        console.log('modif panier dans detail', response);
                        toastr.success(' modification du film' + $scope.film.titre, 'success!');

                    }, function errorCallback(response) {
                        console.log('erre', response);
                    });

                } else {
                    toastr.success(' ajouter de nouveau film' + $scope.film.titre, 'success!');
                    $http({
                        method: 'POST',
                        url: '/api/panier/' + iduser,
                        data: idfilm,
                    }).then(function successCallback(response) {
                        console.log('nouveau film ajouter', response);


                    }, function errorCallback(response) {
                        console.log('erre', response);
                    });

                }
            })


        } else {
            toastr.error('vous ne pouvez accéder au panier sans authtification', 'Error');
        }
    }

});

