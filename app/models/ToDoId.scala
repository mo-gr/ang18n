package models

import play.api.libs.json._
import play.api.mvc.PathBindable
import play.api.libs.json.JsNumber

case class ToDoId(id: Long) extends AnyVal

object ToDoId {

  implicit val toDoIdJson = new Format[ToDoId] {

    def reads(json: JsValue): JsResult[ToDoId] =
      json.validate[Long].map(id => ToDoId(id))

    def writes(id: ToDoId): JsValue = JsNumber(id.id)
  }

  implicit def toDoIdPathBindable(implicit stringBinder: PathBindable[Long]) = new PathBindable[ToDoId] {
    def bind(key: String, value: String): Either[String, ToDoId] =
      for {
        id <- stringBinder.bind(key, value).right
      } yield apply(id)

    def unbind(key: String, toDoId: ToDoId): String = stringBinder.unbind(key, toDoId.id)
  }
}
