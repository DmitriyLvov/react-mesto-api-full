import { getResponseData } from './utils';

class Api {
  constructor(baseURL, headers) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getAuthorInfo = () => {
    //Запрос данных с сервера
    return fetch(`${this._baseURL}/users/me`, {
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('jwt')}`},
      credentials: 'include',
      method: 'GET',
    }).then((res) => getResponseData(res));
  };

  getCards = () => {
    //Запрос карточек с сервера
    return fetch(`${this._baseURL}/cards`, {
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('jwt')}`},
      method: 'GET',
      credentials: 'include',
    }).then((res) => getResponseData(res));
  };

  setUserInfo = (data) => {
    const { name, about } = data;
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('jwt')}`},
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => getResponseData(res));
  };

  addNewCard = (data) => {
    const { name, link } = data;
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('jwt')}`},
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => getResponseData(res));
  };

  removeCard = (cardId) => {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('jwt')}`},
    }).then((res) => getResponseData(res));
  };

  addLike = (cardId) => {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('jwt')}`},
    }).then((res) => getResponseData(res));
  };

  removeLike = (cardId) => {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('jwt')}`},
    }).then((res) => getResponseData(res));
  };

  setAvatar = (avatar) => {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('jwt')}`},
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => getResponseData(res));
  };
}
const api = new Api('https://api.dlvov.nomoredomains.sbs', {
  // Не удалось отследить обновление localStorage, поэтому информация по токену формируется при каждом вызове
  // 'authorization': `Bearer ${localStorage.getItem('jwt')}`,
  'Content-Type': 'application/json',
});
export default api;
