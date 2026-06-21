// Клавиатуры бота.
// Навигация – постоянная клавиатура внизу чата (reply keyboard): кнопки шлют свой текст.
// На самих сообщениях – единственная инлайн-кнопка «Открыть сайт». Эмодзи на кнопках не используем.
import { Keyboard, InlineKeyboard } from 'grammy';
import { SITE_URL } from './content.js';

// Подписи кнопок нижней навигации (они же приходят боту как текст сообщения).
export const NAV = {
  services: 'Услуги',
  process: 'Процесс',
  works: 'Работы',
  about: 'О студии',
  contacts: 'Контакты',
  brief: 'Обсудить проект',
};

// Кнопка отмены во время заполнения заявки.
export const CANCEL_LABEL = 'Отменить заявку';

// Постоянная нижняя навигация (3 ряда по 2 кнопки).
export function navKeyboard() {
  return new Keyboard()
    .text(NAV.services).text(NAV.process).row()
    .text(NAV.works).text(NAV.about).row()
    .text(NAV.contacts).text(NAV.brief).row()
    .resized()
    .persistent();
}

// Клавиатура на время брифа – только отмена.
export function cancelKeyboard() {
  return new Keyboard().text(CANCEL_LABEL).resized().persistent();
}

// Единственная инлайн-кнопка на сообщениях – открыть сайт.
export function siteButton() {
  return new InlineKeyboard().url('Открыть сайт', SITE_URL);
}
