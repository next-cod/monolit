// Telegram-бот студии «Монолит».
// Этот модуль только собирает бота и экспортирует его.
// Запуск polling → bot/src/main.js  |  Webhook (Vercel) → /api/webhook.js
import 'dotenv/config';
import { Bot, session, GrammyError, HttpError, InputFile } from 'grammy';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import {
  WELCOME, MENU_HINT, ABOUT, SERVICES_TEXT, PROCESS_TEXT, WORKS_TEXT, CONTACTS_TEXT,
  BRIEF_INTRO, BRIEF_QUESTIONS, BRIEF_DONE, BRIEF_CANCELLED, HELP, UNKNOWN_HINT,
  escapeHtml,
} from './content.js';
import {
  NAV, CANCEL_LABEL, navKeyboard, cancelKeyboard, siteButton,
} from './keyboards.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BANNER_LOCAL = join(__dirname, '../images/монолит баннер копия.jpg');
const SITE_URL = process.env.SITE_URL || '';

const DRYRUN = process.env.BOT_DRYRUN === '1';
const token = process.env.BOT_TOKEN || (DRYRUN ? '000000:DRYRUN_DUMMY_TOKEN' : null);
export const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || null;

if (!token) {
  throw new Error('[Монолит-бот] BOT_TOKEN не задан. Добавьте его в переменные окружения Vercel.');
}

export const bot = new Bot(token);

// --- Сессия: Upstash Redis (в облаке) или память (локально) ---
function initialSession() { return { step: null, brief: {} }; }

const sessionOpts = { initial: initialSession };

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const { Redis } = await import('@upstash/redis');
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    sessionOpts.storage = {
      async read(key) { const v = await redis.get(key); return v ?? undefined; },
      async write(key, value) { await redis.set(key, value, { ex: 86400 }); },
      async delete(key) { await redis.del(key); },
    };
    if (!DRYRUN) console.log('[Монолит-бот] Сессии: Upstash Redis');
  } catch (e) {
    if (!DRYRUN) console.warn('[Монолит-бот] Upstash недоступен, используем память:', e?.message);
  }
}

bot.use(session(sessionOpts));

const SEND_OPTS = {
  parse_mode: 'HTML',
  link_preview_options: { is_disabled: true },
};

// Баннер: скачиваем через fetch (работает и на Vercel и локально через URL).
// Telegram иногда не может сам скачать файл с Vercel CDN, поэтому отправляем как multipart.
async function getBanner() {
  try {
    const url = SITE_URL ? `${SITE_URL}/banner.jpg` : null;
    if (url) {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      return new InputFile(buf, 'banner.jpg');
    }
    return new InputFile(createReadStream(BANNER_LOCAL));
  } catch (e) {
    if (!DRYRUN) console.warn('[Монолит-бот] Баннер недоступен:', e?.message);
    return null;
  }
}

async function sendWelcome(ctx) {
  ctx.session.step = null;
  ctx.session.brief = {};
  const name = ctx.from?.first_name || '';
  const src = await getBanner();
  if (src) {
    try {
      await ctx.replyWithPhoto(src, { caption: WELCOME(name), parse_mode: 'HTML', reply_markup: siteButton() });
    } catch {
      // Фото не прошло – отправляем текст
      await ctx.reply(WELCOME(name), { ...SEND_OPTS, reply_markup: siteButton() });
    }
  } else {
    await ctx.reply(WELCOME(name), { ...SEND_OPTS, reply_markup: siteButton() });
  }
  await ctx.reply(MENU_HINT, { ...SEND_OPTS, reply_markup: navKeyboard() });
}

function sectionReply(ctx, text) {
  // Кнопку «Открыть сайт» показываем только в приветствии. Навигация — в нижнем меню.
  return ctx.reply(text, SEND_OPTS);
}

async function startBrief(ctx) {
  ctx.session.step = 'name';
  ctx.session.brief = {};
  await ctx.reply(`${BRIEF_INTRO}\n\n${BRIEF_QUESTIONS.name}`, { ...SEND_OPTS, reply_markup: cancelKeyboard() });
}

async function cancelBrief(ctx, msg = BRIEF_CANCELLED) {
  ctx.session.step = null;
  ctx.session.brief = {};
  await ctx.reply(msg, { ...SEND_OPTS, reply_markup: navKeyboard() });
}

async function forwardBrief(ctx, b) {
  if (!ADMIN_CHAT_ID) return;
  const u = ctx.from;
  const handle = u?.username ? `@${u.username}` : '–';
  const summary =
    `<b>Новая заявка ✦</b>\n\n` +
    `<b>Имя / компания:</b> ${escapeHtml(b.name)}\n` +
    `<b>Задача:</b> ${escapeHtml(b.task)}\n` +
    `<b>Контакт:</b> ${escapeHtml(b.contact)}\n\n` +
    `От: ${handle} (id ${u?.id})`;
  try {
    await bot.api.sendMessage(ADMIN_CHAT_ID, summary, SEND_OPTS);
  } catch (err) {
    console.error('[Монолит-бот] Не удалось переслать заявку:', err?.message);
  }
}

// --- Команды ---
bot.command('start', sendWelcome);
bot.command('menu', sendWelcome);
bot.command('help', (ctx) => sectionReply(ctx, HELP));
bot.command('contacts', (ctx) => sectionReply(ctx, CONTACTS_TEXT));
bot.command('brief', startBrief);
bot.command('cancel', async (ctx) => {
  if (ctx.session.step) await cancelBrief(ctx);
  else await ctx.reply('Сейчас нечего отменять. Откройте /menu.', { ...SEND_OPTS, reply_markup: navKeyboard() });
});

// --- Текстовые сообщения: нижняя навигация + ответы на бриф ---
bot.on('message:text', async (ctx) => {
  const text = ctx.message.text.trim();
  const step = ctx.session.step;

  if (step) {
    if (text === CANCEL_LABEL) { await cancelBrief(ctx); return; }
    if (text.startsWith('/')) {
      await ctx.reply(`Идёт оформление заявки. Ответьте на вопрос, нажмите «${CANCEL_LABEL}» или /cancel.`, SEND_OPTS);
      return;
    }
    if (text.length > 1500) { await ctx.reply('Слишком длинный ответ – попробуйте короче (до 1500 символов).', SEND_OPTS); return; }
    if (step === 'name') { ctx.session.brief.name = text; ctx.session.step = 'task'; await ctx.reply(BRIEF_QUESTIONS.task, SEND_OPTS); return; }
    if (step === 'task') { ctx.session.brief.task = text; ctx.session.step = 'contact'; await ctx.reply(BRIEF_QUESTIONS.contact, SEND_OPTS); return; }
    if (step === 'contact') {
      ctx.session.brief.contact = text;
      const b = ctx.session.brief;
      ctx.session.step = null; ctx.session.brief = {};
      await ctx.reply(BRIEF_DONE, { ...SEND_OPTS, reply_markup: navKeyboard() });
      await forwardBrief(ctx, b);
      return;
    }
    return;
  }

  switch (text) {
    case NAV.services: return sectionReply(ctx, SERVICES_TEXT);
    case NAV.process: return sectionReply(ctx, PROCESS_TEXT);
    case NAV.works: return sectionReply(ctx, WORKS_TEXT);
    case NAV.about: return sectionReply(ctx, ABOUT);
    case NAV.contacts: return sectionReply(ctx, CONTACTS_TEXT);
    case NAV.brief: return startBrief(ctx);
    default: break;
  }

  await ctx.reply(UNKNOWN_HINT, SEND_OPTS);
});

// Нетекстовые сообщения
bot.on('message', (ctx) => ctx.reply(UNKNOWN_HINT, SEND_OPTS));

// Совместимость со старыми инлайн-кнопками из истории чатов
bot.on('callback_query:data', async (ctx) => {
  const d = ctx.callbackQuery.data;
  await ctx.answerCallbackQuery();
  const map = { services: SERVICES_TEXT, process: PROCESS_TEXT, works: WORKS_TEXT, about: ABOUT, contacts: CONTACTS_TEXT };
  if (map[d]) return sectionReply(ctx, map[d]);
  if (d === 'brief') return startBrief(ctx);
  return sendWelcome(ctx);
});

// Глобальный перехват ошибок – логируем, НЕ бросаем (иначе grammy вернёт 500)
bot.catch((err) => {
  const ctx = err.ctx;
  const e = err.error;
  const where = ctx?.update?.update_id ?? '?';
  const chat = ctx?.chat?.id ?? '?';
  if (e instanceof GrammyError) {
    console.error(`[bot] GrammyError (update=${where}, chat=${chat}): ${e.description} | method=${e.method}`);
  } else if (e instanceof HttpError) {
    console.error(`[bot] HttpError (update=${where}):`, e.message);
  } else {
    console.error(`[bot] Error (update=${where}):`, e?.message ?? e);
  }
  // НЕ re-throw – grammy увидит handled error и вернёт 200
});

export async function setCommands() {
  await bot.api.setMyCommands([
    { command: 'start', description: 'Запустить бота' },
    { command: 'menu', description: 'Главное меню' },
    { command: 'brief', description: 'Обсудить проект' },
    { command: 'contacts', description: 'Контакты' },
    { command: 'help', description: 'Помощь' },
  ]);
}
