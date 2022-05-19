let   popup = document.querySelector('.popup');
let   popupOpenButton = document.querySelector('.profile__edit-button');
let   popupCloseButton = document.querySelector('.popup__close')
let   popInput = document.querySelector('.popup__input-name');
let   profileName = document.querySelector('.profile__name');
let   profileAbout = document.querySelector('.profile__description');

function openPopup () {
    popup.classList.add('popup__open');
    popInput.value = profileName.textContent;
}
function close (){
    popup.classList.remove('popup__open');
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', close);