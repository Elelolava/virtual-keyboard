import { textarea } from "./keysClicks.js";
import { html } from "./createKeyboard.js";

const container = document.querySelector('.container');

const changeLanguage = (func, ...keys) => {
  let pressed = new Set();
  let altString = 'Alt';
  let shiftString = 'Shift';

  container.addEventListener('mousedown', (e) => {
    if (e.target.textContent.includes(altString)) {
      pressed.add(altString);
    } else if (e.target.textContent.includes(shiftString)) {
      pressed.add(shiftString);
    }
    for (let key of keys) {
      if (!pressed.has(key)) {
        return;
      }
    }
    pressed.clear();
    func();
  });
  container.addEventListener('mouseup', () => pressed.delete(shiftString));

  textarea.addEventListener('keydown', (e) => {
    if (e.code == 'AltLeft') {
      pressed.add(altString);
    } else if (e.code == 'ShiftLeft') {
      pressed.add(shiftString);
    }
    for (let key of keys) {
      if (!pressed.has(key)) {
        return;
      }
    }
    pressed.clear();
    func();
  });
  textarea.addEventListener('keyup', () => pressed.delete(shiftString));
};

const rusEng = () => {
  const engArray = document.querySelectorAll('.eng');
  const rusArray = document.querySelectorAll('.rus');
  let storageLang = localStorage.getItem('lang');

  if (storageLang == 'en') {
    engArray.forEach(item => {
      item.classList.add('hidden');
    });
    rusArray.forEach(item => {
      item.classList.remove('hidden');
    });
    html.setAttribute('lang', 'ru');
    localStorage.setItem('lang', 'ru');
  }

  if (storageLang == 'ru') {
    rusArray.forEach(item => {
      item.classList.add('hidden');
    });
    engArray.forEach(item => {
      item.classList.remove('hidden');
    });
    html.setAttribute('lang', 'en');
    localStorage.setItem('lang', 'en');
  }
};

changeLanguage(rusEng, 'Alt', 'Shift');