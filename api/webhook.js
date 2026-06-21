// Vercel serverless function — принимает обновления от Telegram через webhook.
import { webhookCallback } from 'grammy';
import { bot, setCommands } from '../bot/src/bot.js';

// Предзаполняем botInfo — grammy не будет вызывать getMe при каждом запросе.
bot.botInfo = {
  id: 8690154690,
  is_bot: true,
  first_name: 'Монолит – Студия бренд-стратегии',
  username: 'monolit_studio_bot',
  can_join_groups: true,
  can_read_all_group_messages: false,
  supports_inline_queries: false,
};

// Регистрируем команды один раз при холодном старте.
setCommands().catch((e) => console.error('[webhook] setMyCommands:', e?.message));

const handle = webhookCallback(bot, 'http');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(200).send('Monolit bot webhook OK');
    return;
  }
  return handle(req, res);
}
