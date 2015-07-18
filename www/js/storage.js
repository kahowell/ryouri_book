angular.module('ryouri_book')
    .factory('recipe_service', ['$q', function($q) {
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
        var request = indexedDB.open('recipes', 1);
        var recipe_store_deferred = $q.defer();
        var recipe_store_promise = recipe_store_deferred.promise;
        request.onupgradeneeded = function(event) {
            // initialize indexedDB
            var db = event.target.result;
            var recipe_store = db.createObjectStore('recipes', { keyPath: 'name' });
            recipe_store.createIndex('keywords', 'keywords', { multiEntry: true });
        }
        request.onsuccess = function(event) {
            var db = event.target.result;
            recipe_store_deferred.resolve(db);
        };
        this.add_recipe = function(recipe) {
            // gather keywords
            recipe.keywords = [];
            recipe.ingredients.map(function(ingredient) {
                recipe.keywords.push(ingredient.name);
            });
            recipe.keywords.push(recipe.name);
            var add_recipe_deferred = $q.defer();
            recipe_store_promise.then(function(db) {
                var recipe_store = db.transaction(['recipes'], 'readwrite').objectStore('recipes');
                recipe_store.add(recipe).onsucess = function() {
                    add_recipe_deferred.resolve();
                };
            });
            return add_recipe_deferred.promise;
        }
        this.load_recipes = function() {
                console.log('loading recipes 1st');
            var load_recipes_deferred = $q.defer();
            var recipes = [];
            recipe_store_promise.then(function(db) {
                console.log('loading recipes');
                var recipe_store = db.transaction(['recipes'], 'readonly').objectStore('recipes');
                var req = recipe_store.openCursor();
                req.onsuccess = function(event) {
                    console.log('herey!', event);
                    var cursor = event.target.result;
                    if (cursor) {
                        recipes.push(cursor.value);
                        cursor.continue();
                        //load_recipes_deferred.notify(recipes);
                    }
                    else {
                        load_recipes_deferred.resolve(recipes);
                    }
                }
                req.onerror = function(event) {
                    console.log('error', event);
                }
            });
            return load_recipes_deferred.promise;
        };
        this.load_recipe = function(recipe_name) {
            var load_recipe_deferred = $q.defer();
            recipe_store_promise.then(function(db) {
                var recipe_store = db.transaction(['recipes'], 'readonly').objectStore('recipes');
                recipe_store.get(recipe_name).onsuccess = function(event) {
                    load_recipe_deferred.resolve(event.target.result);
                };
            });
            return load_recipe_deferred.promise;
        };
        this.search = function(keyword) {
            var search_deferred = $q.defer();
            var recipes = [];
            recipe_store_promise.then(function(db) {
                var recipe_store = db.transaction(['recipes'], 'readonly').objectStore('recipes');
                var index = recipe_store.index('keywords');
                index.openCursor(IDBKeyRange.only(keyword)).onsuccess = function(event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        recipes.push(cursor.value);
                        cursor.continue();
                        search_deferred.notify(recipes);
                    }
                    else {
                        search_deferred.resolve(recipes);
                    }
                };
            });
            return search_deferred.promise;
        }
        return this;
    }]);

