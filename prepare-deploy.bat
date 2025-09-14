@echo off
echo 🚀 Подготовка проекта RubyHome к деплою на Timeweb Cloud...

echo.
echo 📁 Создание структуры для деплоя...

REM Создаем папку для деплоя
if not exist "deploy" mkdir deploy
if not exist "deploy\server" mkdir deploy\server
if not exist "deploy\public" mkdir deploy\public

echo.
echo 📋 Копирование backend файлов...
copy "server\index.js" "deploy\server\"
copy "server\config.js" "deploy\server\"
copy "server\package.json" "deploy\server\"
copy "server\README.md" "deploy\server\"
copy "server\env.example" "deploy\server\"

echo.
echo 🌐 Копирование frontend файлов...
copy "index.html" "deploy\public\"
copy "privacy-policy.html" "deploy\public\"
copy "manifest.json" "deploy\public\"
copy "robots.txt" "deploy\public\"
copy "sitemap.xml" "deploy\public\"

REM Копируем папки
xcopy "css" "deploy\public\css\" /E /I /Q
xcopy "js" "deploy\public\js\" /E /I /Q
xcopy "assets" "deploy\public\assets\" /E /I /Q

echo.
echo ✅ Структура для деплоя готова!
echo.
echo 📂 Файлы подготовлены в папке 'deploy':
echo    ├── server/     (Backend Node.js приложение)
echo    └── public/     (Frontend статические файлы)
echo.
echo 📋 Следующие шаги:
echo    1. Загрузите содержимое папки 'deploy' в GitHub репозиторий
echo    2. Следуйте инструкции в TIMEWEB_DEPLOY_GUIDE.md
echo    3. Настройте переменные окружения в панели Timeweb
echo.
pause
