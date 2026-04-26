@echo off
echo ===================================================
echo             Starting Issue Tracker...
echo ===================================================
echo.
echo The application will start in the background.
echo It will open in your browser automatically at:
echo http://localhost:8080
echo.
echo Keep this window open. Close it to stop the server.
echo.

:: Open browser
start http://localhost:8080

:: Run the embedded Java App
java -jar Issue-Tracking-0.0.1-SNAPSHOT.jar

pause