# Инструкция по настройке Git и загрузке в репозиторий

## Проблема
В текущей среде PowerShell есть проблема с выполнением команд Git. Вам нужно выполнить следующие команды вручную.

## Решение

### 1. Откройте командную строку (cmd) или PowerShell от имени администратора

### 2. Перейдите в папку проекта
```cmd
cd C:\Users\User\Desktop\ruby-home
```

### 3. Инициализируйте Git репозиторий
```cmd
git init
```

### 4. Добавьте удаленный репозиторий
```cmd
git remote add origin https://github.com/alekskuzminov/ruby_home.git
```

### 5. Добавьте все файлы
```cmd
git add .
```

### 6. Создайте первый коммит
```cmd
git commit -m "Initial commit: RubyHome real estate agency landing page"
```

### 7. Переименуйте ветку в main
```cmd
git branch -M main
```

### 8. Загрузите в GitHub
```cmd
git push -u origin main
```

## Альтернативный способ через GitHub Desktop

1. Установите GitHub Desktop
2. Откройте GitHub Desktop
3. Выберите "Add an Existing Repository from your Hard Drive"
4. Выберите папку `C:\Users\User\Desktop\ruby-home`
5. Нажмите "Publish repository"
6. Введите URL: `https://github.com/alekskuzminov/ruby_home.git`

## Файлы готовы к загрузке

Все необходимые файлы для работы сайта уже подготовлены:

### Основные файлы:
- `index.html` - главная страница
- `privacy-policy.html` - политика конфиденциальности
- `manifest.json` - PWA манифест
- `robots.txt` - SEO файл
- `sitemap.xml` - карта сайта
- `.htaccess` - конфигурация Apache

### Папки с ресурсами:
- `assets/` - все изображения, иконки, шрифты
- `css/` - стили CSS
- `js/` - JavaScript файлы
- `build/` - минифицированные файлы для production
- `production/` - готовая production версия
- `server/` - backend сервер

### Конфигурационные файлы:
- `package.json` - зависимости Node.js
- `.gitignore` - файлы для игнорирования Git
- `README.md` - документация проекта

## После загрузки

После успешной загрузки в GitHub, вы сможете:

1. Клонировать репозиторий на любой сервер
2. Загрузить файлы из папки `production/` на веб-хостинг
3. Настроить домен и SSL сертификат
4. Запустить сайт

## Проверка

После загрузки проверьте, что все файлы загружены:
- Перейдите на https://github.com/alekskuzminov/ruby_home
- Убедитесь, что все папки и файлы присутствуют
- Проверьте, что `index.html` открывается корректно
