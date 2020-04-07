import keys from './js/keys_data.js';

class keyboardClass {
  constructor() {
    this.enLang = true;
    this.shift = false;
    this.caps = false;
    this.keys = keys;
  }

  generateBaseStructure() {
    const body = document.querySelector('body');
    this.display = document.createElement('div');
    this.display.classList.add('display');
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');
    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('display__area');
    this.wrapper.appendChild(this.textarea);
    this.display.appendChild(this.wrapper);
    body.appendChild(this.display);
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    this.wrapperKeyboard = document.createElement('div');
    this.wrapperKeyboard.classList.add('wrapper');
    this.holder = document.createElement('div');
    this.holder.classList.add('keyboard__keys-holder');
    this.wrapperKeyboard.appendChild(this.holder);
    this.keyboard.appendChild(this.wrapperKeyboard);
    body.appendChild(this.keyboard);
    this.about = document.createElement('div');
    this.about.classList.add('about-keyboard');
    this.wrapperAbout = document.createElement('div');
    this.wrapperAbout.classList.add('wrapper');
    this.wrapperAbout.classList.add('about-keyboard__wrapper');
    this.wrapperAbout.innerHTML = '<p class="about-keyboard__text">Change language command: Alt Left + Space | RU/ENG</p><p class="about-keyboard__text">OS: Windows</p><p class="about-keyboard__text">Developer: ptatarsk</p>';
    this.about.appendChild(this.wrapperAbout);
    body.appendChild(this.about);
  }

  createKeys() {
    this.holder.querySelectorAll('div').forEach(el => {
        el.remove();
    })
    if (this.enLang = true && this.caps == false && this.shift == false) {
      this.value = this.keys.keysEn;
    } else if (this.enLang = true && (this.caps == true || this.shift == true)) {
      this.value = this.keys.keysEnCaps;
    } else if (this.enLang = false && this.caps == false && this.shift == false) {
      this.value = this.keys.keysRu;
    } else if (this.enLang = false && (this.caps == true || this.shift == true)) {
      this.value = this.keys.keysRuCaps;
    }

    for (let i = 0; i < this.keys.keysList.length; i += 1) {
      const key = document.createElement('div');
      key.classList.add('key');
      key.classList.add('keyboard__key');
      if (this.keys.keysList[i] == 8 || this.keys.keysList[i] == 20 || this.keys.keysList[i] == 3 || this.keys.keysList[i] == 16 || this.keys.keysList[i] == 13) {
        key.classList.add('key-big');
      } else if (this.keys.keysList[i] == 32) {
        key.classList.add('key-biggest');
      }
      key.innerText = this.value[i];
      key.setAttribute('id', this.keys.keysCode[i]);
      this.holder.appendChild(key);
    }
  }
  displayEvents(event) {
    if (event.target.textContent === 'Tab') {
        this.textarea.textContent += '    ';
    } else if (event.target.textContent === 'Backspace') {
        this.textarea.textContent = this.textarea.textContent.slice(0, -1);
    } else if  (event.target.textContent === 'Enter') {
        this.textarea.textContent += '\n';
    } else if (event.target.textContent === 'Space') {
        this.textarea.textContent += ' ';
    } else if (event.target.textContent === '←') {
        this.textarea.textContent += '←';
    } else if (event.target.textContent === '→') {
        this.textarea.textContent += '→';
    } else if (event.target.textContent === '↑') {
        this.textarea.textContent += '↑';
    } else if (event.target.textContent === '↓') {
        this.textarea.textContent += '↓';
    } else {
        this.textarea.textContent += event.target.textContent;
    }
  }
  keyboardEvents(event) {
    if (event.target.textContent === 'CapsLock') {
        if (this.caps == false) {
            this.caps = true;
        } else {
            this.caps = false;
        }
        this.createKeys();
    }
    if (event.target.textContent === 'Shift') {
        if (this.shift == false) {
            this.shift = true;
        } else {
            this.shift = false;
        }
        this.createKeys();
    }
  }
  addMouseEvents() {
    this.keyboard.addEventListener('mousedown', (event) => {
        if (event.target.className.includes('key ')) {
          event.target.classList.add('key-active');
        }
    });
    this.keyboard.addEventListener('mouseup', (event) => {
        event.target.classList.remove('key-active');
    });
      
    this.keyboard.addEventListener('mouseout', (event) => {
        event.target.classList.remove('key-active');
    });
    this.keyboard.addEventListener('click', (event) => {
        if (event.target.className.includes('key ')) {
            if (event.target.textContent === 'CapsLock' || event.target.textContent === 'Shift') {
                this.keyboardEvents(event);
            } else {
                this.displayEvents(event);
            }
        }
    });
  }

  addKeyboardEvents() {
        document.addEventListener('keydown', (event) => {
                event.preventDefault();
                const pressedKey = document.getElementById(event.code);
                if (pressedKey) {
                    pressedKey.classList.add('key-active');
                    if (pressedKey.textContent === 'RightAlt' && event.textContent == 'ControlLeft') {
                        if (this.enLang == true) {
                            this.enLang = false;
                        } else {
                            this.enLang = true;
                        }
                        this.createKeys();
                    }
                    if (pressedKey.textContent === 'CapsLock' || pressedKey.textContent === 'Shift') {
                        if (pressedKey.textContent === 'CapsLock') {
                            if (this.caps == false) {
                                this.caps = true;
                            } else {
                                this.caps = false;
                            }
                            this.createKeys();
                        }
                    } else {
                        if (pressedKey.textContent === 'Tab') {
                            this.textarea.textContent += '    ';
                        } else if (pressedKey.textContent === 'Backspace') {
                            this.textarea.textContent = this.textarea.textContent.slice(0, -1);
                        } else if  (pressedKey.textContent === 'Enter') {
                            this.textarea.textContent += '\n';
                        } else if (pressedKey.textContent === 'Space') {
                            this.textarea.textContent += ' ';
                        } else if (pressedKey.textContent === '←') {
                            this.textarea.textContent += '←';
                        } else if (pressedKey.textContent === '→') {
                            this.textarea.textContent += '→';
                        } else if (pressedKey.textContent === '↑') {
                            this.textarea.textContent += '↑';
                        } else if (pressedKey.textContent === '↓') {
                            this.textarea.textContent += '↓';
                        } else {
                            this.textarea.textContent += pressedKey.textContent;
                        }
                    }
                }   
        });

        document.addEventListener('keyup', (event) => {
            const key = document.getElementById(event.code);
            if (key) key.classList.remove('key-active');
        });
    }
}

window.onload = () => {
  const keyboard = new keyboardClass();
  keyboard.generateBaseStructure();
  keyboard.createKeys();
  keyboard.addMouseEvents();
  keyboard.addKeyboardEvents();
};
