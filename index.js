import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
// Временная конфигурация для production
const config = {
  port: 3001,
  smtp: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    user: 'your_email@gmail.com',
    pass: 'your_app_password'
  },
  mail: {
    from: 'Ruby Home <your_email@gmail.com>',
    to: 'your_email@gmail.com'
  },
  telegram: {
    botToken: '',
    chatId: ''
  }
};

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static('.'));

// API routes
const sendEmail = async ({ name, phone, email, intent }) => {
  // Для тестирования - просто логируем данные
  console.log('📧 Email would be sent:', { name, phone, email, intent });
  return { ok: true };
};

const sendTelegram = async ({ name, phone, email, intent }) => {
  // Для тестирования - просто логируем данные
  console.log('📱 Telegram would be sent:', { name, phone, email, intent });
  return { ok: true };
};

app.post('/api/notify', async (req, res) => {
  const { name, phone, email, intent } = req.body || {};
  if (!name || !phone || !email) return res.status(400).json({ ok: false, error: 'invalid_payload' });
  try {
    const [mail, tg] = await Promise.allSettled([ sendEmail({ name, phone, email, intent }), sendTelegram({ name, phone, email, intent }) ]);
    return res.json({ ok: true, email: mail.status === 'fulfilled' && mail.value.ok, telegram: tg.status === 'fulfilled' && tg.value.ok });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false });
  }
});

app.listen(PORT, () => console.log(`[server] listening on http://localhost:${PORT}`));
