package models

import play.api.libs.json._
import anorm._
import anorm.SqlParser._
import play.api.db.DB
import play.api.Play.current
import scala.language.postfixOps

/**
 * Created with IntelliJ IDEA.
 * User: Moritz Grauel <moritz.grauel@akquinet.de>
 * Date: 28.08.13
 */
case class ToDo(id: Option[Long], name: String, done: Boolean)

object ToDoService {
  implicit val toDoFormat = Json.format[ToDo]

  val toDoParser = {
    get[Long]("id") ~
      get[String]("name") ~
      get[Boolean]("done") map {
      case id ~ name ~ done => ToDo(Some(id), name, done)
    }
  }

  def fetchAll(): Seq[ToDo] = {
    DB.withConnection {
      implicit connection =>
        SQL("SELECT id, name, done FROM todos").as(toDoParser *)
    }
  }

  def createNew(todo: ToDo) = {
    DB.withConnection {
      implicit connection =>
        val newId: Option[Long] = SQL("INSERT INTO todos(name, done) VALUES ({name},false)").on("name" -> todo.name).executeInsert()
        newId match {
          case Some(id) => ToDo(Some(id), todo.name, done = false)
          case _ => throw new RuntimeException("Could not insert")
        }
    }
  }

  def find(id: Long): Option[ToDo] = {
    DB.withConnection {
      implicit connection =>
        val result: List[ToDo] = SQL("SELECT id, name, done FROM todos WHERE id = {id}").on("id" -> id).as(toDoParser *)
        result.size match {
          case 1 => Some(result.head)
          case _ => None
        }
    }
  }

  def setDone(id: Long, done: Boolean) = {
    DB.withConnection {
      implicit connection =>
        SQL("UPDATE todos SET done = {done} WHERE id = {id}").on("done" -> done).on("id" -> id).executeUpdate()
    }
  }

  def prune() = {
    DB.withConnection {
      implicit connection =>
        SQL("DELETE FROM todos WHERE done = true").executeUpdate()
    }
  }
}
