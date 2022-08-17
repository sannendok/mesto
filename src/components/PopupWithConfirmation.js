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
    this._popupDeleteButton.addEventListener('click', e => {
      e.preventDefault();     
       this._confirmHandler()
    })
    
    super.setEventListeners();
  }

}

