import {initialCards} from "../utils/cards.js";
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "./index.css";

import { 
  popupProfile,
  popupCard,
  popupInputName,
  popupInputDescription,
  profileName,
  profileDescription,
  cardPhotoOpen,
  popupOpenButtonProfile,
  popupOpenAdd,
  formElementProfile,
  cardContainer,
  formAddCard
} from "../utils/constants.js";


export const validationSettings = ({
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

const popupWithImage = new PopupWithImage(cardPhotoOpen);
popupWithImage.setEventListeners();

const userInfo = new UserInfo ({name: ".profile__name", descr: ".profile__description"});

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}
function handleCreateCard(data) {
  const userCard = new Card(data, '.template-item', handleCardClick).render();
  return userCard;
}

const popupsCard = new PopupWithForm({
  popupSelector: popupCard,
  handleFormSubmit: (formData) => {
    const element = handleCreateCard(formData, '.template-item');
    cardContainer.prepend(element);
  }
})
popupsCard.setEventListeners();

popupOpenAdd.addEventListener('click', () => {
  formValidatorAdd.resetValidation();
  popupsCard.open();
});

const defaultCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = handleCreateCard(item);
    defaultCardList.addItem(card);
  }
}, '.elements__list');

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userInfo.setUserInfo(profileName, profileDescription);
  userPopup.close();
};

popupOpenButtonProfile.addEventListener('click', () => {
  const getInputValues = userInfo.getUserInfo();
  popupInputName.value = getInputValues.inputName;
  popupInputDescription.value = getInputValues.inputDescription;
  formValidatorEdit.resetValidation()
  userPopup.open();
});

formElementProfile.addEventListener('submit', handleProfileFormSubmit);

const formValidatorAdd = new FormValidator(validationSettings, popupCard);
const formValidatorEdit = new FormValidator(validationSettings, popupProfile);
formValidatorAdd.enableValidation()
formValidatorEdit.enableValidation();

defaultCardList.renderer();
