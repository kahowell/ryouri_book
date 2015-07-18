angular.module('ryouri_book')
    .controller('BookController', ['$scope', 'recipe_service', function($scope, recipe_service) {
        $scope.recipes = [];
        $scope.loading = true;
        recipe_service.load_recipes().then(function(recipes) {
            console.log('loaded recipes');
            $scope.recipes = recipes;
            $scope.loading = false;
        });
    }])
    .controller('RecipeController', ['$scope', '$routeParams', 'recipe_service', function($scope, $routeParams, recipe_service) {
        $scope.recipe = {};
        recipe_service.load_recipe(decodeURIComponent($routeParams.recipe_name)).then(function(recipe) {
            $scope.recipe = recipe;
        });
    }]);
