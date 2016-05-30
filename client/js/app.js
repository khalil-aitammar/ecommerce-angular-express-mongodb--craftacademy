'use strict';
var app = angular.module('ecomm', ['ngRoute', 'ngAnimate', 'ngCookies', 'toastr', 'ui.bootstrap'])


    .filter('startfrom',function () {
        return function (data,start) {

                if (!data || !data.length) { return; }
                start = +start; //parse to int
                return data.slice(start);
            }


    })

// fonction pour gerée le bug d'affichage de ng-repeat
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
                            case 2:
                                eqCol = 6;
                                break;
                            case 3:
                                eqCol = 4;
                                break;
                            case 4:
                                eqCol = 3;
                                break;
                        }
                        cssClass = ' col-md-' + eqCol;
                        if (index && index % itemsCount === 0) {
                            cssClass += ' clearfix ';
                        }
                    }
                }
                else {
                    var col = 12 / colNum;
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

// configuration du system de notification
app.config(function (toastrConfig) {
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
// main controller
app.controller('MainCtrl', function ($scope, $cookieStore) {
    // carousel
    
    $('.owl-carousel').owlCarousel(
        {
            navigation: true,
            loop: true,
            lazyLoad: true,
            margin: 5,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                960: {
                    items: 5
                },
                16000: {
                    items: 6
                }
            }
        }
    );
    // verification de la creation de session
    if ($cookieStore.get('myCookies')) {

        $scope.formup = false;
    }


});


//configuration de routeProvider
app.config(['$routeProvider',
    function ($routeProvider, $cookieStore, $locationProvider) {
        $routeProvider.// url page

        when('/detail:id?', {
            templateUrl: 'src/Views/article.html',
            controller: 'detailController'
        }).
        when('/panier', {
                templateUrl: 'src/Views/panier2.html',
                controller: 'panier2Controller',
                resolve: {
                    "check": function ($location, $cookieStore, toastr) {
                        if ($cookieStore.get('myCookies')) {

                        } else {
                            $location.path('/film');
                            toastr.error('vous ne pouvez accéder au panier sans authtification', 'Error');
                        }
                    }
                }
            })
            .when('/admin', {
                templateUrl: 'src/Views/admin.html',
                controller: 'adminController',
                resolve: {
                    "check": function ($location, $cookieStore, toastr) {
                        if ($cookieStore.get('myCookies').role == 'admin') {
                        
                            $(".owl-carousel").hide();

                        } else {
                            $(".bloctop").show();
                            $(".owl-carousel").show();
                            $location.path('/film');
                            toastr.error('vous ne pouvez accéder au panaux admin', 'Error');
                        }
                    }
                }
            })
            .when('/film', {
                templateUrl: 'src/Views/films.html',
                controller: 'articleController'
            }).// url par defaut
        otherwise({
            redirectTo: '/film'
        });

    }]);




// jquery pour le composant login
$(".panel-body").hide();
$('#login-form-link').click(function (e) {
    $(".panel-body").toggle();
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});
$('#register-form-link').click(function (e) {
    $(".panel-body").toggle();
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


