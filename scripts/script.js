let popup = document.querySelector('.popup');
    popupOpenButton = document.querySelector('.profile__edit-button');
    popupCloseButton = document.querySelector('.popup__close')
    popInputName = document.querySelector('.popup__input-name');
    popInputDescription = document.querySelector('.popup__input-description');
    profileName = document.querySelector('.profile__name');
    profileDescription = document.querySelector('.profile__description');

function openPopup() {
    popup.classList.add('popup__open');
    popInputName.value = profileName.textContent;
    popInputDescription.value = profileDescription.textContent;
}
function close() {
    popup.classList.remove('popup__open');
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', close);