// Vercel serverless function — принимает обновления от Telegram через webhook.
import { webhookCallback } from 'grammy';
import { bot, setCommands } from '../bot/src/bot.js';

// Регистрируем команды при холодном старте (один раз на экземпляр).
let ready = false;
async function ensureReady() {
  if (ready) return;
  await setCommands().catch((e) => console.error('[webhook] setMyCommands:', e?.message));
  ready = true;
}

const handle = webhookCallback(bot, 'http');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(200).send('Monolit bot webhook OK');
    return;
  }
  await ensureReady();
  return handle(req, res);
}
