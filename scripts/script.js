const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupCard = document.querySelector('.card-popup');
const popupProfile = document.querySelector('.profile-popup');
const popupOpenButtonProfile = document.querySelector('.profile__edit-button');
const popupOpenAdd = document.querySelector('.profile__add-button')
const popInputName = document.querySelector('.popup__input_value_name');
const popInputDescription = document.querySelector('.popup__input_value_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElementProfile = document.querySelector('.popup__card-add-profile');
const cardConteiner = document.querySelector('.elements__list');
const formAddCard = document.querySelector('.popup__card-add-form');
const popInputPlace = document.querySelector('.popup__input_value_place');
const popInputLink = document.querySelector('.popup__input_value_link');
const popupImg = document.querySelector('.popup_type_card');
const cardPhoto = document.querySelector('.popup__card-photo');
const cardTemplate = document.querySelector('#card').content;
const cardPhotoPlace =document.querySelector('.popup__card-place');



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
  const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const popupImgBtn = cardElement.querySelector('.elements__item-image');
  const cardElementInfo = cardElement.querySelector('.elements__card-heading');
  const cardDel = cardElement.querySelector('.elements__card-delete');

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
  //Делает кнопку не активной
  const submitButton = document.querySelector('.popup__card-add-btn');
  deactiveButton (submitButton, validationSettings);
}
//цикл массива с загрузкой картинок при открывании страницы
initialCards.forEach(addCard);
//
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popInputName.value;
  profileDescription.textContent = popInputDescription.value;
  close(popup);
};
// События

//Открытие редактирование профиля
popupOpenButtonProfile.addEventListener('click', () => {
  getInfoProf();
  openPopup(popupProfile);
});

//Окрытие добавление карточки
popupOpenAdd.addEventListener('click', () => {
  openPopup(popupCard);
});
// Поиск закрывающих элементов
popups.forEach((popup) => {
  popup.addEventListener('click', e => {
    if (e.target.classList.contains("popup__close")) {
      close(popup);
    }
  });
});
// функция, закрывающая попап клавишей escape

const keyEscHandler = e => {
  if (e.key === 'Escape') {
    const e = document.querySelector('.popup_open');
    close(e);
  }
};

// обработчик, закрывающий попап кликом на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      close(popup);
    }
  });
});
// Отправление заполнееной формы профиля
formElementProfile.addEventListener('submit', handleProfileFormSubmit);
//Отправление добавленной картинки
formAddCard.addEventListener('submit', addCardEvn);





