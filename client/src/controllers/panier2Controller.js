'use strict';
app.controller('panier2Controller', function ($scope, $http, $cookieStore, toastr) {


        if ($cookieStore.get('myCookies')) {
            var iduser = $cookieStore.get('myCookies').userid;


// get panier avec id user
            $http({
                method: 'GET',
                url: '/api/panier/' + iduser
            }).then(function successCallback(response) {
                console.log(response);
                var panier = response.data.articles;
                $scope.panierfilm = panier;
                $scope.total=0;
                for (var i = 0; i < panier.length; i++) {
                    console.log(panier[i]);
                     $scope.total = $scope.total+ (panier[i].prix*panier[i].qt);
                }

            }).then(function successCallback(response) {
          
            })
// remove article du panier
            $scope.removeArticle = function (id, $index) {

                $http({
                    method: 'POST',
                    url: '/api/panier/' + iduser + '/' + id
                }).then(function successCallback(response) {

                    $scope.panierfilm.splice($index, 1);

                }).then(function successCallback(response) {

                })


            }


        }
        else {
            toastr.error('vous ne pouvez accéder au panier sans authtification', 'Error');
        }


    }
);

