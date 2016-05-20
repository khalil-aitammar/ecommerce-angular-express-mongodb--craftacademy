'use strict';
var app = angular.module('ecomm', ['ngRoute', 'ngAnimate', 'ngCookies','ui.bootstrap'])

    .filter('columns', function () {
        return function (items, colNum, index) {
            var cssClass = '',
                itemsCount = Object.keys(items).length;

            if (colNum > 1 && colNum < 13) {
                if (itemsCount < colNum) {
                    if (itemsCount === 5) {
                        cssClass = ' col-md-2';
                    } else {
                        var eqCol = 12;
                        switch (itemsCount) {
                            case 2: eqCol = 6; break;
                            case 3: eqCol = 4; break;
                            case 4: eqCol = 3; break;
                        }
                        cssClass = ' col-md-' + eqCol;
                        if (index && index % itemsCount === 0) {
                            cssClass += ' clearfix ';
                        }
                    }
                }
                else {
                    var col = 12/colNum;
                    if (col.toString().indexOf('.') != 1) {
                        cssClass = ' col-md-' + col;
                        if (index && index % colNum === 0) {
                            cssClass += ' clearfix ';
                        }
                    }
                }
            }
            return cssClass;
        };
    });


app.controller('MainCtrl', function($scope,$http) {
    $('.owl-carousel').owlCarousel(
        {
            navigation : true,
            loop:true,
            lazyLoad:true,
            margin:5,
            autoplay:true,
            autoplayTimeout:3000,
            autoplayHoverPause:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                960:{
                    items:5
                },
                16000:{
                    items:6
                }
            }
        }

    );
    $http({method: 'GET', url: '/user/session'}).
    success(function(data, status, headers, config) {
        console.log('je suis log',data,status);
        $scope.formup = false;
    }).
    error(function(data, status, headers, config) {
        console.log('ménich log',data,status);
    });

});



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
        when('/res', {
            templateUrl: 'src/Views/panier2.html',
            controller: 'panier2Controller'
        }).when('/film', {
            templateUrl: 'src/Views/films.html',
            controller: 'articleController'
        }).// url par defaut
        otherwise({
            redirectTo: '/film'
        });
    }]);


























$('#addbutton').click(function (e) {
    var CookieGet =$.cookie('login', Number);



    if (CookieGet ==3) {
        $("#alert-login-erreur").show();
        $(".panel-body").hide();
        $.cookie('login', '');
    }


});








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
            $.cookie('login', '');
        }
        if (CookieGet ==2) {
            $("#alert-login-erreur").show();
            $.cookie('login', '');
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


