const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupCard = document.querySelector('.card-popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupOpenAdd = document.querySelector('.profile__add-button')
const popupCloseButton = document.querySelector('.popup__close')
const popInputName = document.querySelector('.popup__input_value_name');
const popInputDescription = document.querySelector('.popup__input_value_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const cardConteiner = document.querySelector('.elements__list');
const buttonAddCard = document.querySelector('.add-card-button');
const popInputPlace = document.querySelector('.popup__input_value_place');
const popInputLink = document.querySelector('.popup__input_value_link');
const popupImg = document.querySelector('.popup_type_card');
const cardPhoto = document.querySelector('.popup__card-photo');



const openPopup = (elem) => {
  elem.classList.add('popup_open');
  document.addEventListener('keydown', keyEscHandler);
};
const close = (elem) => {
  elem.classList.remove('popup_open');
  document.removeEventListener('keydown', keyEscHandler);
};
const getInfoProf = () => {
  popInputName.value = profileName.textContent;
  popInputDescription.value = profileDescription.textContent;
};
//Добавляем картинки при загрузке
function createCard(item) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const popupImgBtn = cardElement.querySelector('.elements__item-image');
  const cardElementInfo = cardElement.querySelector('.elements__card-heading');
  const cardDel = cardElement.querySelector('.elements__card-delete');
  const cardPhoto = document.querySelector('.popup__card-photo');
  const cardPhotoPlace =document.querySelector('.popup__card-place');

  popupImgBtn.src = item.link;
  cardElementInfo.textContent = item.name;
  popupImgBtn.alt = item.name;

  cardElement.querySelector('.elements__card-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__card-like_active');
  });
  cardDel.addEventListener('click', function () {
    cardElement.remove();
  });
  popupImgBtn.addEventListener('click', function () {
    cardPhoto.src = popupImgBtn.src;
    cardPhoto.alt = popupImgBtn.alt;
    cardPhotoPlace.textContent = cardElementInfo.textContent;
    openPopup(popupImg);
  });
  return cardElement;
};
//добавление карточек
const addCard = item => {
  const cardElement = createCard(item);
  cardConteiner.append(cardElement);
};
function addCardEvn(evt) {
  evt.preventDefault();
  const usersCard = createCard({ name: popInputPlace.value, link: popInputLink.value });
  cardConteiner.prepend(usersCard);
  evt.target.reset();
  close(popupCard);
}
//цикл массива с загрузкой картинок при открывании страницы
initialCards.forEach(addCard);
//
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popInputName.value;
  profileDescription.textContent = popInputDescription.value;
  close(popup);
};
// События
popupOpenButton.addEventListener('click', () => {
  getInfoProf();
  openPopup(popup);
});
popupOpenAdd.addEventListener('click', () => {
  openPopup(popupCard);
});
popups.forEach((popup) => {
  popup.addEventListener('click', e => {
    if (e.target.classList.contains("popup__close")) {
      close(popup);
    }
  });
});
// функция, закрывающая попап клавишей escape

const keyEscHandler = e => {
  popups.forEach((popup) => {
  if (e.key === 'Escape') {
    close(popup);
  }
});
};

// обработчик, закрывающий попап кликом на оверлей

popups.forEach((popup) => {
  popup.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      close(popup);
    }
  });
});

formElement.addEventListener('submit', formSubmitHandler);
buttonAddCard.addEventListener('submit', addCardEvn);





