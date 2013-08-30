
app = angular.module('ToDoApp', ['ngCookies', 'ngAnimate'])

app.controller('LanguageController', ['$scope', 'LanguageService', ($scope, LanguageService) ->
  $scope.language = LanguageService.currentLanguage()

  $scope.updateLanguage = (language) ->
    LanguageService.setLanguage(language)
])

app.controller('TodayController', ['$scope', ($scope) ->
  $scope.now = () ->
    new Date()
])

app.controller('ToDoController', ['$scope', 'ToDoService', ($scope, ToDoService) ->
  newToDo = () ->
    {done: false, name: ''}

  $scope.newToDo = newToDo()

  $scope.toDos = ToDoService.getAll()

  $scope.createToDo = () ->
    ToDoService.create($scope.newToDo)
    $scope.newToDo = newToDo()

  $scope.toggleDone = (todo) ->
    ToDoService.toggleDone(todo)

  $scope.prune = () ->
    $scope.toDos = ToDoService.prune()
])

app.service('LanguageService', ['$http', '$cookies', '$window', ($http, $cookies, $window) ->
  @setLanguage = (key) ->
    console.log(key)
    $cookies.language = key
    $window.location.reload()

  @currentLanguage = () ->
    $cookies.language or "en"
])

app.service('ToDoService', ['$http', ($http) ->
  todos = []

  @getAll = () ->
    $http.get('/api/1.0/todo').then (response) ->
      todos = response.data

  @create = (newToDo) ->
    $http.put('/api/1.0/todo', newToDo).then (response) ->
      todos.push(response.data)

  @toggleDone = (todo) ->
    todo.done = !todo.done
    $http.post('/api/1.0/todo/' + todo.id, todo)

  @prune = () ->
    $http.post('/api/1.0/todo/prune')
    todos = todos.filter((i) -> !i.done)
])
