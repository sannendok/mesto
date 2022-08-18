/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Api)
/* harmony export */ });
//import { apiConfig } from "../utils/constants.js";

class Api {
  constructor(apiConfig) {
    this._getResponse = this._getResponse.bind(this);
    this._headers = apiConfig.headers;
    this._url = apiConfig.url;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => this._getResponse(res))
  }
  getCard() {
    return fetch(`${this._url}/cards`, {
      credentials: 'omit',
      method: 'GET',
      headers: this._headers
    })
      .then((res) => this._getResponse(res))
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then((res) => this._getResponse(res))

  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => this._getResponse(res))
  }

deleteCard(id) {
  return fetch(`${this._url}/cards/${id}`, {
    method: 'DELETE',
    headers: this._headers
  })
  .then((res) => this._getResponse(res))
}
};

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Card {
  constructor(data, cardSelector, handleCardClick, {handleDeleteCard}, userId) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    //this._handlePutLike = handlePutLike;
    //this._handleDeleteLike = handleDeleteLike;
    this._likes = data.likes;
    this._cardId = data._id
    this._ownerId = data.owner._id;
    this._userId = userId;
  };

  _getTemplate() {
    const card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return card;
  };

  _addEventListeners() {
    this._deleteIcon.addEventListener('click', () => this._handleDeleteCard(this._cardId));
    this._cardLikeButton = this._element.querySelector('.elements__card-like');
    this._cardLikeButton.addEventListener('click', () => this._likeCard());
    this._element.querySelector('.elements__item-image').addEventListener('click', () => this._handleCardClick(this._data.name, this._data.link));
  };

  deleteCard() {
    this._element.remove();
    this._element = null
}

  _likeCard() {
    this._cardLikeButton.classList.toggle('elements__card-like_active');
  };

  _whoseCard() {
    if (this._ownerId !== this._userId) {
      this._deleteIcon.remove();
    }
}

  render() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__item-image').src = this._data.link;
    this._element.querySelector('.elements__card-heading').textContent = this._data.name;
    this._element.querySelector('.elements__item-image').alt = this._data.name;
    this._popupImageButton = this._element.querySelector('.elements__item-image');
    this._deleteIcon = this._element.querySelector('.elements__card-delete');
    //this._cardLikeButton = this._element.querySelector('.elements__card-like');

   // this._checkLike();
    //this.countLikes(this._likes);
    this._whoseCard();
    this._addEventListeners();

    return this._element;
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

class FormValidator{
  constructor(validationSettings, formElement) {
      this._formSelector = validationSettings.formSelector;
      this._inputSelector = validationSettings.inputSelector;
      this._submitButtonSelector = validationSettings.submitButtonSelector;
      this._inactiveButtonClass = validationSettings.inactiveButtonClass;
      this._inputErrorClass = validationSettings.inputErrorClass;
      this._errorClass = validationSettings.errorClass;
      this._formElement = formElement;
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  };

// функция, проверяющая валидность полей
_isValid(inputElement) {
  if (!inputElement.validity.valid) {
  this._showInputError(inputElement, inputElement.validationMessage);
  } else {
  this._hideInputError(inputElement);
  }
};

// функция, показывающая ошибку ввода
  _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
  }

// функция, скрывающая ошибку ввода
  _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
  };

// переключение активности кнопки Submit
_toggleButtonState() {
  if (this._hasInvalidInput()) {
  this._buttonElement.classList.add(this._inactiveButtonClass);
  this._buttonElement.disabled = true;
  } else {
  this._buttonElement.classList.remove(this._inactiveButtonClass);
  this._buttonElement.disabled = false;
  }
};

  _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };

// универсальная функция добавления обработчика всем полям формы
  _setEventListeners() {      
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          this._isValid(inputElement);
          this._toggleButtonState();
      });
      });
  };

  resetValidation() {
      this._toggleButtonState();

      this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
      });
  };

  // enableValidation() {
  //     this._formList = Array.from(document.querySelectorAll(this._formSelector));
  //     this._formList.forEach(() => {
  //       this._setEventListeners();
  //     });
  //   };
    enableValidation(formElement, validationSettings) {
      this._setEventListeners(formElement, validationSettings)
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormValidator);

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Popup)
/* harmony export */ });
class Popup {
    constructor(popupSelector) {
      this._popup = popupSelector;
      this._handleEscClose = this._handleEscClose.bind(this)
    };
  
    open() {
      this._popup.classList.add('popup_open');
      document.addEventListener('keydown', this._handleEscClose);
    };
  
    close() {
      this._popup.classList.remove('popup_open');
      document.removeEventListener('keydown', this._handleEscClose);
    };
  
    _handleEscClose(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    };
  
    setEventListeners() {
      this._popup.addEventListener('mousedown', e => {
        if (e.target.classList.contains('popup__close') || e.target === e.currentTarget) {
          this.close();
        }
      });
    }
  };

/***/ }),

/***/ "./src/components/PopupWithConfirmation.js":
/*!*************************************************!*\
  !*** ./src/components/PopupWithConfirmation.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithConfirmation)
/* harmony export */ });
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ "./src/components/Popup.js");


class PopupWithConfirmation extends _Popup__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupDeleteButton = document.querySelector('.popup__remove-btn');
  }

  setConfirmHandler(handler) {
    this._confirmHandler = handler;
  }

  setEventListeners() {
    this._popupDeleteButton.addEventListener('click', e => {
      e.preventDefault();     
       this._confirmHandler()
    })
    
    super.setEventListeners();
  }

}



/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithForm)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");
/* harmony import */ var _pages_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/index.js */ "./src/pages/index.js");



class PopupWithForm extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form')
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
   this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
   });

    return this._formValues;
  };

  close() {
    super.close();
    this._popupForm.reset();
}
  setEventListeners() {
   
    this._popup.addEventListener('submit', e => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  };
};

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithImage)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");


class PopupWithImage extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__card-photo');
    this._name = this._popup.querySelector('.popup__card-place');
  };

  open(name, link) {
    super.open();
    this._image.src = link;
    this._name.textContent = name;
    this._image.alt = name;
    
  }
};

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Section)
/* harmony export */ });

class Section{
    constructor({data, renderer}, cardContainer){ 
      //  this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(cardContainer);
    }

    addItem(element){
       this._container.prepend(element); 
    }
    
    renderer(data){
        data.forEach(item => {
            this._renderer(item);
          });
    }
}

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserInfo)
/* harmony export */ });
//import {popupInputName, popupInputDescription} from '../utils/constants.js';

class UserInfo {
  constructor({name, about, avatar}) {
    this._profileName = document.querySelector(name);
    this._profileDescription = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  };

  getUserInfo() {
    this._userInfo = {
      inputName: this._profileName.textContent,
      inputDescription: this._profileDescription.textContent, 
    }
    return this._userInfo;
  };

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.about;
    // this._avatar.src = avatar;
  };
  setNewAvatar(data) {
    this._avatar.src = data.avatar;
    this._avatar.alt = data.name;
  }
};

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validationSettings": () => (/* binding */ validationSettings)
/* harmony export */ });
/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Card.js */ "./src/components/Card.js");
/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/FormValidator.js */ "./src/components/FormValidator.js");
/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Section.js */ "./src/components/Section.js");
/* harmony import */ var _components_Popup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Popup.js */ "./src/components/Popup.js");
/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/UserInfo.js */ "./src/components/UserInfo.js");
/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PopupWithImage.js */ "./src/components/PopupWithImage.js");
/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithForm.js */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Api.js */ "./src/components/Api.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./index.css */ "./src/pages/index.css");
/* harmony import */ var _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/PopupWithConfirmation.js */ "./src/components/PopupWithConfirmation.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/constants.js */ "./src/utils/constants.js");















const validationSettings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_7__["default"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.apiConfig);

const popupWithImage = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_5__["default"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.cardPhotoOpen);
popupWithImage.setEventListeners();

// const popupDeleteCard = new PopupWithConfirmation(popupDelete);  
// popupDeleteCard.setEventListeners();

const userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_4__["default"]({ name: ".profile__name", about: ".profile__description", avatar: '.profile__avatar' });

const defaultCardList = new _components_Section_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
  renderer: (item) => {
    const card = handleCreateCard(item);
    defaultCardList.addItem(card);
  }
}, '.elements__list');

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleCreateCard(data) {
  const userCard = new _components_Card_js__WEBPACK_IMPORTED_MODULE_0__["default"](data, '.template-item', handleCardClick, {handleDeleteCard}, userId).render();
  return userCard;
}

function placeSubmit(obj) {
  api.addNewCard(obj)
    .then((obj) => {
      const place = handleCreateCard(obj);
      defaultCardList.addItem(place);
    })
    .catch((err) => {
      console.log(err);
    });
}

const popupAddPlace = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
  popupSelector: _utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.popupCard,
  handleFormSubmit: placeSubmit,
});
popupAddPlace.setEventListeners();

_utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.popupOpenAdd.addEventListener('click', () => {
  formValidatorAdd.resetValidation();
  popupAddPlace.open();
});

// const userPopup = new PopupWithForm({
//   popupSelector: popupProfile,
//   handleFormSubmit: ({name, about}) => {
//     userInfo.setUserInfo({name, about});
//   },
// })
const userPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
  popupSelector: _utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.popupProfile,
  handleFormSubmit: ({ name, about }) => {
    api.editProfile({ name, about })
      .then(() => {
        userInfo.setUserInfo({ name, about });
        // popupProfile.close();
      })
      .catch((err) => console.log(err))
  },
})
userPopup.setEventListeners()


// // document.querySelector('.popup__remove-btn').addEventListener('click', e => {
// //  popupDelete.classList.remove('popup_open');
// // })
// document.querySelector('.popup__remove-btn').addEventListener('submit', e => {
//   e.preventDefault();
//  popupDelete.classList.remove('popup_open');
// })




_utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.popupOpenButtonProfile.addEventListener('click', () => {
  const getInputValues = userInfo.getUserInfo();
  _utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.popupInputName.value = getInputValues.inputName;
  _utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.popupInputDescription.value = getInputValues.inputDescription;
  formValidatorEdit.resetValidation()
  userPopup.open();
});

const formValidatorAdd = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_1__["default"](validationSettings, _utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.popupCard);
const formValidatorEdit = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_1__["default"](validationSettings, _utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.popupProfile);
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

const popupDeleteCard = new _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_9__["default"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.popupDelete);  
popupDeleteCard.setEventListeners();

  function handleDeleteCard(cardId) {
    popupDeleteCard.open();
    popupDeleteCard.setConfirmHandler(() => {
    //   popupDelete.renderLoading(true, loadingTextConfig.loadingTextDelete)
      api.deleteCard(cardId)
        .then(() => {
          this.deleteCard();
         popupDeleteCard.close();
        })
        .catch((err)  => console.log(err))
        // .finally(() => popupDelete.renderLoading(false, loadingTextConfig.loadingDeleteDefault))
     })
  };

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiConfig": () => (/* binding */ apiConfig),
/* harmony export */   "cardContainer": () => (/* binding */ cardContainer),
/* harmony export */   "cardPhoto": () => (/* binding */ cardPhoto),
/* harmony export */   "cardPhotoOpen": () => (/* binding */ cardPhotoOpen),
/* harmony export */   "cardPhotoPlace": () => (/* binding */ cardPhotoPlace),
/* harmony export */   "formAddCard": () => (/* binding */ formAddCard),
/* harmony export */   "formElementProfile": () => (/* binding */ formElementProfile),
/* harmony export */   "popupCard": () => (/* binding */ popupCard),
/* harmony export */   "popupDelete": () => (/* binding */ popupDelete),
/* harmony export */   "popupInputDescription": () => (/* binding */ popupInputDescription),
/* harmony export */   "popupInputName": () => (/* binding */ popupInputName),
/* harmony export */   "popupOpenAdd": () => (/* binding */ popupOpenAdd),
/* harmony export */   "popupOpenButtonProfile": () => (/* binding */ popupOpenButtonProfile),
/* harmony export */   "popupProfile": () => (/* binding */ popupProfile),
/* harmony export */   "profileDescription": () => (/* binding */ profileDescription),
/* harmony export */   "profileName": () => (/* binding */ profileName)
/* harmony export */ });
const cardPhoto = document.querySelector('.popup__card-photo');
const cardPhotoPlace = document.querySelector('.popup__card-place');
const cardPhotoOpen = document.querySelector('.popup_type_card');
const popupInputName = document.querySelector('.popup__input_value_name');
const popupInputDescription = document.querySelector('.popup__input_value_description');
const popupCard = document.querySelector('.card-popup');
const popupProfile = document.querySelector('.profile-popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupOpenButtonProfile = document.querySelector('.profile__edit-button');
const popupOpenAdd = document.querySelector('.profile__add-button');
const formElementProfile = document.querySelector('.popup__card-add-profile');
const cardContainer = document.querySelector('.elements__list');
const formAddCard = document.querySelector('.popup__card-add-form');
//export const avatar = document.querySelector('.profile__avatar');
const popupDelete = document.querySelector('.remove-popup');

const apiConfig = ({
  headers: {
    authorization: '2232b209-0a15-411b-aea2-9c5fabb4d070',
    'Content-Type': 'application/json'
  },
  url: 'https://nomoreparties.co/v1/cohort-47'
}); 

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map