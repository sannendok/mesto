import { openPopup} from './index.js'


const cardPhoto = document.querySelector('.popup__card-photo');
const cardPhotoPlace = document.querySelector('.popup__card-place');
const popupImg = document.querySelector('.popup_type_card');

class Card {
    constructor(data, cardSelector) {
      this._cardName = data.name;
      this._cardPic = data.link;
      this._cardSelector = cardSelector;
    };
  
    _getTemplate() {
      const cardEl = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.elements__item')
        .cloneNode(true);
  
      return cardEl;
    };
  
    _addEventListeners() {
      this._element.querySelector('.elements__card-delete')
        .addEventListener('click', () => this._deleteCard());
  
      this._cardLikeButton = this._element.querySelector('.elements__card-like');
      this._popupImgBtn = this._element.querySelector('.elements__item-image');
  
      this._cardLikeButton.addEventListener('click', () => this._likeCard());
      this._popupImgBtn.addEventListener('click', () => this._openImg());
    };
  
    _deleteCard() {
      this._element.remove();
    };
  
    _likeCard() {
      this._cardLikeButton.classList.toggle('elements__card-like_active');
    };
    _openImg() {
  
      cardPhoto.src = this._cardPic;
      cardPhotoPlace.alt =  this._cardName;
      cardPhotoPlace.textContent =  this._cardName;
       openPopup(popupImg);
    };
    render() {
      this._element = this._getTemplate();
      this._element.querySelector('.elements__item-image').src = this._cardPic;
      this._element.querySelector('.elements__card-heading').textContent = this._cardName;
      this._addEventListeners();
  
      return this._element;
    };
  
  };
  export default Card;