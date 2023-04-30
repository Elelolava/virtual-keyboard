const keys = document.querySelectorAll('.key');
const textarea = document.querySelector('.textarea');


const cursorPosition = (n) => {
  textarea.setRangeText(n, textarea.selectionStart, textarea.selectionEnd, "end");
  textarea.focus();
};

const tabClicks = () => {
  let value = '\t';
  cursorPosition(value);
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
      tabClicks();

    } else if (keyText == 'Del') {
      let cutString = textarea.selectionStart == textarea.selectionEnd ? 
        textAreaContent.slice(textarea.selectionStart, textarea.selectionEnd+1) : 
        textAreaContent.slice(textarea.selectionStart, textarea.selectionEnd);
      let textAreaCutContent = textAreaContent.replace(cutString, '');
      textarea.value = textAreaCutContent;

    } else if (keyText == 'CapsLock') {
    } else if (keyText == 'Enter') {
    } else if (keyText == 'Shift') {
    } else if (keyText == 'Ctrl') {
    } else if (keyText == 'Alt') {
    } else if (keyText == 'Win') {
    } else {
      cursorPosition(keyText);
      textAreaContent += keyText;
    }
  });
});