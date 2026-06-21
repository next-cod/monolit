// Telegram-бот студии «Монолит».
// Запуск: BOT_TOKEN=... node src/bot.js   (см. README.md)
import 'dotenv/config';
import { Bot, session, GrammyError, HttpError } from 'grammy';
import {
  WELCOME, ABOUT, SERVICES_TEXT, PROCESS_TEXT, WORKS_TEXT, CONTACTS_TEXT,
  BRIEF_INTRO, BRIEF_QUESTIONS, BRIEF_DONE, BRIEF_CANCELLED, HELP, UNKNOWN_HINT,
  escapeHtml,
} from './content.js';
import {
  mainMenu, sectionMenu, backMenu, contactsMenu, afterBriefMenu,
} from './keyboards.js';

const DRYRUN = process.env.BOT_DRYRUN === '1';
const token = process.env.BOT_TOKEN || (DRYRUN ? '000000:DRYRUN_DUMMY_TOKEN' : null);
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || null; // куда пересылать заявки (необязательно)

if (!token) {
  console.error('[Монолит-бот] Не задан BOT_TOKEN. Создайте бота у @BotFather и укажите токен в .env');
  process.exit(1);
}

const bot = new Bot(token);

// --- Сессия для диалога заявки ---
function initialSession() {
  return { step: null, brief: {} };
}
bot.use(session({ initial: initialSession }));

const SEND_OPTS = {
  parse_mode: 'HTML',
  link_preview_options: { is_disabled: true },
};

// Безопасно показать раздел: пробуем отредактировать текущее сообщение,
// если не получается (старое сообщение / тот же текст) — отправляем новое.
async function showSection(ctx, text, keyboard) {
  const opts = { ...SEND_OPTS, reply_markup: keyboard };
  try {
    if (ctx.callbackQuery) {
      await ctx.editMessageText(text, opts);
      return;
    }
  } catch (err) {
    if (!(err instanceof GrammyError && err.description.includes('message is not modified'))) {
      // не критично — просто отправим новое сообщение ниже
    } else {
      return; // тот же контент — ничего не делаем
    }
  }
  await ctx.reply(text, opts);
}

async function startBrief(ctx) {
  ctx.session.step = 'name';
  ctx.session.brief = {};
  await ctx.reply(`${BRIEF_INTRO}\n\n${BRIEF_QUESTIONS.name}`, SEND_OPTS);
}

// --- Команды ---
bot.command('start', async (ctx) => {
  ctx.session.step = null;
  const name = ctx.from?.first_name || '';
  await ctx.reply(WELCOME(name), { ...SEND_OPTS, reply_markup: mainMenu() });
});

bot.command('menu', async (ctx) => {
  ctx.session.step = null;
  await ctx.reply(WELCOME(ctx.from?.first_name || ''), { ...SEND_OPTS, reply_markup: mainMenu() });
});

bot.command('help', (ctx) => ctx.reply(HELP, { ...SEND_OPTS, reply_markup: backMenu() }));

bot.command('contacts', (ctx) => ctx.reply(CONTACTS_TEXT, { ...SEND_OPTS, reply_markup: contactsMenu() }));

bot.command('brief', (ctx) => startBrief(ctx));

bot.command('cancel', async (ctx) => {
  if (ctx.session.step) {
    ctx.session.step = null;
    ctx.session.brief = {};
    await ctx.reply(BRIEF_CANCELLED, { ...SEND_OPTS, reply_markup: mainMenu() });
  } else {
    await ctx.reply('Сейчас нечего отменять. Откройте /menu.', { ...SEND_OPTS, reply_markup: mainMenu() });
  }
});

// --- Кнопки меню ---
bot.callbackQuery('menu', async (ctx) => {
  ctx.session.step = null;
  await ctx.answerCallbackQuery();
  await showSection(ctx, WELCOME(ctx.from?.first_name || ''), mainMenu());
});

bot.callbackQuery('services', async (ctx) => {
  await ctx.answerCallbackQuery();
  await showSection(ctx, SERVICES_TEXT, sectionMenu());
});

bot.callbackQuery('process', async (ctx) => {
  await ctx.answerCallbackQuery();
  await showSection(ctx, PROCESS_TEXT, sectionMenu());
});

bot.callbackQuery('works', async (ctx) => {
  await ctx.answerCallbackQuery();
  await showSection(ctx, WORKS_TEXT, sectionMenu());
});

bot.callbackQuery('about', async (ctx) => {
  await ctx.answerCallbackQuery();
  await showSection(ctx, ABOUT, sectionMenu());
});

bot.callbackQuery('contacts', async (ctx) => {
  await ctx.answerCallbackQuery();
  await showSection(ctx, CONTACTS_TEXT, contactsMenu());
});

bot.callbackQuery('brief', async (ctx) => {
  await ctx.answerCallbackQuery();
  await startBrief(ctx);
});

// --- Диалог заявки (текстовые ответы) ---
bot.on('message:text', async (ctx) => {
  const text = ctx.message.text.trim();
  const step = ctx.session.step;

  // Команды, не пойманные выше (например /foo) — не считаем ответами на бриф.
  if (text.startsWith('/')) {
    if (step) {
      await ctx.reply('Идёт оформление заявки. Ответьте на вопрос или отмените через /cancel.', SEND_OPTS);
    } else {
      await ctx.reply(UNKNOWN_HINT, { ...SEND_OPTS, reply_markup: mainMenu() });
    }
    return;
  }

  if (!step) {
    await ctx.reply(UNKNOWN_HINT, { ...SEND_OPTS, reply_markup: mainMenu() });
    return;
  }

  if (text.length > 1500) {
    await ctx.reply('Слишком длинный ответ — попробуйте короче (до 1500 символов).', SEND_OPTS);
    return;
  }

  if (step === 'name') {
    ctx.session.brief.name = text;
    ctx.session.step = 'task';
    await ctx.reply(BRIEF_QUESTIONS.task, SEND_OPTS);
    return;
  }
  if (step === 'task') {
    ctx.session.brief.task = text;
    ctx.session.step = 'contact';
    await ctx.reply(BRIEF_QUESTIONS.contact, SEND_OPTS);
    return;
  }
  if (step === 'contact') {
    ctx.session.brief.contact = text;
    const b = ctx.session.brief;
    ctx.session.step = null;
    ctx.session.brief = {};

    await ctx.reply(BRIEF_DONE, { ...SEND_OPTS, reply_markup: afterBriefMenu() });

    if (ADMIN_CHAT_ID) {
      const u = ctx.from;
      const handle = u?.username ? `@${u.username}` : '—';
      const summary =
        `<b>Новая заявка ✦</b>\n\n` +
        `<b>Имя / компания:</b> ${escapeHtml(b.name)}\n` +
        `<b>Задача:</b> ${escapeHtml(b.task)}\n` +
        `<b>Контакт:</b> ${escapeHtml(b.contact)}\n\n` +
        `От: ${handle} (id ${u?.id})`;
      try {
        await bot.api.sendMessage(ADMIN_CHAT_ID, summary, SEND_OPTS);
      } catch (err) {
        console.error('[Монолит-бот] Не удалось переслать заявку администратору:', err?.message);
      }
    }
    return;
  }
});

// На прочие типы сообщений (стикеры, фото и т.п.) — мягкая подсказка.
bot.on('message', (ctx) => ctx.reply(UNKNOWN_HINT, { ...SEND_OPTS, reply_markup: mainMenu() }));

// --- Глобальная обработка ошибок, чтобы бот не падал ---
bot.catch((err) => {
  const ctx = err.ctx;
  const e = err.error;
  const where = ctx?.update?.update_id ?? '?';
  if (e instanceof GrammyError) {
    console.error(`[Монолит-бот] Ошибка запроса к Telegram (update ${where}):`, e.description);
  } else if (e instanceof HttpError) {
    console.error(`[Монолит-бот] Сетевая ошибка (update ${where}):`, e);
  } else {
    console.error(`[Монолит-бот] Непредвиденная ошибка (update ${where}):`, e);
  }
});

async function setCommands() {
  await bot.api.setMyCommands([
    { command: 'start', description: 'Запустить бота' },
    { command: 'menu', description: 'Главное меню' },
    { command: 'brief', description: 'Обсудить проект' },
    { command: 'contacts', description: 'Контакты' },
    { command: 'help', description: 'Помощь' },
  ]);
}

if (DRYRUN) {
  console.log('[Монолит-бот] Dry run: модуль загружен, обработчики зарегистрированы. Запуск пропущен.');
} else {
  setCommands().catch((e) => console.error('[Монолит-бот] setMyCommands:', e?.message));
  bot.start({
    onStart: (info) => console.log(`[Монолит-бот] Запущен как @${info.username}`),
  });
}

export { bot };
