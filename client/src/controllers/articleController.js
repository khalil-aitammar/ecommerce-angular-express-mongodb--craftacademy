app.controller('articleController', function ($scope, $http) {


    $http({
        method: 'GET',
        url: '/api/films'
    }).then(function successCallback(response) {
        $scope.articles = response;
        console.log('controller article', $scope.articles);
        $scope.film = $scope.articles.data;

    }).then(function () {

    })
    $scope.addToCart = function (product) {
        console.log("debbut produit",product);
        var kha = new Object();

        kha.id = parseInt(product._id);
        kha.titre = product.titre;
        kha.image = product.url_img;
        kha.price = product.prix;
        kha.$$hashKey = kha.hashKey;
        console.log(" kha",kha);
      
        product.id =  kha.id ;
        product.titre = kha.titre;
        product.image = kha.image;
        product.price = kha.price
        
        console.log("fin",product);
        $scope.cart = [];
        var found = false;
        $scope.cart.forEach(function (item) {
            if (item.id === product.id) {
                console.log("je suis la ", item.id, product.id);
                item.quantity++;
                found = true;
            }
        });
        if (!found) {
            console.log("push  ",product);
            $scope.cart.push(angular.extend({quantity: 1}, product));
        }
    };

    $scope.getCartPrice = function () {
        var total = 0;
        $scope.cart.forEach(function (product) {
            total += product.price * product.quantity;
        });
        return total;
    };
})


