'use strict';
var app = angular.module('ecomm', ['ngRoute'] );
//configuration de routeProvider
app .config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        // url page film
        when('/detail:nom?', {
            templateUrl: 'src/Views/article.html',
            controller: 'detailController'
        }).
        when('/panier:panier?', {
            templateUrl: 'src/Views/panier.html',
            controller: 'detailController'
        }).
        // url page series
        when('/film', {
            templateUrl: 'src/Views/films.html',
            controller: 'detailController'
        }).
        // url par defaut
        otherwise({
            redirectTo: '/film'
        });
    }]);

