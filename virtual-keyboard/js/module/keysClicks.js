const html = document.querySelector('html');
const keys = document.querySelectorAll('.key');
const textarea = document.querySelector('.textarea');

const cursorPosition = (n) => {
  textarea.setRangeText(n, textarea.selectionStart, textarea.selectionEnd, 'end');
  textarea.focus();
};

const tabClicks = () => {
  const textAreaContent = textarea.value;
  const position = textarea.selectionStart;
  const tab = '\t';
  textarea.value = textAreaContent.slice(0, position) + tab + textAreaContent.slice(position);
};

textarea.addEventListener('keydown', (e) => {
  const keyCode = e.code.toLowerCase();
  keys.forEach((key) => {
    key.classList.remove('key-active');
    const keyClass = key.className.slice(4).toLowerCase();
    if (keyCode === keyClass) {
      if (keyCode === 'tab') {
        e.preventDefault();
        tabClicks();
      }
      key.classList.add('key-active');
    }
  });
  setTimeout(() => {
    keys.forEach((key) => key.classList.remove('key-active'));
  }, 500);
});

keys.forEach((key) => {
  key.addEventListener('click', (e) => {
    e.preventDefault();
    textarea.focus();
    let textAreaContent = textarea.value;
    let keyText;
    const localLang = html.getAttribute('lang');
    if (localLang === 'en') {
      keyText = key.children[1].children[0].textContent;
    } else if (localLang === 'ru') {
      keyText = key.children[0].children[0].textContent;
    }

    if (keyText === 'Backspace') {
      const cutString = textarea.selectionStart === textarea.selectionEnd
        ? textAreaContent.slice(textarea.selectionStart - 1, textarea.selectionEnd)
        : textAreaContent.slice(textarea.selectionStart, textarea.selectionEnd);
      const textAreaCutContent = textAreaContent.replace(cutString, '');
      textarea.value = textAreaCutContent;
    } else if (keyText === 'Tab') {
      const value = '\t';
      cursorPosition(value);
    } else if (keyText === 'Del') {
      const cutString = textarea.selectionStart === textarea.selectionEnd
        ? textAreaContent.slice(textarea.selectionStart, textarea.selectionEnd + 1)
        : textAreaContent.slice(textarea.selectionStart, textarea.selectionEnd);
      const textAreaCutContent = textAreaContent.replace(cutString, '');
      textarea.value = textAreaCutContent;
    } else if (keyText === 'Enter') {
      const value = '\n';
      cursorPosition(value);
    } else if (keyText === '◄') {
      textarea.selectionStart -= 1;
      textarea.selectionEnd -= 1;
    } else if (keyText === '►') {
      textarea.selectionStart += 1;
    } else if (keyText === '▲') {
      const nextRowArray = Array.from([...textAreaContent].entries()).filter((i) => i[1] === '\n').map((i) => i[0]);
      const newArr = [];
      for (let i = 0; i < nextRowArray.length; i += 1) {
        newArr.push(textarea.selectionStart - nextRowArray[i]);
      }
      const index = newArr.filter((item) => item > 0).length - 1;
      if (index !== -1) {
        textarea.selectionEnd = nextRowArray[index];
      }
    } else if (keyText === '▼') {
      const nextRowArray = Array.from([...textAreaContent].entries()).filter((i) => i[1] === '\n').map((i) => i[0]);
      const newArr = [];
      for (let i = 0; i < nextRowArray.length; i += 1) {
        newArr.push(nextRowArray[i] - textarea.selectionStart);
      }
      const index = newArr.filter((item) => item >= 0);
      if (index !== -1 && index.length > 1) {
        textarea.selectionStart = nextRowArray[newArr.indexOf(index[1])];
      } else if (index.length === 1) {
        textarea.selectionStart = nextRowArray[newArr.indexOf(index[0])] + 1;
      } else {
        textarea.selectionStart = nextRowArray[nextRowArray.length - 1] + 1;
      }
    } else if (keyText === 'CapsLock'
              || keyText === 'Shift'
              || keyText === 'Ctrl'
              || keyText === 'Alt'
              || keyText === 'Win') {
      textAreaContent = textarea.value;
    } else {
      cursorPosition(keyText);
      textAreaContent += keyText;
    }
  });
});
