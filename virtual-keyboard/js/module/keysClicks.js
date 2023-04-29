const keys = document.querySelectorAll('.key');
const textarea = document.querySelector('.textarea');


textarea.addEventListener('keydown', (e) => {
  let keyCode = e.code.toLowerCase();
  keys.forEach(key => {
    key.classList.remove('key-active');
    let keyClass = key.className.slice(4).toLowerCase();
    if (keyCode == keyClass) {
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
    let textAreaContent = textarea.value;
    let keyText = key.children[1].children[0].textContent;

    if (keyText == 'Backspace') {
      let textAreaCutContent = textAreaContent.slice(0, -1);
      textarea.value = textAreaCutContent;
    } else if (keyText == 'Tab') {
    } else if (keyText == 'Del') {
    } else if (keyText == 'CapsLock') {
    } else if (keyText == 'Enter') {
    } else if (keyText == 'Shift') {
    } else if (keyText == 'Ctrl') {
    } else if (keyText == 'Alt') {
    } else if (keyText == 'Win') {
    } else {
      textAreaContent += keyText;
      textarea.value = textAreaContent;
    }
  });
});