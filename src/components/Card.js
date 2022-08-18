class Card {
  constructor(data, cardSelector, handleCardClick, { handleDeleteCard }, handlePutLike, handleDeleteLike, userId) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
    this._likes = data.likes;
    this._cardId = data._id
    this._ownerId = data.owner._id;
    this._userId = userId;
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
    this._deleteIcon.addEventListener('click', () => this._handleDeleteCard(this._cardId));
    //this._cardLikeButton = this._element.querySelector('.elements__card-like');
    //this._cardLikeButton.addEventListener('click', () => this._likeCard());
    this._element.querySelector('.elements__item-image').addEventListener('click', () => this._handleCardClick(this._data.name, this._data.link));
    this._cardLikeButton.addEventListener('click', () => {
      if (this._cardLikeButton.classList.contains('elements__card-like_active')) {
        this._handleDeleteLike(this)
      } else {
        this._handlePutLike(this)
      }
    })
  };

  deleteCard() {
    this._element.remove();
    this._element = null
  }

  countLikes(likes) {
    this._likeCounter = this._element.querySelector('.elements__card-like-counter')
    if (likes.length) {
      this._likeCounter.textContent = likes.length;
    } else {
      this._likeCounter.textContent = '';
    }
  }

  putLike() {
    this._cardLikeButton.classList.add('elements__card-like_active')
  }

  deleteLike() {
    this._cardLikeButton.classList.remove('elements__card-like_active')
  }

  _checkLike() {
    this._likes.forEach((item) => {
      if (item._id === this._userId) {
        this._cardLikeButton.classList.add('elements__card-like_active');
      }
    })
  }
  _whoseCard() {
    if (this._ownerId !== this._userId) {
      this._deleteIcon.remove();
    }
  }

  render() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__item-image').src = this._data.link;
    this._element.querySelector('.elements__card-heading').textContent = this._data.name;
    this._element.querySelector('.elements__item-image').alt = this._data.name;
    this._popupImageButton = this._element.querySelector('.elements__item-image');
    this._deleteIcon = this._element.querySelector('.elements__card-delete');
    this._cardLikeButton = this._element.querySelector('.elements__card-like');

    this._checkLike();
    this.countLikes(this._likes);
    this._whoseCard();
    this._addEventListeners();

    return this._element;
  };
};

export default Card;