'use strict';
var app = angular.module('ecomm', ['ngRoute'] );
//configuration de routeProvider
app .config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        // url page film
        when('/film', {
            templateUrl: 'src/Views/article.html',
            controller: 'detailController'
        }).
        // url page series

        // url par defaut
        otherwise({
            redirectTo: '/index.html'
        });
    }]);

