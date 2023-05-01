export const keys = document.querySelectorAll('.key');
const textarea = document.querySelector('.textarea');

const cursorPosition = (n) => {
  textarea.setRangeText(n, textarea.selectionStart, textarea.selectionEnd, "end");
  textarea.focus();
};

textarea.addEventListener('keydown', (e) => {
  let keyCode = e.code.toLowerCase();
  keys.forEach(key => {
    key.classList.remove('key-active');
    let keyClass = key.className.slice(4).toLowerCase();
    if (keyCode == keyClass) {
      if (keyCode == 'tab') {
        e.preventDefault();
        tabClicks();
      }
      key.classList.add('key-active');
    }
  });
  setTimeout(() => {
    keys.forEach(key => key.classList.remove('key-active'))
  }, 500);
});

keys.forEach(key => {
  key.addEventListener('click', (e) => {
    e.preventDefault();
    textarea.focus();
    let textAreaContent = textarea.value;
    let keyText = key.children[1].children[0].textContent;

    if (keyText == 'Backspace') {
      let cutString = textarea.selectionStart == textarea.selectionEnd ? 
        textAreaContent.slice(textarea.selectionStart-1, textarea.selectionEnd) : 
        textAreaContent.slice(textarea.selectionStart, textarea.selectionEnd);
      let textAreaCutContent = textAreaContent.replace(cutString, '');
      textarea.value = textAreaCutContent;

    } else if (keyText == 'Tab') {
      let value = '\t';
      cursorPosition(value);

    } else if (keyText == 'Del') {
      let cutString = textarea.selectionStart == textarea.selectionEnd ? 
        textAreaContent.slice(textarea.selectionStart, textarea.selectionEnd+1) : 
        textAreaContent.slice(textarea.selectionStart, textarea.selectionEnd);
      let textAreaCutContent = textAreaContent.replace(cutString, '');
      textarea.value = textAreaCutContent;

    } else if (keyText == 'CapsLock') {
    } else if (keyText == 'Enter') {
      let value = '\n';
      cursorPosition(value);

    } else if (keyText == 'Shift') {
    } else if (keyText == 'Ctrl') {
    } else if (keyText == 'Alt') {
    } else if (keyText == 'Win') {
    } else if (keyText == '◄') {
      textarea.selectionStart -= 1;
      textarea.selectionEnd -= 1;

    } else if (keyText == '►') {
      textarea.selectionStart += 1;

    } else if (keyText == '▲') {
      let nextRowArray = Array.from([...textAreaContent].entries()).filter(i => i[1] == '\n').map(i => i[0]);
      let newArr = [];
      for (let i = 0; i < nextRowArray.length; i++) {
        newArr.push(textarea.selectionStart - nextRowArray[i]);
      }
      let index = newArr.filter(item => item > 0).length - 1;
      if (index !== -1) {
        textarea.selectionEnd = nextRowArray[index];
      }

    } else if (keyText == '▼') {
      let nextRowArray = Array.from([...textAreaContent].entries()).filter(i => i[1] == '\n').map(i => i[0]);
      let newArr = [];
      for (let i = 0; i < nextRowArray.length; i++) {
        newArr.push(nextRowArray[i] - textarea.selectionStart);
      }
      let index = newArr.filter(item => item >= 0);
      if (index !== -1 && index.length > 1) {
        textarea.selectionStart = nextRowArray[newArr.indexOf(index[1])];
      } else if (index.length == 1) {
        textarea.selectionStart = nextRowArray[newArr.indexOf(index[0])] + 1;
      } else {
        textarea.selectionStart = nextRowArray[nextRowArray.length - 1] + 1;
      }

    } else {
      cursorPosition(keyText);
      textAreaContent += keyText;
    }
  });
});