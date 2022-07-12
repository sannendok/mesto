import Card from './Card.js'
import FormValidator from './FormValidator.js'

const popups = document.querySelectorAll('.popup');
const popupCard = document.querySelector('.card-popup');
const popupProfile = document.querySelector('.profile-popup');
const popupOpenButtonProfile = document.querySelector('.profile__edit-button');
const popupOpenAdd = document.querySelector('.profile__add-button')
const popupInputName = document.querySelector('.popup__input_value_name');
const popupInputDescription = document.querySelector('.popup__input_value_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElementProfile = document.querySelector('.popup__card-add-profile');
const cardContainer = document.querySelector('.elements__list');
const formAddCard = document.querySelector('.popup__card-add-form');
const popupInputPlace = document.querySelector('.popup__input_value_place');
const popupInputLink = document.querySelector('.popup__input_value_link');


const validationSettings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const openPopup = (element) => {
  element.classList.add('popup_open');
  document.addEventListener('keydown', keyEscHandler);
};

const closePopup = (element) => {
  element.classList.remove('popup_open');
  document.removeEventListener('keydown', keyEscHandler);
};

const getInfoProf = () => {
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
};

//добавление карточек
const addCard = item => {
  const cardElement = new Card(item, '.template-item');
  const cardsElement = cardElement.render();
  return cardsElement;
};

const renderCard = (card) => {
  cardContainer.append(card);
};

function addCardHandler(evt) {
  evt.preventDefault();
  const usersCard = addCard({ name: popupInputPlace.value, link: popupInputLink.value });
  cardContainer.prepend(usersCard);
  evt.target.reset();
  closePopup(popupCard);
  //Делает кнопку не активной
  formValidatorAdd.resetValidation();
};

//цикл массива с загрузкой картинок при открывании страницы
initialCards.forEach((item) => {
  const card = addCard(item);
  renderCard(card);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup(popupProfile);
};

// События//

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
      closePopup(popup);
    }
  });
});

// функция, закрывающая попап клавишей escape
const keyEscHandler = e => {
  if (e.key === 'Escape') {
    const element = document.querySelector('.popup_open');
    closePopup(element);
  }
};

// обработчик, закрывающий попап кликом на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      closePopup(popup);
    }
  });
});

// Отправление заполнееной формы профиля
formElementProfile.addEventListener('submit', handleProfileFormSubmit);

//Отправление добавленной картинки
formAddCard.addEventListener('submit', addCardHandler);

const formValidatorAdd = new FormValidator(validationSettings, popupCard);
const formValidatorEdit = new FormValidator(validationSettings, popupProfile);
formValidatorAdd.enableValidation()
formValidatorEdit.enableValidation();

export { openPopup }