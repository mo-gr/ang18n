import sbt._
import Keys._
import play.Project._

object ApplicationBuild extends Build {

  val appName = "ang18n"
  val appVersion = "1.0-SNAPSHOT"

  val appDependencies = Seq(
    jdbc,
    anorm,
    "org.mockito" % "mockito-core" % "1.8.5"
  )

  val main = play.Project(appName, appVersion, appDependencies)
    .settings()

}
