// Инлайн-клавиатуры бота. На кнопках эмодзи не используем — только текст.
import { InlineKeyboard } from 'grammy';
import { SITE_URL, CONTACTS } from './content.js';

export function mainMenu() {
  return new InlineKeyboard()
    .text('Услуги', 'services')
    .text('Процесс', 'process')
    .row()
    .text('Работы', 'works')
    .text('О студии', 'about')
    .row()
    .text('Обсудить проект', 'brief')
    .row()
    .text('Контакты', 'contacts')
    .row()
    .url('Открыть сайт', SITE_URL);
}

// Клавиатура для внутренних разделов: действие + назад.
export function sectionMenu() {
  return new InlineKeyboard()
    .text('Обсудить проект', 'brief')
    .row()
    .text('Назад в меню', 'menu');
}

export function backMenu() {
  return new InlineKeyboard().text('Назад в меню', 'menu');
}

export function contactsMenu() {
  return new InlineKeyboard()
    .url('Написать на почту', `mailto:${CONTACTS.email}`)
    .row()
    .text('Обсудить проект', 'brief')
    .row()
    .text('Назад в меню', 'menu');
}

export function afterBriefMenu() {
  return new InlineKeyboard()
    .url('Открыть сайт', SITE_URL)
    .row()
    .text('В меню', 'menu');
}
