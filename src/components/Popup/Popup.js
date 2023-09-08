export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
          }
    }

    open() {
        this._popup.classList.add('popup--opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose); 
        this._popup.classList.remove('popup--opened');
      }
    

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt)=> {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
              evt.preventDefault();
              this.close();
              }
          });
    }
}