import anorm.Id
import controllers.ToDoController
import models.{ToDo, ToDoService}
import org.specs2.mutable._

import play.api.mvc.Result
import play.api.test._
import play.api.test.Helpers._
import play.api.libs.json.Json


/**
 * Created with IntelliJ IDEA.
 * User: Moritz Grauel <moritz.grauel@akquinet.de>
 * Date: 28.08.13
 */
class ToDoControllerSpec extends Specification {

  "ToDoController" should {

    "create a new todo" in {
      running(FakeApplication()) {
        val res: Result = ToDoController.create(
          FakeRequest(PUT,
            "/api/1.0/todo",
            FakeHeaders(),
            Json.parse( """{"name":"new todo","done":false}""")))
        status(res) must equalTo(OK)
        contentAsString(res) must contain("new todo")
      }
    }

    "return a list of todos" in {
      running(FakeApplication()) {
        contentAsString(ToDoController.todos(FakeRequest(GET, "/api/1.0/todo"))) must not beEmpty
      }
    }

    "fail creating an invalid todo" in {
      val res = ToDoController.create(
        FakeRequest(PUT,
          "/api/1.0/todo",
          FakeHeaders(),
          Json.parse( """["not", "a", "todo"]""")))
      status(res) must not equalTo (OK)
    }

    "update a todo to done" in {
      running(FakeApplication()) {
        val testTodo: ToDo = ToDoService.createNew(ToDo(Some(0L), "test", false))

        val res = ToDoController.updateDone(testTodo.id.get)(
            FakeRequest(POST, s"/api/1.0/todo/${testTodo.id}", FakeHeaders(), Json.parse("""{"name":"", "done":true}"""))
        )

        status(res) must equalTo(OK)

        val todo: Option[ToDo] = ToDoService.find(testTodo.id.get)
        (todo must not).beNone
        todo.get.done must beTrue
      }
    }
  }
}
