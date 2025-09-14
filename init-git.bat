@echo off
echo Initializing Git repository...

REM Initialize git repository
git init

REM Add remote origin
git remote add origin https://github.com/alekskuzminov/ruby_home.git

REM Add all files
git add .

REM Create initial commit
git commit -m "Initial commit: RubyHome real estate agency landing page"

REM Push to GitHub
git branch -M main
git push -u origin main

echo Git repository initialized and pushed to GitHub!
pause
