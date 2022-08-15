//import { apiConfig } from "../utils/constants.js";

export default class Api {
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

};