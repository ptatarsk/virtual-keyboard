import keys from './js/keys_data.js';

class KeyboardClass {
    constructor() {
        this.enLang = localStorage.getItem('lang') || 'en';
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
        this.wrapperAbout.innerHTML = '<p class="about-keyboard__text">Change language command: AltLeft + ControlLeft | RU/ENG</p><p class="about-keyboard__text">OS: Windows</p><p class="about-keyboard__text">Developer: ptatarsk</p>';
        this.about.appendChild(this.wrapperAbout);
        body.appendChild(this.about);
    }

    createKeys() {
        this.holder.querySelectorAll('div').forEach((el) => {
            el.remove();
        });
        if (this.enLang === 'en' && this.caps === false && this.shift === false) {
            this.value = this.keys.keysEn;
        } else if (this.enLang === 'en' && (this.caps === true || this.shift === true)) {
            this.value = this.keys.keysEnCaps;
        } else if (this.enLang === 'ru' && this.caps === false && this.shift === false) {
            this.value = this.keys.keysRu;
        } else if (this.enLang === 'ru' && (this.caps === true || this.shift === true)) {
            this.value = this.keys.keysRuCaps;
        }
        for (let i = 0; i < this.keys.keyList.length; i += 1) {
            const key = document.createElement('div');
            key.classList.add('key');
            key.classList.add('keyboard__key');
            if (this.keys.keyList[i] === 8 || this.keys.keyList[i] === 20 || this.keys.keyList[i] === 3) {
                key.classList.add('key-big');
            } else if (this.keys.keyList[i] === 16 || this.keys.keyList[i] === 13) {
                key.classList.add('key-big');
            } else if (this.keys.keyList[i] === 32) {
                key.classList.add('key-biggest');
            }
            if (this.keys.keyList[i] === 32) {
                key.innerText = '';
            } else {
                key.innerText = this.value[i];
            }
            key.setAttribute('id', this.keys.keysCode[i]);
            this.holder.appendChild(key);
        }
        if (this.shift === true) {
            this.left = document.getElementById('ShiftLeft');
            this.right = document.getElementById('ShiftRight');
            if (event.target.id === 'ShiftLeft' || event.code === 'ShiftLeft') {
                this.left.classList.add('key-active');
            } else if (event.target.id === 'ShiftRight' || event.code === 'ShiftRight') {
                this.right.classList.add('key-active');
            }
        }
        if (this.caps === true) {
            this.capslock = document.getElementById('CapsLock');
            if (!this.capslock.className.includes('key-active')) {
                this.capslock.classList.add('key-active');
            }
        } else {
            this.capslock = document.getElementById('CapsLock');
            if (this.capslock.className.includes('key-active')) {
                this.capslock.classList.toggle('key-active');
            }
        }
    }

    displayMouseEvents(event) {
        if (event.target.id === 'Tab') {
            this.textarea.textContent += '    ';
        } else if (event.target.id === 'Backspace') {
            this.textarea.textContent = this.textarea.textContent.slice(0, -1);
        } else if (event.target.id === 'Enter') {
            this.textarea.textContent += '\n';
        } else if (event.target.id === 'Space') {
            this.textarea.textContent += ' ';
        } else if (event.target.id === 'ArrowLeft') {
            this.textarea.textContent += '←';
        } else if (event.target.id === 'ArrowRight') {
            this.textarea.textContent += '→';
        } else if (event.target.id === 'ArrowUp') {
            this.textarea.textContent += '↑';
        } else if (event.target.id === 'ArrowDown') {
            this.textarea.textContent += '↓';
        } else {
            this.textarea.textContent += event.target.textContent;
        }
    }

    displayKeyboardEvents(event) {
        if (event.code === 'Tab') {
            this.textarea.textContent += '    ';
        } else if (event.code === 'Backspace') {
            this.textarea.textContent = this.textarea.textContent.slice(0, -1);
        } else if (event.code === 'Enter') {
            this.textarea.textContent += '\n';
        } else if (event.code === 'Space') {
            this.textarea.textContent += ' ';
        } else if (event.code === 'ArrowLeft') {
            this.textarea.textContent += '←';
        } else if (event.code === 'ArrowRight') {
            this.textarea.textContent += '→';
        } else if (event.code === 'ArrowUp') {
            this.textarea.textContent += '↑';
        } else if (event.code === 'ArrowDown') {
            this.textarea.textContent += '↓';
        } else {
            const key = document.getElementById(event.code);
            this.textarea.textContent += key.textContent;
        }
    }

    keyboardKeyEvents(event) {
        if (event.code === 'CapsLock') {
            this.caps = !this.caps;
            this.createKeys();
        }
    }

    keyboardMouseEvents(event) {
        if (event.target.id === 'CapsLock') {
            this.caps = !this.caps;
            this.createKeys();
        }
    }

    addMouseEvents() {
        this.keyboard.addEventListener('mousedown', (event) => {
            if (event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') {
                this.shift = true;
                this.createKeys();
            } else if (event.target.className.includes('key ')) {
                if (event.target.id === 'CapsLock') {
                    this.keyboardMouseEvents(event);
                } else {
                    this.displayMouseEvents(event);
                }
            }
            if (event.target.className.includes('key ')) {
                event.target.classList.add('key-active');
            }
        });
        this.keyboard.addEventListener('mouseup', (event) => {
            event.target.classList.remove('key-active');
            this.shift = false;
            this.createKeys();
        });
    }

    addKeyboardEvents() {
        document.addEventListener('keydown', (event) => {
            event.preventDefault();
            let pressed = document.getElementById(event.code);

            if (pressed) {
                pressed.classList.add('key-active');
                if (pressed.id === 'ShiftLeft' || pressed.id === 'ShiftRight') {
                    this.shift = true;
                    this.createKeys();
                } else if (pressed.id === 'CapsLock') {
                    this.keyboardKeyEvents(event);
                } else if ((pressed.id === 'AltLeft' && event.ctrlKey) || (event.altKey && pressed.id === 'ControlLeft')) {
                    if (this.enLang === 'ru') {
                        localStorage.setItem('lang', 'en');
                        this.enLang = 'en';
                    } else {
                        localStorage.setItem('lang', 'ru');
                        this.enLang = 'ru';
                    }
                    this.createKeys();
                } else {
                    this.displayKeyboardEvents(event);
                }
            }
        });

        document.addEventListener('keyup', (event) => {
            const pressed = document.getElementById(event.code);
            if (pressed) {
                pressed.classList.remove('key-active');
            }
            if (pressed.id === 'ShiftLeft' || pressed.id === 'ShiftRight') {
                this.shift = false;
            }
            this.createKeys();
        });
    }
}

window.onload = () => {
    const keyboard = new KeyboardClass();
    keyboard.generateBaseStructure();
    keyboard.createKeys();
    keyboard.addMouseEvents();
    keyboard.addKeyboardEvents();
};