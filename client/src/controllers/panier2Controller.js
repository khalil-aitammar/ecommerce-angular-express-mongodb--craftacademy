'use strict';
app.controller('panier2Controller', function ($scope, $http, $cookieStore, toastr) {


        if ($cookieStore.get('myCookies')) {
            var iduser = $cookieStore.get('myCookies').userid;
            var arr = [];


// get panier avec id user
            $http({
                method: 'GET',
                url: '/api/panier/' + iduser
            }).then(function successCallback(response) {

                var panier = response.data.articles;
                    $scope.panierfilm=panier;
                console.log('data panier', panier);
                }).then(function successCallback (response) {

                })



        }
        else {
            toastr.error('vous ne pouvez accéder au panier sans authtification', 'Error');
        }


    }
);

