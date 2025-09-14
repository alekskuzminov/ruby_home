# Ruby Home Notify Server

Setup:
- Create `.env` in this folder and set SMTP/Telegram variables (see keys below).
- Install and run (Windows PowerShell):
```
cd server
npm i
npm run start
```

API:
- Client posts to `http://localhost:3001/api/notify`

Env keys:
```
PORT=3001
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
MAIL_FROM=
MAIL_TO=
TG_BOT_TOKEN=
TG_CHAT_ID=
```
