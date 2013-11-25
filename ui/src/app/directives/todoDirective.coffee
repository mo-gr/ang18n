app.directive 'todo', () ->
  {
    scope: {
      todo: '='
      click: '&'
    }
    template: '{{todo.name}}'
    link: (scope, element) ->

      updateDoneState = (state) ->
        if state then element.addClass 'done' else element.removeClass 'done'

      element.on 'click', () ->
        scope.$apply( scope.click )

      scope.$watch( 'todo', ((newVal, oldVal) -> updateDoneState(newVal.done)), true)
  }