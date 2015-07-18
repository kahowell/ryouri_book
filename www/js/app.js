angular.module('ryouri_book', ['ui.bootstrap', 'ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/book/:recipe_name', {
                templateUrl: 'recipe.html',
                controller: 'RecipeController'
            })
            .when('/book', {
                templateUrl: 'book.html',
                controller: 'BookController'
            })
            .when('/search', {
                templateUrl: 'search.html',
                controller: 'SearchController'
            })
            .when('/add', {
                templateUrl: 'add.html',
                controller: 'AddController'
            })
            .when('/help', {
                templateUrl: 'help.html'
            })
            .otherwise('/book');
    }])
    .filter('encodeURIComponent', function() {
        return window.encodeURIComponent;
    });
