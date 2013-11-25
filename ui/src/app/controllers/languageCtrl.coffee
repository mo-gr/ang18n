
app.controller('LanguageController', ['$scope', 'LanguageService', ($scope, LanguageService) ->
  $scope.language = LanguageService.currentLanguage()

  $scope.updateLanguage = (language) ->
    LanguageService.setLanguage(language)
])