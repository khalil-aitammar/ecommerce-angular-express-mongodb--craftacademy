'use strict';
var app = angular.module('ecomm', ['ngRoute', 'ngAnimate', 'ngCookies','toastr'])

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
app.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: false,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 1000,
        positionClass: 'toast-top-left',
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
        },
        messageClass: 'toast-message',
        onHidden: null,
        onShown: null,
        onTap: null,
        progressBar: false,
        tapToDismiss: true,
        templates: {
            toast: 'directives/toast/toast.html',
            progressbar: 'directives/progressbar/progressbar.html'
        },
        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });
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
        }).when('/panier', {
            templateUrl: 'src/Views/panier2.html',
            controller: 'panier2Controller'
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

































    $(".panel-body").hide();




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


