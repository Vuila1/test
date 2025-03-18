@echo off

:: Change directory to backend and start the server
start cmd /k "cd /d C:\Users\buith\Desktop\web demo\lananh-backend && node index.js"

:: Open the frontend in the default web browser
start "" "C:\Users\buith\Desktop\web demo\lananh-frontend\index.html"

:: Pause to keep the batch window open
pause