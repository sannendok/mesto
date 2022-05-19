let popup = document.querySelector('.popup');
    popupOpenButton = document.querySelector('.profile__edit-button');
    popupCloseButton = document.querySelector('.popup__close')

function openPopup () {
    popup.classList.add('popup__open');
}
function close (){
    popup.classList.remove('popup__open');
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', close);