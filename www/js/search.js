angular.module('ryouri_book')
    .controller('SearchController', ['$scope', 'recipe_service', function($scope, recipe_service) {
        $scope.recipes = [];
        $scope.search = function() {
            $scope.loading = true;
            recipe_service.search($scope.query).then(function(recipes) {
                $scope.recipes = recipes;
                $scope.loading = false;
            });
        }
    }]);
