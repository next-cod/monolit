// Локальная симуляция: прогоняем апдейты через бота, перехватывая вызовы Telegram API.
// Проверяет команды, нижнюю навигацию (текстом), диалог заявки и совместимость —
// без сети и без токена.
process.env.BOT_DRYRUN = '1';
process.env.ADMIN_CHAT_ID = '999'; // чтобы проверить ветку пересылки заявки
const { bot } = await import('../src/bot.js');

bot.botInfo = {
  id: 42, is_bot: true, first_name: 'Монолит', username: 'monolit_studio_bot',
  can_join_groups: true, can_read_all_group_messages: false, supports_inline_queries: false,
};

const calls = [];
let mid = 100;
bot.api.config.use(async (_prev, method, payload) => {
  calls.push({ method, payload });
  if (method === 'sendMessage' || method === 'editMessageText' || method === 'sendPhoto') {
    return { ok: true, result: { message_id: ++mid, date: 0, chat: { id: payload.chat_id || 0 }, text: payload.text, caption: payload.caption } };
  }
  return { ok: true, result: true };
});

const USER = { id: 123, is_bot: false, first_name: 'Дима' };
const CHAT = { id: 123, type: 'private' };
let uid = 1;

function cmd(text) {
  return { update_id: uid++, message: { message_id: ++mid, date: 0, chat: CHAT, from: USER, text, entities: [{ type: 'bot_command', offset: 0, length: text.split(' ')[0].length }] } };
}
function txt(text) {
  return { update_id: uid++, message: { message_id: ++mid, date: 0, chat: CHAT, from: USER, text } };
}
function cb(data) {
  return { update_id: uid++, callback_query: { id: 'cq' + uid, from: USER, chat_instance: 'ci', data, message: { message_id: 50, date: 0, chat: CHAT, from: bot.botInfo, text: 'prev' } } };
}

const script = [
  ['/start', cmd('/start')],
  ['tap Услуги', txt('Услуги')],
  ['tap Процесс', txt('Процесс')],
  ['tap Работы', txt('Работы')],
  ['tap О студии', txt('О студии')],
  ['tap Контакты', txt('Контакты')],
  ['tap Обсудить проект', txt('Обсудить проект')],
  ['answer name', txt('Дима, кофейня «Тёплый»')],
  ['answer task', txt('Запускаем сеть спешелти-кофе, нужен нейминг и позиционирование')],
  ['answer contact', txt('@dima, +7 900 000-00-00')],
  ['/brief', cmd('/brief')],
  ['cancel by button', txt('Отменить заявку')],
  ['/help', cmd('/help')],
  ['/contacts', cmd('/contacts')],
  ['random text', txt('привет')],
  ['/menu', cmd('/menu')],
  ['/cancel (nothing)', cmd('/cancel')],
  ['legacy cb services', cb('services')],
];

const errors = [];
for (const [label, upd] of script) {
  const before = calls.length;
  try {
    await bot.handleUpdate(upd);
  } catch (e) {
    errors.push(`${label}: THREW ${e?.message}`);
    continue;
  }
  const made = calls.slice(before);
  const summary = made.map((c) => {
    const t = (c.payload.text || c.payload.caption || '').replace(/\n/g, ' ').slice(0, 44);
    const kb = c.payload.reply_markup?.keyboard ? ' +нижнее-меню'
      : c.payload.reply_markup?.inline_keyboard ? ' +инлайн' : '';
    return `${c.method}${t ? ' «' + t + '…»' : ''}${kb}`;
  }).join(' | ') || '(no api call)';
  console.log(`✓ ${label.padEnd(22)} -> ${summary}`);
}

// --- Проверки ---
const EMOJI = /\p{Extended_Pictographic}/u;

// 1) заявка переслана админу
const adminMsgs = calls.filter((c) => c.method === 'sendMessage' && c.payload.chat_id === '999');
const briefDelivered = adminMsgs.some((c) => /Новая заявка/.test(c.payload.text || ''));

// 2) /start: отправлен баннер (sendPhoto) и включено нижнее меню (reply keyboard)
const bannerSent = calls.some((c) => c.method === 'sendPhoto');
const navKeyboards = calls.filter((c) => Array.isArray(c.payload.reply_markup?.keyboard));
const navSet = navKeyboards.length > 0;

// 3) нижнее меню без эмодзи на кнопках
const navButtons = navKeyboards.flatMap((c) => c.payload.reply_markup.keyboard.flat().map((b) => (typeof b === 'string' ? b : b.text)));
const navHasEmoji = navButtons.some((t) => EMOJI.test(t));

// 4) на сообщениях-разделах единственная инлайн-кнопка — «Открыть сайт» (url)
const inlineMsgs = calls.filter((c) => Array.isArray(c.payload.reply_markup?.inline_keyboard));
const siteOnly = inlineMsgs.every((c) => {
  const rows = c.payload.reply_markup.inline_keyboard;
  const btns = rows.flat();
  return btns.length === 1 && btns[0].text === 'Открыть сайт' && typeof btns[0].url === 'string';
});

// 5) совместимость со старыми callback-кнопками
const answeredCbs = calls.filter((c) => c.method === 'answerCallbackQuery').length;

console.log('\n--- checks ---');
console.log('заявка переслана админу:      ', briefDelivered);
console.log('баннер отправлен на /start:    ', bannerSent);
console.log('нижнее меню включено:          ', navSet, `(сообщений с ним: ${navKeyboards.length})`);
console.log('кнопки меню без эмодзи:        ', !navHasEmoji, `[${[...new Set(navButtons)].join(', ')}]`);
console.log('инлайн = только «Открыть сайт»:', siteOnly, `(таких сообщений: ${inlineMsgs.length})`);
console.log('старые callback подтверждены:  ', answeredCbs, '(ожидалось 1)');
console.log('ошибок выполнения:             ', errors.length);

const fails = [];
if (errors.length) fails.push('исключения: ' + errors.join(' | '));
if (!briefDelivered) fails.push('заявка не доставлена администратору');
if (!bannerSent) fails.push('баннер не отправлен');
if (!navSet) fails.push('нижнее меню не включено');
if (navHasEmoji) fails.push('на кнопках меню есть эмодзи');
if (!siteOnly) fails.push('на сообщении есть лишние инлайн-кнопки');
if (answeredCbs !== 1) fails.push('старый callback не подтверждён');

if (fails.length) { console.log('\nFAIL:\n- ' + fails.join('\n- ')); process.exit(1); }
console.log('\nALL OK');
