'use strict';
app.controller('detailController', function ($scope, $http,$routeParams) {
    $scope.nom=$routeParams.nom;
    $scope.disc=$routeParams.disc;
    $scope.prix=$routeParams.prix;
});

