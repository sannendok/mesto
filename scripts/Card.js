import { openPopup } from './index.js'
import { cardPhoto, cardPhotoPlace, cardPhotoOpen} from './utils/constants.js'

class Card {
  constructor(data, cardSelector) {
    this._cardName = data.name;
    this._cardPic = data.link;
    this._cardSelector = cardSelector;
  };

  _getTemplate() {
    const card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return card;
  };

  _addEventListeners() {
    this._element.querySelector('.elements__card-delete')
      .addEventListener('click', () => this._deleteCard());
    this._cardLikeButton = this._element.querySelector('.elements__card-like');
    this._cardLikeButton.addEventListener('click', () => this._likeCard());
    this._popupImageButton.addEventListener('click', () => this._openImage());
  };

  _deleteCard() {
    this._element.remove();
    this._element = null;
  };

  _likeCard() {
    this._cardLikeButton.classList.toggle('elements__card-like_active');
  };

  _openImage() {
    cardPhoto.src = this._cardPic;
    cardPhotoPlace.alt = this._cardName;
    cardPhotoPlace.textContent = this._cardName;
    openPopup(cardPhotoOpen);
  };

  render() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__item-image').src = this._cardPic;
    this._element.querySelector('.elements__card-heading').textContent = this._cardName;
    this._element.querySelector('.elements__item-image').alt = this._cardName;
    this._popupImageButton = this._element.querySelector('.elements__item-image');
    this._addEventListeners();

    return this._element;
  };
};

export default Card;