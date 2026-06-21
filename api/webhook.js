// Vercel serverless function – принимает обновления от Telegram через webhook.
import { bot, setCommands } from '../bot/src/bot.js';

// Предзаполняем botInfo – grammy не вызывает getMe при каждом запросе.
bot.botInfo = {
  id: 8690154690,
  is_bot: true,
  first_name: 'Монолит – Студия бренд-стратегии',
  username: 'monolit_studio_bot',
  can_join_groups: true,
  can_read_all_group_messages: false,
  supports_inline_queries: false,
};

let ready = false;
async function ensureReady() {
  if (ready) return;
  await setCommands().catch((e) => console.error('[webhook] setMyCommands:', e?.message));
  ready = true;
}

export default async function handler(req, res) {
  // GET – health-check (без раскрытия секретов)
  if (req.method !== 'POST') {
    const health = {
      ok: true,
      service: 'monolit-bot webhook',
      env: {
        bot_token: !!process.env.BOT_TOKEN,
        site_url: !!process.env.SITE_URL,
        upstash: !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN,
      },
    };
    try {
      const me = await bot.api.getMe();
      health.bot = { ok: true, username: me.username };
    } catch (e) {
      health.bot = { ok: false, error: e?.message };
    }
    res.status(200).json(health);
    return;
  }

  // POST – обработка обновления от Telegram
  let raw = '';
  for await (const chunk of req) raw += chunk;

  let update;
  try {
    update = JSON.parse(raw);
  } catch (e) {
    console.error('[webhook] JSON parse error:', e?.message);
    res.status(200).json({ ok: false, error: 'json_parse' });
    return;
  }

  try {
    await ensureReady();
    await bot.handleUpdate(update);
  } catch (e) {
    console.error('[webhook] handleUpdate error:', e?.message);
  }

  if (!res.headersSent) res.status(200).json({ ok: true });
}
