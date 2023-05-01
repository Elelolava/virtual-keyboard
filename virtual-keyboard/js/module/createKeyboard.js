import { keys } from './keysArray.js';

const body = document.querySelector('body');
body.innerHTML = `
  <header class="header"><h1>Virtual Keyboard</h1></header>
  <main class="main">
    <textarea class="textarea" rows="5" cols="100" placeholder="Enter your text"></textarea>
    <div class="container">
      <div class="row"></div>
      <div class="row"></div>
      <div class="row"></div>
      <div class="row"></div>
      <div class="row"></div>
    </div>
    <div class="description">
      <p>Виртуальная клавиатура создана в ОС Windows</p>
      <p>Для смены языка (en/ru) нажмите последовательно левые Alt и Shift</p>
    </div>
  </main>
`;

export const html = document.querySelector('html');
const row = document.querySelectorAll('.row');
const keysObject = Object.entries(keys);
let localLang = localStorage.getItem('lang');
if (localLang) {
  html.setAttribute('lang', localLang);
} else {
  localLang = html.getAttribute('lang');
  localStorage.setItem('lang', localLang);
}

const createRow = (value) => {
  let innerRow;
  if (localLang == 'en') {
    innerRow = `
      <div class="key ${Object.keys(keys)[value]}">
      <span class="${Object.keys(keysObject[value][1])[1]} hidden">
          <span class="caseDown">${keysObject[value][1].rus.caseDown}</span>
          <span class="caseUp hidden">${keysObject[value][1].rus.caseUp}</span>
          <span class="caps hidden">${keysObject[value][1].rus.caps}</span>
          <span class="shiftCaps hidden">${keysObject[value][1].rus.shiftCaps}</span>
      </span>
      <span class="${Object.keys(keysObject[value][1])[0]}">
          <span class="caseDown">${keysObject[value][1].eng.caseDown}</span>
          <span class="caseUp hidden">${keysObject[value][1].eng.caseUp}</span>
          <span class="caps hidden">${keysObject[value][1].eng.caps}</span>
          <span class="shiftCaps hidden">${keysObject[value][1].eng.shiftCaps}</span>
      </span>
      </div>
    `;
  } else if (localLang == 'ru') {
    innerRow = `
      <div class="key ${Object.keys(keys)[value]}">
      <span class="${Object.keys(keysObject[value][1])[1]}">
          <span class="caseDown">${keysObject[value][1].rus.caseDown}</span>
          <span class="caseUp hidden">${keysObject[value][1].rus.caseUp}</span>
          <span class="caps hidden">${keysObject[value][1].rus.caps}</span>
          <span class="shiftCaps hidden">${keysObject[value][1].rus.shiftCaps}</span>
      </span>
      <span class="${Object.keys(keysObject[value][1])[0]} hidden">
          <span class="caseDown">${keysObject[value][1].eng.caseDown}</span>
          <span class="caseUp hidden">${keysObject[value][1].eng.caseUp}</span>
          <span class="caps hidden">${keysObject[value][1].eng.caps}</span>
          <span class="shiftCaps hidden">${keysObject[value][1].eng.shiftCaps}</span>
      </span>
      </div>
    `;
  }
  return innerRow;
};

const createRows = () => {
  for (let i = 0; i < 14; i++) {
    row[0].insertAdjacentHTML('beforeend', createRow(i));
  }
  
  for (let i = 14; i < 29; i++) {
    row[1].insertAdjacentHTML('beforeend', createRow(i));
  }
  
  for (let i = 29; i < 42; i++) {
    row[2].insertAdjacentHTML('beforeend', createRow(i));
  }
  
  for (let i = 42; i < 55; i++) {
    row[3].insertAdjacentHTML('beforeend', createRow(i));
  }
  
  for (let i = 55; i < 64; i++) {
    row[4].insertAdjacentHTML('beforeend', createRow(i));
  }
};
createRows();