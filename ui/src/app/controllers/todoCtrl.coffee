
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