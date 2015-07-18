angular.module('ryouri_book')
    .controller('AddController', ['$scope', 'recipe_service', '$location', function($scope, recipe_service, $location) {
        $scope.new_recipe = function() {
            return {
                ingredients: [{

                }],
                instructions: [{

                }],
            };
        }
        $scope.add_ingredient = function() {
            $scope.recipe.ingredients.push({});
        }
        $scope.remove_ingredient = function() {
            $scope.recipe.ingredients.pop();
        }
        $scope.add_instruction = function() {
            $scope.recipe.instructions.push({});
        }
        $scope.remove_instruction = function() {
            $scope.recipe.instructions.pop();
        }
        $scope.add_recipe = function() {
            recipe_service.add_recipe($scope.recipe);
            $location.url('/book/' + encodeURIComponent($scope.recipe.name));
        }
        $scope.recipe = $scope.new_recipe();
    }]);
