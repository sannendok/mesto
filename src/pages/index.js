import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import "./index.css";

import { 
  popupProfile,
  popupCard,
  popupInputName,
  popupInputDescription,
  cardPhotoOpen,
  popupOpenButtonProfile,
  popupOpenAdd
} from "../utils/constants.js";
import { apiConfig } from "../utils/constants.js";


export const validationSettings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const api = new Api(apiConfig);

const popupWithImage = new PopupWithImage(cardPhotoOpen);
popupWithImage.setEventListeners();

const userInfo = new UserInfo ({name: ".profile__name", about: ".profile__description", avatar: '.profile__avatar'});

const defaultCardList = new Section({
  renderer: (item) => {
    const card = handleCreateCard(item);
    defaultCardList.addItem(card);
  }
}, '.elements__list');

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleCreateCard(data) {
  const userCard = new Card(data, '.template-item', handleCardClick).render();
  return userCard;
}

function placeSubmit(obj) {
  const place = handleCreateCard(obj);
  defaultCardList.addItem(place);
}

 const popupAddPlace = new PopupWithForm({
  popupSelector: popupCard,
  handleFormSubmit: placeSubmit,
});
popupAddPlace.setEventListeners();

popupOpenAdd.addEventListener('click', () => {
  formValidatorAdd.resetValidation();
  popupAddPlace.open();
});

// const userPopup = new PopupWithForm({
//   popupSelector: popupProfile,
//   handleFormSubmit: ({name, about}) => {
//     userInfo.setUserInfo({name, about});
//   },
// })
const userPopup = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: ({name, about}) => {
    api.editProfile({name, about})
    .then(() => {
      userInfo.setUserInfo({name, about});
     // popupProfile.close();
    })
    .catch((err) => console.log(err))
  },
})
userPopup.setEventListeners()

popupOpenButtonProfile.addEventListener('click', () => {
  const getInputValues = userInfo.getUserInfo();
  popupInputName.value = getInputValues.inputName;
  popupInputDescription.value = getInputValues.inputDescription;
  formValidatorEdit.resetValidation()
  userPopup.open();
});

const formValidatorAdd = new FormValidator(validationSettings, popupCard);
const formValidatorEdit = new FormValidator(validationSettings, popupProfile);
formValidatorAdd.enableValidation()
formValidatorEdit.enableValidation();

let userId;
Promise.all([api.getProfile(), api.getCard()])
    .then(([user, data]) => {
      userId = user._id;
      userInfo.setUserInfo(user);
      userInfo.setNewAvatar(user);

      defaultCardList.renderer(data);
    })
    .catch((err) => console.log(err));

