// Локальная симуляция: прогоняем апдейты через бота, перехватывая вызовы Telegram API.
// Проверяет команды, кнопки и диалог заявки без сети и без токена.
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
  if (method === 'sendMessage' || method === 'editMessageText') {
    return { ok: true, result: { message_id: ++mid, date: 0, chat: { id: payload.chat_id || 0 }, text: payload.text } };
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
  ['click services', cb('services')],
  ['click process', cb('process')],
  ['click works', cb('works')],
  ['click about', cb('about')],
  ['click contacts', cb('contacts')],
  ['click menu', cb('menu')],
  ['click brief', cb('brief')],
  ['answer name', txt('Дима, кофейня «Тёплый»')],
  ['answer task', txt('Запускаем сеть спешелти-кофе, нужен нейминг и позиционирование')],
  ['answer contact', txt('@dima, +7 900 000-00-00')],
  ['/help', cmd('/help')],
  ['random text', txt('привет')],
  ['/cancel (nothing)', cmd('/cancel')],
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
    const t = (c.payload.text || '').replace(/\n/g, ' ').slice(0, 48);
    return `${c.method}${t ? ' «' + t + '…»' : ''}`;
  }).join(' | ') || '(no api call)';
  console.log(`✓ ${label.padEnd(20)} -> ${summary}`);
}

// Проверки
const adminMsgs = calls.filter((c) => c.method === 'sendMessage' && c.payload.chat_id === '999');
const briefDelivered = adminMsgs.some((c) => /Новая заявка/.test(c.payload.text || ''));
const answeredCbs = calls.filter((c) => c.method === 'answerCallbackQuery').length;

console.log('\n--- checks ---');
console.log('callbackQuery answered:', answeredCbs, '(ожидалось 7)');
console.log('заявка переслана админу:', briefDelivered);
console.log('ошибок выполнения:', errors.length);
if (errors.length) { console.log(errors.join('\n')); process.exit(1); }
if (!briefDelivered) { console.log('FAIL: заявка не доставлена администратору'); process.exit(1); }
if (answeredCbs !== 7) { console.log('FAIL: не все callback-кнопки подтверждены'); process.exit(1); }
console.log('\nALL OK');
