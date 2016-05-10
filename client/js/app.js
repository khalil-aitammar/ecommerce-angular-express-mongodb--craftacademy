'use strict';
var app = angular.module('ecomm', ['ngRoute', 'ngAnimate', 'ngCookies']);
//configuration de routeProvider
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.// url page film
        when('/detail:id?', {
            templateUrl: 'src/Views/article.html',
            controller: 'detailController'
        }).when('/panier:panier?', {
            templateUrl: 'src/Views/panier.html',
            controller: 'detailController'
        }).// url page series
        when('/series', {
            templateUrl: 'src/Views/series.html',
            controller: 'seriesController'
        }).when('/film', {
            templateUrl: 'src/Views/films.html',
            controller: 'articleController'
        }).// url par defaut
        otherwise({
            redirectTo: '/film'
        });
    }]);


$(function bloclogin() {

    $(".panel-body").hide();
    $("#alert-success").hide();
    $("#alert-danger").hide();
    $("#alert-login-erreur").hide();
    $("#alert-login-success").hide();

    $("#alert-login-erreur").mouseover(function () {
        $("#alert-login-erreur").hide(1500);
    });
    $("#alert-login-success").mouseover(function () {
        $("#alert-login-success").hide(1500);
    });


// notification login
    $('#boutonlogin').click(function (e) {
        var CookieGet =$.cookie('login', Number); 
        


        if (CookieGet==1) {
            $("#alert-login-success").show();
        }
        if (CookieGet ==2) {
            $("#alert-login-erreur").show();
            $(".panel-body").hide();
        }


    });


    $('#register-form-link').click(function (e) {
        $(".panel-body").show();
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $('#login-form-link').click(function (e) {
        $(".panel-body").show();
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});
