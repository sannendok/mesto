import Card from './Card.js'
import FormValidator from './formvalidator.js'

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
const submitButtonDisabled = document.querySelector('.popup__card-add-btn');

const validationSettings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


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

//добавление карточек
const addCard = item => {
  const cardElement = new Card(item, '.template-item');
  const cardElem = cardElement.render();
  cardConteiner.append(cardElem);
  return cardElem;
};
function addCardEvn(evt) {
  evt.preventDefault();
  const usersCard = addCard({ name: popInputPlace.value, link: popInputLink.value });
  cardConteiner.prepend(usersCard);
  evt.target.reset();
  close(popupCard);
  //Делает кнопку не активной
  // deactiveButton(submitButtonDisabled, validationSettings);
  formValidatorAdd.resetValidation();
}
//цикл массива с загрузкой картинок при открывании страницы
initialCards.forEach(addCard);
//
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popInputName.value;
  profileDescription.textContent = popInputDescription.value;
  close(popupProfile);
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
    const element = document.querySelector('.popup_open');
    close(element);
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

const formValidatorAdd = new FormValidator(validationSettings, popupCard);
const formValidatorEdit = new FormValidator(validationSettings, popupProfile);
formValidatorAdd.enableValidation()
formValidatorEdit.enableValidation();

export { openPopup }