
app.controller('TodayController', ['$scope', ($scope) ->
  $scope.now = () ->
    new Date()
])