# PowerShell скрипт для подготовки проекта RubyHome к деплою на Timeweb Cloud

Write-Host "🚀 Подготовка проекта RubyHome к деплою на Timeweb Cloud..." -ForegroundColor Green

Write-Host ""
Write-Host "📁 Создание структуры для деплоя..." -ForegroundColor Yellow

# Создаем папку для деплоя
if (!(Test-Path "deploy")) { New-Item -ItemType Directory -Name "deploy" }
if (!(Test-Path "deploy\server")) { New-Item -ItemType Directory -Name "deploy\server" }
if (!(Test-Path "deploy\public")) { New-Item -ItemType Directory -Name "deploy\public" }

Write-Host ""
Write-Host "📋 Копирование backend файлов..." -ForegroundColor Yellow
Copy-Item "server\index.js" "deploy\server\"
Copy-Item "server\config.js" "deploy\server\"
Copy-Item "server\package.json" "deploy\server\"
Copy-Item "server\README.md" "deploy\server\"
Copy-Item "server\env.example" "deploy\server\"

Write-Host ""
Write-Host "🌐 Копирование frontend файлов..." -ForegroundColor Yellow
Copy-Item "index.html" "deploy\public\"
Copy-Item "privacy-policy.html" "deploy\public\"
Copy-Item "manifest.json" "deploy\public\"
Copy-Item "robots.txt" "deploy\public\"
Copy-Item "sitemap.xml" "deploy\public\"

# Копируем папки рекурсивно
Copy-Item "css" "deploy\public\css\" -Recurse
Copy-Item "js" "deploy\public\js\" -Recurse
Copy-Item "assets" "deploy\public\assets\" -Recurse

Write-Host ""
Write-Host "✅ Структура для деплоя готова!" -ForegroundColor Green
Write-Host ""
Write-Host "📂 Файлы подготовлены в папке 'deploy':" -ForegroundColor Cyan
Write-Host "   ├── server/     (Backend Node.js приложение)" -ForegroundColor White
Write-Host "   └── public/     (Frontend статические файлы)" -ForegroundColor White
Write-Host ""
Write-Host "📋 Следующие шаги:" -ForegroundColor Cyan
Write-Host "   1. Загрузите содержимое папки 'deploy' в GitHub репозиторий" -ForegroundColor White
Write-Host "   2. Следуйте инструкции в TIMEWEB_DEPLOY_GUIDE.md" -ForegroundColor White
Write-Host "   3. Настройте переменные окружения в панели Timeweb" -ForegroundColor White
Write-Host ""
Write-Host "Нажмите любую клавишу для продолжения..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
