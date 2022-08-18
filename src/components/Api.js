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

likeCard(id) {
  return fetch(`${this._url}/cards/${id}/likes`, {
    method: 'PUT',
    headers: this._headers
  })
  .then((res) => this._getResponse(res))
}

dislikeCard(id) {
  return fetch(`${this._url}/cards/${id}/likes`, {
    method: 'DELETE',
    headers: this._headers
  })
  .then((res) => this._getResponse(res))
}
changeAvatar(data) {
  return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: data
    })
  })
  .then((res) => this._getResponse(res))
}

};