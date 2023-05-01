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
};

const someFunc = () => {
  console.log('It works!');
};

changeLanguage(someFunc, 'Alt', 'Shift');