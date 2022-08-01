//import {popupInputName, popupInputDescription} from '../utils/constants.js';

export default class UserInfo {
  constructor({name, decs}) {
    this._profileName = document.querySelector(name);
    this._profileDescription = document.querySelector(decs);
  };

  getUserInfo() {
    this._userInfo = {
      inputName: this._profileName.textContent,
      inputDescription: this._profileDescription.textContent, 
    }
    return this._userInfo;
  };

  setUserInfo({name, decs}) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = decs;
  };
};