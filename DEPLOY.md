# 🚀 Инструкция по деплою RubyHome

## 📋 Подготовка к деплою

### ✅ Выполненные оптимизации

1. **Удалены console.log** из production кода
2. **Исправлено дублирование** index.html файлов
3. **Создан PWA манифест** для мобильных устройств
4. **Минифицированы CSS и JS** файлы
5. **Настроен .htaccess** для Apache сервера
6. **Создана production папка** с оптимизированными файлами

## 🗂️ Структура production папки

```
production/
├── index.html              # Главная страница (оптимизированная)
├── manifest.json           # PWA манифест
├── .htaccess              # Конфигурация Apache
├── build/
│   ├── style.min.css      # Минифицированный CSS
│   └── script.min.js      # Минифицированный JavaScript
└── assets/                # Все ресурсы (изображения, иконки, шрифты)
```

## 🌐 Варианты деплоя

### 1. Shared Hosting (cPanel, ISPmanager)

1. **Загрузите файлы** из папки `production/` в корень домена
2. **Убедитесь**, что .htaccess загружен
3. **Проверьте**, что все изображения загружены в папку `assets/`
4. **Настройте SSL** сертификат (Let's Encrypt)

### 2. VPS/Cloud Server

#### Apache
```bash
# Скопируйте файлы
scp -r production/* user@server:/var/www/html/

# Установите права
chmod 644 /var/www/html/.htaccess
chmod -R 755 /var/www/html/assets/

# Перезапустите Apache
sudo systemctl restart apache2
```

#### Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;

    # Cache headers
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 3. CDN (Cloudflare, AWS CloudFront)

1. **Загрузите файлы** в S3 bucket или на сервер
2. **Настройте CDN** для кэширования статических ресурсов
3. **Включите сжатие** (gzip/brotli)
4. **Настройте HTTPS** редирект

## 🔧 Настройка сервера

### Apache (.htaccess уже настроен)

- ✅ Gzip сжатие включено
- ✅ Кэширование настроено
- ✅ Security headers добавлены
- ✅ MIME types настроены

### Nginx (дополнительная настройка)

```nginx
# Добавьте в server блок
location / {
    try_files $uri $uri/ =404;
}

# Сжатие
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

# Безопасность
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

## 📱 PWA настройка

### Иконки (требуется создание)

Создайте иконки в папке `assets/icons/`:
- `favicon.ico` (32x32)
- `favicon-16x16.png` (16x16)
- `favicon-32x32.png` (32x32)
- `apple-touch-icon.png` (180x180)
- `icon-192x192.png` (192x192)
- `icon-512x512.png` (512x512)

### Манифест

Файл `manifest.json` уже настроен и готов к использованию.

## 🔍 SEO проверка

### Обязательные проверки

1. **Google PageSpeed Insights** - проверьте скорость загрузки
2. **Google Search Console** - добавьте сайт и проверьте индексацию
3. **Lighthouse** - проверьте производительность, доступность, SEO
4. **Mobile-Friendly Test** - проверьте мобильную версию

### Мета-теги (уже настроены)

- ✅ Title и Description
- ✅ Open Graph теги
- ✅ Twitter Card теги
- ✅ Structured Data (Schema.org)
- ✅ Canonical URL
- ✅ Robots meta

## 🚨 Чек-лист перед запуском

### Критичные проверки

- [ ] Все изображения загружены и отображаются
- [ ] CSS и JS файлы загружаются без ошибок
- [ ] Формы работают корректно
- [ ] Модальные окна открываются/закрываются
- [ ] Слайдер отзывов функционирует
- [ ] Сайт адаптивен на всех устройствах
- [ ] SSL сертификат установлен
- [ ] HTTPS редирект настроен

### Производительность

- [ ] Gzip сжатие работает
- [ ] Кэширование настроено
- [ ] Изображения оптимизированы
- [ ] CSS и JS минифицированы
- [ ] Lazy loading работает

### SEO и доступность

- [ ] Все alt-тексты заполнены
- [ ] ARIA атрибуты настроены
- [ ] Мета-теги корректны
- [ ] Sitemap.xml создан
- [ ] Robots.txt настроен

## 🔧 Дополнительные настройки

### Аналитика

Добавьте Google Analytics в `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Мониторинг ошибок

Добавьте Sentry для отслеживания ошибок:

```html
<script src="https://browser.sentry-cdn.com/7.0.0/bundle.min.js"></script>
<script>
  Sentry.init({ dsn: 'YOUR_DSN' });
</script>
```

## 📞 Поддержка

При возникновении проблем:

1. Проверьте консоль браузера на ошибки
2. Убедитесь, что все файлы загружены
3. Проверьте настройки сервера
4. Протестируйте на разных устройствах

---

**Готово к деплою! 🎉**

Все файлы оптимизированы и готовы для production использования.
