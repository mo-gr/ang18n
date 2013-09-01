package controllers

import play.api.mvc.{RequestHeader, Action, Controller}
import play.api.i18n.Lang

/**
 * Created with IntelliJ IDEA.
 * User: Moritz Grauel <moritz.grauel@akquinet.de>
 * Date: 29.08.13
 */
object LocalizedPartialsController extends Controller with LocaleFromRequest{

  def languageSwitch = Action { implicit request =>

    Ok(views.html.partials.languageSwitch(localeFromRequest))
  }

  def createTodo = Action { implicit request =>
    Ok(views.html.partials.createTodo(localeFromRequest))
  }

}

trait LocaleFromRequest {
  def localeFromRequest(implicit request: RequestHeader): Lang = {
    request.cookies.get("language") match {
      case None => Application.lang(request)
      case Some(cookie) => Lang.get(cookie.value).getOrElse(Application.lang(request))
    }
  }
}
