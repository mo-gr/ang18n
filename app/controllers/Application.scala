package controllers

import play.api.mvc._

object Application extends Controller with LocaleFromRequest {

  def index = Action { implicit request =>
    Ok(views.html.index(localeFromRequest))
  }

}