angular.module('ryouri_book')
    .factory('recipe_service', ['$q', function($q) {
        var initialized_db_deferred = $q.defer();
        var recipe_store_promise = initialized_db_deferred.promise;
        var db = new PouchDB('recipes');
        /*
        var keyword_index = {
            _id: '_design/keyword_idx',
            views: {
                'keyword_idx': {
                    map: function (recipe) {
                        recipe.keywords.each(function(keyword)) {
                            emit(keyword);
                        }.toString();
                    }
                }
            }
        };
        */
        //pouch.put(keyword_index).then(function() {
            initialized_db_deferred.resolve(db);
        //});
        this.add_recipe = function(recipe) {
            recipe._id = recipe.name;
            recipe.keywords = [recipe.name];
            recipe.ingredients.map(function(ingredient) {
                recipe.keywords.push(ingredient.name);
            });
            return $q.when(db.put(recipe));
        }
        this.load_recipes = function() {
            var recipes_deferred = $q.defer();
            db.allDocs({include_docs: true}).then(function(results) {
                var recipes = [];
                results.rows.map(function(row) {
                   recipes.push(row.doc);
                });
                recipes_deferred.resolve(recipes);
            });
            return recipes_deferred.promise;
        };
        this.load_recipe = function(recipe_name) {
            return $q.when(db.get(recipe_name));
        };
        this.search = function(query) {
            var recipes_deferred = $q.defer();
            db.search({
                query: query,
                fields: ['name', 'keywords'],
                include_docs: true
            }, function(err, results) {
                var recipes = [];
                results.rows.map(function(row) {
                    recipes.push(row.doc);
                });
                recipes_deferred.resolve(recipes);
            });
            return recipes_deferred.promise;
        }
        return this;
    }]);

