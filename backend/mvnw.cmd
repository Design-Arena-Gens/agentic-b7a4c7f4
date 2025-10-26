@ECHO OFF
SETLOCAL

SET BASE_DIR=%~dp0
SET WRAPPER_JAR=%BASE_DIR%\.mvn\wrapper\maven-wrapper.jar
SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

IF NOT "%JAVA_HOME%"=="" (
  SET "JAVA_EXEC=%JAVA_HOME%\bin\java.exe"
) ELSE (
  SET "JAVA_EXEC=java"
)

"%JAVA_EXEC%" %MAVEN_OPTS% -classpath "%WRAPPER_JAR%" %WRAPPER_LAUNCHER% %*
