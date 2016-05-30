'use strict';
app.controller('adminController', function ($scope, $http, $window, $cookieStore, toastr, $location,$filter) {
    // jquery pour video la page

    $(".bloctop").hide();
    $(".owl-carousel").hide();
    $scope.back = function () {
        $(".bloctop").show();
        $(".owl-carousel").show();
        $location.url('/');
    }
//*********************** gestion users ***********************//
// récupération de tous les users

    $http({
        method: 'GET',
        url: '/user'
    }).then(function successCallback(response) {
        $scope.user = response.data;



    })

// remove user

    $scope.removeUser = function (x, $index) {
        $http({
            method: 'GET',
            url: '/user/' + x._id
        }).then(function successCallback(response) {
            $scope.user = response.data;
            console.log('index',$index);

            for (var i = 0; i <  $scope.user.length; i++) {
                if ($scope.user[i].List.length == 0)
                    $scope.user.splice($index, 1);  //updated
            }

        })
    }

    //******************** gestion films ********************************//
// récupération de tous les film

        $http({
            method: 'GET',
            url: '/api/films'
        }).then(function successCallback(response) {
            $scope.articles = response;
            console.log('respense loula ', $scope.articles.data);
            $scope.film = $scope.articles.data;
            console.log('film', $scope.film);
        })


    $scope.ajouterarticle = function () {
        console.log($scope.titrearticle,$scope.prixarticle,$scope.urlimgarticle);

 if (!($scope.titrearticle == undefined && $scope.prixarticle == undefined && $scope.urlimgarticle == undefined)){

        $http.post('/api/films/',{
            titre: $scope.titrearticle,
            description:$scope.descriptionarticle,
            genre:$scope.genrearticle,
            url_img:$scope.urlimgarticle,
            prix:$scope.prixarticle,
            dateresD:$scope.dt,
            dateresF:$scope.dt2
        }).success(function (data, status) {

            $scope.film.push(data);
                toastr.success('article crée  ' +$scope.titrearticle , 'success!');
            })
            .error(function (data, status) {
                console.log(' ajout panier erreur ', data, status);
            });

    }else {
     toastr.error('formulaire non complet', 'Error');
    }
    }




// calendrer
$scope.today = function() {
    $scope.dt = new Date();
};
$scope.today();

$scope.clear = function() {
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

$scope.toggleMin = function() {
    $scope.options.minDate = $scope.options.minDate ? null : new Date();
};

$scope.toggleMin();

$scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
};

var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
var afterTomorrow = new Date(tomorrow);
afterTomorrow.setDate(tomorrow.getDate() + 1);
$scope.events = [
    {
        date: tomorrow,

    },
    {
        date: afterTomorrow,

    }
];

function getDayClass(data) {
    var date = data.date,
        mode = data.mode;
    if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
                return $scope.events[i].status;
            }
        }
    }

    return '';
}






});