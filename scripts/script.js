const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
let popup = document.querySelector('.popup');
popups = document.querySelectorAll('.popup');
popupCard = document.querySelector('.card-popup');
popupOpenButton = document.querySelector('.profile__edit-button');
popupOpenAdd = document.querySelector('.profile__add-button')
popupCloseButton = document.querySelector('.popup__close')
popInputName = document.querySelector('.popup__input_value_name');
popInputDescription = document.querySelector('.popup__input_value_description');
profileName = document.querySelector('.profile__name');
profileDescription = document.querySelector('.profile__description');
formElement = document.querySelector('.popup__form');
cardConteiner = document.querySelector('.elements__list');
addCardButtot = document.querySelector('.add-card-button');
popInputPlace = document.querySelector('.popup__input_value_place');
popInputLink = document.querySelector('.popup__input_value_link');
popupImg = document.querySelector('.popup_type_card');
const cardPhoto = document.querySelector('.popup__card-photo');



const openPopup = (elem) => {
  elem.classList.add('popup_open');
};
const close = (elem) => {
  elem.classList.remove('popup_open');
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
  const CardDel = cardElement.querySelector('.elements__card-delete');
  const cardPhoto = document.querySelector('.popup__card-photo');
  const cardPhotoPlace =document.querySelector('.popup__card-place');

  popupImgBtn.src = item.link;
  cardElementInfo.textContent = item.name;
  popupImgBtn.alt = item.name;

  cardElement.querySelector('.elements__card-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__card-like_active');
  });
  CardDel.addEventListener('click', function () {
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
function addCardEvn(elem) {
  elem.preventDefault();
  const usersCard = createCard({ name: popInputPlace.value, link: popInputLink.value });
  cardConteiner.prepend(usersCard);
  elem.target.reset();
  //close(cardForm);
}
function imgReset(elem) {
  elem.target.reset();
  //close(cardForm);
}
//цикл массива с загрузкой картинок при открывании страницы
initialCards.forEach(addCard);
//
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popInputName.value;
  profileDescription.textContent = popInputDescription.value;
  //popup.classList.remove('popup_open');
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
    if (e.target.classList.contains("popup__close") || e.target.classList.contains("popup__button")) {
      close(popup);
      cardPhoto.src = "";
    }
  });
});
formElement.addEventListener('submit', formSubmitHandler);
addCardButtot.addEventListener('submit', addCardEvn);





