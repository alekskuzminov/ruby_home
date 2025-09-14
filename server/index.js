import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { config } from './config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Serve static files from public directory
app.use(express.static('public'));

// API routes

=======
>>>>>>> bfb04f52fcab94e7612dc965476f979ab1b8bd41
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


