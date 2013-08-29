package controllers

import play.api.mvc._
import play.api.libs.json.{JsResult, Json}
import models.{ToDoService, ToDo}
import models.ToDoService._

/**
 * Created with IntelliJ IDEA.
 * User: Moritz Grauel <moritz.grauel@akquinet.de>
 * Date: 28.08.13
 */
object ToDoController extends Controller {

  def todos = Action {
    Ok(Json.toJson(ToDoService.fetchAll()))
  }

  def create = Action(parse.json) { request =>
    request.body.validate[ToDo].fold(
      valid = todo => Ok(Json.toJson(ToDoService.createNew(todo))),
      invalid = e => BadRequest("invalid request")
    )
  }

  def updateDone(id: Long) = Action(parse.json) { request =>
    request.body.validate[ToDo].fold(
      valid = toUpdate => Ok(Json.toJson(ToDoService.setDone(id, toUpdate.done))),
      invalid = e => BadRequest("invalid request")
    )
  }

  def prune = Action {
    ToDoService.prune()
    Ok("ok")
  }
}

