'use strict';
app.controller('panier2Controller', function ($scope, $http) {

    var iduser = "573c6d46f6dda3c81705ad99";

    $http({
        method: 'GET',
        url: '/api/panier/'+iduser
    }).then(function successCallback(response) {
    console.log('panier de user', response.data);
        var idpanier=response.data;

    }).then(function () {


    }).then(function () {


    })



});

