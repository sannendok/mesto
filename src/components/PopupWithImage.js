import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__card-photo');
    this._name = this._popup.querySelector('.popup__card-place');
  };

  open(name, link) {
    super.open();
    this._image.src = link;
    this._name.textContent = name;
    this._image.alt = name;
    
  }
};