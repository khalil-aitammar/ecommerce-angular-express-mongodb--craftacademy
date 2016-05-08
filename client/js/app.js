'use strict';
var app = angular.module('ecomm', ['ngRoute'] );
//configuration de routeProvider
app .config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        // url page film
        when('/detail:id?', {
            templateUrl: 'src/Views/article.html',
            controller: 'detailController'
        }).
        when('/panier:panier?', {
            templateUrl: 'src/Views/panier.html',
            controller: 'detailController'
        }).
        // url page series
        when('/series', {
            templateUrl: 'src/Views/series.html',
            controller: 'seriesController'
        }).
        when('/film', {
            templateUrl: 'src/Views/films.html',
            controller: 'detailController'
        }).
        // url par defaut
        otherwise({
            redirectTo: '/film'
        });
    }]);



$(function() {

    $(".panel-body").hide();
    $('#login-form-link').click(function(e) {
        $(".panel-body").show();
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});
