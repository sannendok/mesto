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