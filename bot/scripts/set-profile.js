// Разовая утилита: задаёт описание бота (текст в пустом чате над START)
// и короткое описание. Тексты берутся из content.js. Запуск: node scripts/set-profile.js
import 'dotenv/config';
import { Bot } from 'grammy';
import { BOT_DESCRIPTION, BOT_SHORT_DESCRIPTION } from '../src/content.js';

const token = process.env.BOT_TOKEN;
if (!token) { console.error('Нет BOT_TOKEN в .env'); process.exit(1); }

const bot = new Bot(token);
await bot.api.setMyDescription(BOT_DESCRIPTION);
await bot.api.setMyShortDescription(BOT_SHORT_DESCRIPTION);

const d = await bot.api.getMyDescription();
const s = await bot.api.getMyShortDescription();
console.log('description:', JSON.stringify(d.description));
console.log('short_description:', JSON.stringify(s.short_description));
