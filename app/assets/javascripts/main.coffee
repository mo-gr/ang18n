
app = angular.module('ToDoApp', ['ngCookies'])

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
    ToDoService.create($scope.newToDo).then () ->
      $scope.toDos = ToDoService.getAll()
    $scope.newToDo = newToDo()

  $scope.toggleDone = (todo) ->
    ToDoService.toggleDone(todo).then () ->
      $scope.toDos = ToDoService.getAll()

  $scope.prune = () ->
    ToDoService.prune().then () ->
      $scope.toDos = ToDoService.getAll()

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
  @getAll = () ->
    $http.get('/api/1.0/todo').then (response) ->
      response.data

  @create = (newToDo) ->
    $http.put('/api/1.0/todo', newToDo)

  @toggleDone = (todo) ->
    todo.done = !todo.done
    $http.post('/api/1.0/todo/' + todo.id, todo)

  @prune = () ->
    $http.post('/api/1.0/todo/prune')
])
