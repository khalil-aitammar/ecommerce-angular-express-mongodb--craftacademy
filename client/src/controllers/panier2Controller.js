'use strict';
app.controller('panier2Controller', function ($scope, $http, $cookieStore, toastr) {


    if ($cookieStore.get('myCookies')) {
        var iduser = $cookieStore.get('myCookies').userid;
        var idarticle = "5727587aedb5900f8edc2cca";


// get panier avec id user
        $http({
            method: 'GET',
            url: '/api/panier/' + iduser
        }).then(function successCallback(response) {
            console.log('resulta get panier', response);
           
            // get film id
        }).then(function () {
            $http({
                method: 'GET',
                url: '/api/films/' + idarticle
            }).then(function successCallback(response) {

                var filmrec = response.data;

                modifpanier(filmrec);

                function modifpanier(filmrec) {

                    var parameter = JSON.stringify(filmrec);
                    console.log('the', parameter);
                    $http({
                        method: 'PUT',
                        url: '/api/panier/' + iduser,
                        data: parameter
                    }).then(function successCallback(response) {
                        console.log('film ajouter panier', response);

                    })

                }
            })


        })


    } else {
        toastr.error('vous ne pouvez accéder au panier sans authtification', 'Error');
    }


});

