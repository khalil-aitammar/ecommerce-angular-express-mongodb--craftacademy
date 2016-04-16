'use strict';
app.controller('detailController', function ($scope, $http,$routeParams) {
    $scope.nom=$routeParams.nom;

    console.log('nom',$routeParams.nom);
  var a =$routeParams.nom;

    if (a){
        var b =a.split(":");
        console.log('hello',b);
        $scope.nomfilm=b[1];
        $scope.disc=b[2];
        $scope.prix=b[3];
        $scope.img=b[4];
    }


});

