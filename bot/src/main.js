// Локальный запуск бота в режиме long-polling (для разработки на ПК).
// На Vercel используется /api/webhook.js
import 'dotenv/config';
import { bot, setCommands } from './bot.js';

setCommands().catch((e) => console.error('[Монолит-бот] setMyCommands:', e?.message));
bot.start({
  onStart: (info) => console.log(`[Монолит-бот] Запущен как @${info.username}`),
});
