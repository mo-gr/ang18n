

app.service('LanguageService', ['$http', '$cookies', '$window', ($http, $cookies, $window) ->
  @setLanguage = (key) ->
    $cookies.language = key
    $window.location.reload()

  @currentLanguage = () ->
    $cookies.language or "en"
])

