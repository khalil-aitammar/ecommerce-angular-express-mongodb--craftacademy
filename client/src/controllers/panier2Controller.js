'use strict';
app.controller('panier2Controller', function ($scope, $http) {

    var iduser = "573c6d46f6dda3c81705ad99";
    var idarticle = "5727587aedb5900f8edc2cca";
    var filmrec = "";
// get panier avec id user
    $http({
        method: 'GET',
        url: '/api/panier/' + iduser
    }).then(function successCallback(response) {

// get film id
    }).then(function () {
        $http({
            method: 'GET',
            url: '/api/films/' + idarticle
        }).then(function successCallback(response) {

            var filmrec = response.data;

            modifpanier(filmrec);

            })


    }).then(function () {


    })


    function modifpanier(filmrec) {

        var parameter = JSON.stringify(filmrec);
        console.log('the',parameter);
        $http({
            method: 'PUT',
            url: '/api/panier/' + iduser,
            data:parameter
        }).then(function successCallback(response) {
            console.log('film ajouter panier', response);

        })











    }




});

