import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupDeleteButton = document.querySelector('.popup__remove-btn');
  }

  setConfirmHandler(handler) {
    this._confirmHandler = handler;
  }

  setEventListeners() {
    document.querySelector('.popup__remove-btn').addEventListener('submit', e => {
      e.preventDefault();
      // this._confirmHandler()
      this._popup.classList.remove('popup_open');
    })
    
    super.setEventListeners();
  }

}

