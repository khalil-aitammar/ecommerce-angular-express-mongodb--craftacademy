'use strict';
app.controller('adminController', function ($scope, $http, $window, $cookieStore, toastr, $location) {
    $(".bloctop").hide();
    $(".owl-carousel").hide();
    $scope.back = function () {
        $(".bloctop").show();
        $(".owl-carousel").show();
        $location.url('/');
    }

// récupération de tout les user
    $http({
        method: 'GET',
        url: '/user'
    }).then(function successCallback(response) {
        $scope.user = response.data;
        console.log('res user', $scope.user);


    }).then(function () {

    })

    $scope.removeUser = function (x,$index) {
        console.log($index);

        $http({
            method: 'GET',
            url: '/user/'+x._id
        }).then(function successCallback(response) {
            $scope.user = response.data;
            console.log('res user', $scope.user);
            for (var i = 0; i < $scope.user.length; i++) {
                if ($scope.user [i].length == 0)
                    $scope.user.splice($index, 1);  //updated
            }


        }).then(function () {


        })
    }

});
