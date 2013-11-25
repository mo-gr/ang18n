(function() {
  var app;

  app = angular.module('ToDoApp', ['ngCookies', 'ngAnimate']);

  app.controller('LanguageController', [
    '$scope', 'LanguageService', function($scope, LanguageService) {
      $scope.language = LanguageService.currentLanguage();
      return $scope.updateLanguage = function(language) {
        return LanguageService.setLanguage(language);
      };
    }
  ]);

  app.controller('TodayController', [
    '$scope', function($scope) {
      return $scope.now = function() {
        return new Date();
      };
    }
  ]);

  app.controller('ToDoController', [
    '$scope', 'ToDoService', function($scope, ToDoService) {
      var newToDo;
      newToDo = function() {
        return {
          done: false,
          name: ''
        };
      };
      $scope.newToDo = newToDo();
      $scope.toDos = ToDoService.getAll();
      $scope.createToDo = function() {
        ToDoService.create($scope.newToDo);
        return $scope.newToDo = newToDo();
      };
      $scope.toggleDone = function(todo) {
        return ToDoService.toggleDone(todo);
      };
      return $scope.prune = function() {
        return $scope.toDos = ToDoService.prune();
      };
    }
  ]);

  app.service('LanguageService', [
    '$http', '$cookies', '$window', function($http, $cookies, $window) {
      this.setLanguage = function(key) {
        $cookies.language = key;
        return $window.location.reload();
      };
      return this.currentLanguage = function() {
        return $cookies.language || "en";
      };
    }
  ]);

  app.service('ToDoService', [
    '$http', function($http) {
      var todos;
      todos = [];
      this.getAll = function() {
        return $http.get('/api/1.0/todo').then(function(response) {
          return todos = response.data;
        });
      };
      this.create = function(newToDo) {
        return $http.put('/api/1.0/todo', newToDo).then(function(response) {
          return todos.push(response.data);
        });
      };
      this.toggleDone = function(todo) {
        todo.done = !todo.done;
        return $http.post('/api/1.0/todo/' + todo.id, todo);
      };
      return this.prune = function() {
        $http.post('/api/1.0/todo/prune');
        return todos = todos.filter(function(i) {
          return !i.done;
        });
      };
    }
  ]);

  app.directive('todo', function() {
    return {
      scope: {
        todo: '=',
        click: '&'
      },
      template: '{{todo.name}}',
      link: function(scope, element) {
        var updateDoneState;
        updateDoneState = function(state) {
          if (state) {
            return element.addClass('done');
          } else {
            return element.removeClass('done');
          }
        };
        element.on('click', function() {
          return scope.$apply(scope.click);
        });
        return scope.$watch('todo', (function(newVal, oldVal) {
          return updateDoneState(newVal.done);
        }), true);
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/