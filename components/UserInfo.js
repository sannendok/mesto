import {popupInputName, popupInputDescription} from '../utils/constants.js';

export default class UserInfo {
  constructor(profileName, profileDescription) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
  };

  getUserInfo() {
    this._userInfo = {
      inputName: this._profileName.textContent,
      inputDescription: this._profileDescription.textContent, 
    }
    return this._userInfo;
  };

  setUserInfo() {
    this._profileName.textContent = popupInputName.value;
    this._profileDescription.textContent = popupInputDescription.value;
  };
};