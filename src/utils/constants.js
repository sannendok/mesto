export const cardPhoto = document.querySelector('.popup__card-photo');
export const cardPhotoPlace = document.querySelector('.popup__card-place');
export const cardPhotoOpen = document.querySelector('.popup_type_card');
export const popupInputName = document.querySelector('.popup__input_value_name');
export const popupInputDescription = document.querySelector('.popup__input_value_description');
export const popupCard = document.querySelector('.card-popup');
export const popupOpenAvatar = document.querySelector('.profile__button-change-avatar');
export const popupProfile = document.querySelector('.profile-popup');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const popupOpenButtonProfile = document.querySelector('.profile__edit-button');
export const popupOpenAdd = document.querySelector('.profile__add-button');
export const formElementProfile = document.querySelector('.popup__card-add-profile');
export const cardContainer = document.querySelector('.elements__list');
export const formAddCard = document.querySelector('.popup__card-add-form');
export const popupAvatar = document.querySelector('.popup-avatar');
export const popupDelete = document.querySelector('.remove-popup');

export const apiConfig = ({
  headers: {
    authorization: '2232b209-0a15-411b-aea2-9c5fabb4d070',
    'Content-Type': 'application/json'
  },
  url: 'https://nomoreparties.co/v1/cohort-47'
}); 

export const loadingTextConfig = ({
  loadingTextSave: 'Сохранение...',
  loadingTextCreate: 'Создание...',
  loadingTextDelete: 'Удаление...',
  loadingSaveDefault: 'Сохранить',
  loadingCreateDefault: 'Создать',
  loadingDeleteDefault: 'Да'
});