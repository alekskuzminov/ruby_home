@echo off
echo Copying files to project folder...

REM Copy main files
copy "index.html" "project\"
copy "privacy-policy.html" "project\"
copy "manifest.json" "project\"
copy "robots.txt" "project\"
copy "sitemap.xml" "project\"
copy ".htaccess" "project\"
copy "package.json" "project\"
copy "README.md" "project\"

REM Copy folders
xcopy "assets" "project\assets\" /E /I /Y
xcopy "css" "project\css\" /E /I /Y
xcopy "js" "project\js\" /E /I /Y
xcopy "build" "project\build\" /E /I /Y
xcopy "production" "project\production\" /E /I /Y
xcopy "server" "project\server\" /E /I /Y

echo Files copied successfully!
pause
