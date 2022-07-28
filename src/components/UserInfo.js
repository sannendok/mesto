//import {popupInputName, popupInputDescription} from '../utils/constants.js';

export default class UserInfo {
  constructor({profileName, profileDescription}) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
  };

  getUserInfo() {
    this._userInfo = {
      inputName: this._profileName.textContent,
      inputDescription: this._profileDescription.textContent, 
    }
    return this._userInfo;
  };

  setUserInfo({profileName, profileDescription}) {
    this._profileName.textContent = profileName;
    this._profileDescription.textContent = profileDescription;
  };
};