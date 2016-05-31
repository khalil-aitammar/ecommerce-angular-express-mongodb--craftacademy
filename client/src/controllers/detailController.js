'use strict';
app.controller('detailController', function ($scope, $http, $routeParams, $cookieStore, toastr) {

    // page panier , recuperer le film et id user
    var filmid = $routeParams.id;
    var trouver = false;
    $http({
        method: 'GET',
        url: '/api/films/' + filmid
    }).then(function successCallback(response) {
        $scope.film = response;
        $scope.film = $scope.film.data;
        $cookieStore.put('myfilm', $scope.film);


    })

// ajouter dans le panier de l'utilisateur
    $scope.ajoutpanier = function () {
        trouver = false;
        if ($cookieStore.get('myCookies')) {
            var iduser = $cookieStore.get('myCookies').userid;
            // id film et quantité
            var idfilm = {
                _id: filmid,
                qt: $scope.qt,
                titre: $scope.film.titre,
                description: $scope.film.description,
                url_img: $scope.film.url_img,
                prix: $scope.film.prix,
                resD:$scope.dt,
                resF:$scope.dt2
            };

            $http({
                method: 'GET',
                url: '/api/panier/' + iduser
            }).then(function successCallback(response) {
                console.log('resulta get panier', response);
                var panier = response.data;
                console.log(panier);

                for (var i = 0; i < panier.articles.length; i++) {

                    if (panier.articles[i]._id == idfilm._id) {
                        trouver = true;
                        console.log('trouver', trouver);
                    }

                }

            }).then(function successCallback(response) {
                console.log('after trouver', trouver);
                if (trouver == true) {
                    toastr.success(' modification du film' + $scope.film.titre, 'success!');

                    $http({
                        method: 'PUT',
                        url: '/api/panier/' + iduser,
                        data: idfilm,
                    }).then(function successCallback(response) {
                        console.log('modif panier dans detail', response);
                        toastr.success(' modification du film' + $scope.film.titre, 'success!');

                    }, function errorCallback(response) {
                        console.log('erre', response);
                    });

                } else {
                    toastr.success(' ajouter de nouveau film' + $scope.film.titre, 'success!');
                    $http({
                        method: 'POST',
                        url: '/api/panier/' + iduser,
                        data: idfilm,
                    }).then(function successCallback(response) {
                        console.log('nouveau film ajouter', response);


                    }, function errorCallback(response) {
                        console.log('erre', response);
                    });

                }
            })


        } else {
            toastr.error('vous ne pouvez accéder au panier sans authtification', 'Error');
        }
    }

    // calendrier
    $scope.isCollapsed = true;
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.options = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };


    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.options.minDate = $scope.options.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };
    function getd() {

        var kha = $cookieStore.get('myfilm');
        return kha.dateresD;
    }
    function getf() {

        var kha = $cookieStore.get('myfilm');
        return kha.dateresF;
    }

    var tomorrow = getd();
    console.log('ddd', tomorrow);

    var afterTomorrow = getf();

    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'full'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $scope.reservation = function () {
        console.log('new data', $scope.dt);
    }


});

