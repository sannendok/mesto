export default class Popup {
    constructor(popupSelector) {
      this._popup = popupSelector;
      this._handleEscClose = this._handleEscClose.bind(this);
      this._buttonSubmit = this._popup.querySelector('.popup__button')
    };
  
    open() {
      this._popup.classList.add('popup_open');
      document.addEventListener('keydown', this._handleEscClose);
    };
  
    close() {
      this._popup.classList.remove('popup_open');
      document.removeEventListener('keydown', this._handleEscClose);
    };
  
    _handleEscClose(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    };

    renderLoading(isLoading, text){
      if (isLoading) {
        this._buttonSubmit.textContent = text
      } else {
        this._buttonSubmit.textContent = text
      }
    };

    setEventListeners() {
      this._popup.addEventListener('mousedown', e => {
        if (e.target.classList.contains('popup__close') || e.target === e.currentTarget) {
          this.close();
        }
      });
    }
  };