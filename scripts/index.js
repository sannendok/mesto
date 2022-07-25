import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Section from './Section.js'
import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";


//const popups = document.querySelectorAll('.popup');
// const popupCard = document.querySelector('.card-popup');
// const popupProfile = document.querySelector('.profile-popup');
const popupOpenButtonProfile = document.querySelector('.profile__edit-button');
//const popupOpenAdd = document.querySelector('.profile__add-button');
// const popupInputName = document.querySelector('.popup__input_value_name');
// const popupInputDescription = document.querySelector('.popup__input_value_description');
// const profileName = document.querySelector('.profile__name');
// const profileDescription = document.querySelector('.profile__description');
const formElementProfile = document.querySelector('.popup__card-add-profile');
// const cardContainer = document.querySelector('.elements__list');
// const formAddCard = document.querySelector('.popup__card-add-form');
// const popupInputPlace = document.querySelector('.popup__input_value_place');
// const popupInputLink = document.querySelector('.popup__input_value_link');

import { 
  popupProfile,
  popupCard,
  popupInputName,
  popupInputDescription,
  profileName,
  profileDescription,
} from "./utils/constants.js";


const validationSettings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const userPopup = new Popup(popupProfile);
userPopup.setEventListeners();

const cardPopup = new Popup(popupCard);
cardPopup.setEventListeners();

const userInfo = new UserInfo (profileName, profileDescription);

// //добавление карточек
// const addCard = item => {
//   const cardElement = new Card(item, '.template-item');
//   const cardsElement = cardElement.render();
//   return cardsElement;
// };

// function addCardHandler(evt) {
//   evt.preventDefault();
//   const usersCard = addCard({ name: popupInputPlace.value, link: popupInputLink.value });
//   cardContainer.prepend(usersCard);
//   evt.target.reset();
//   closePopup(popupCard);
//   //Делает кнопку не активной
//   formValidatorAdd.resetValidation();
// };

//цикл массива с загрузкой картинок при открывании страницы
const defaultCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template-item');
    const cardElement = card.render();
    defaultCardList.addItem(cardElement);
  }
}, '.elements__list');

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userInfo.setUserInfo(profileName, profileDescription);
  userPopup.close();
};

// События//

//Открытие редактирование профиля
popupOpenButtonProfile.addEventListener('click', () => {
  const getInputValues = userInfo.getUserInfo();
  popupInputName.value = getInputValues.inputName;
  popupInputDescription.value = getInputValues.inputDescription;
  formValidatorEdit.resetValidation()
  userPopup.open();
});
// Отправление заполнееной формы профиля
formElementProfile.addEventListener('submit', handleProfileFormSubmit);


// //Окрытие добавление карточки
// popupOpenAdd.addEventListener('click', () => {
//   openPopup(popupCard);
// });

// Поиск закрывающих элементов
// popups.forEach((popup) => {
//   popup.addEventListener('click', e => {
//     if (e.target.classList.contains("popup__close")) {
//       closePopup(popup);
//     }
//   });
// });

// // функция, закрывающая попап клавишей escape
// const keyEscHandler = e => {
//   if (e.key === 'Escape') {
//     const element = document.querySelector('.popup_open');
//     closePopup(element);
//   }
// };

// // обработчик, закрывающий попап кликом на оверлей
// popups.forEach((popup) => {
//   popup.addEventListener('click', e => {
//     if (e.target === e.currentTarget) {
//       closePopup(popup);
//     }
//   });
// });

//Отправление добавленной картинки
//formAddCard.addEventListener('submit', addCardHandler);

const formValidatorAdd = new FormValidator(validationSettings, popupCard);
const formValidatorEdit = new FormValidator(validationSettings, popupProfile);
formValidatorAdd.enableValidation()
formValidatorEdit.enableValidation();


defaultCardList.renderer();




//export { openPopup }