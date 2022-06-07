
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




function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popInputName.value;
    profileDescription.textContent = popInputDescription.value;
    popup.classList.remove('popup_open');
}


const openPopup = (elem) => {
    elem.classList.add('popup_open');
}
const close = (elem) => {
    elem.classList.remove('popup_open');
}
// События
popupOpenButton.addEventListener('click', () => {
    openPopup(popup);
    popInputName.value = profileName.textContent;
    popInputDescription.value = profileDescription.textContent;
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
formElement.addEventListener('submit', formSubmitHandler); 