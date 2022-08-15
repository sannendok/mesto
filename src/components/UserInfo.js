//import {popupInputName, popupInputDescription} from '../utils/constants.js';

export default class UserInfo {
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

  setUserInfo({name, about, avatar}) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = about;
    this._avatar.src = avatar;
  };
};