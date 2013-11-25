
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