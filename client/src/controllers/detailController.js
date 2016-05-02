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
        $scope.nobmart=b[1];
    }
    var c =$routeParams.panier;
    if (c){
        var d =c.split(":");
        console.log('ddd',d);

        $scope.articlech=d[2];
        $scope.nobmart=d[1];
    }

    console.log( 'cc',c);


});

