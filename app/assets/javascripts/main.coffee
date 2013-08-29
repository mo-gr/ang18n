
app = angular.module('ToDoApp', [])

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
])
