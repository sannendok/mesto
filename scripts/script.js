const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

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
cardConteiner = document.querySelector('.elements__list');
addCardButtot = document.querySelector('.add-card-button');
popInputPlace = document.querySelector('.popup__input_value_name');
popInputLink = document.querySelector('.popup__input_value_name');





//Добавляем картинки при загрузке
function createCard(item) {
  const  cardTemplate = document.querySelector('#card').content;
  const  cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const popupImgBtn = cardElement.querySelector('.elements__item-image');
  const cardElementInfo = cardElement.querySelector('.elements__card-heading');

  popupImgBtn.src = item.link;
  cardElementInfo.textContent = item.name;
  popupImgBtn.alt = item.name;

  cardElement.querySelector('.elements__card-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__card-like_active');
  });
  return cardElement;
  }
  //добавление карточек
const addCard = item => {
    const cardElement = createCard(item);
  
    cardConteiner.append(cardElement);
  };
  // Добавить индивидуальную карточку
function addCardEvn(evt) {
    evt.preventDefault();
    const cardElementadd = createCard({name: popInputPlace.value, link: popInputLink.value });
    cardConteiner.prepend(cardElementadd);
}
  //цикл массива с загрузкой картинок при открывании страницы
  initialCards.forEach(addCard);

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

//addCardButton.addEventListener('click', addCard);
formElement.addEventListener('submit', formSubmitHandler); 
addCardButtot.addEventListener ('submit', addCardEvn);

