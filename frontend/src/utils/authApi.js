import { getResponseData } from './utils';
class authAPI {
  constructor(baseURL, headers) {
    this._baseURL = baseURL;
    this._headers = headers;
  }
  //Регистрация пользоввателя
  registerNewUser = (data) => {
    const { email, password } = data;
    return fetch(`${this._baseURL}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => getResponseData(res));
  };
  //Процедура для входа на сайт
  login = (data) => {
    const { email, password } = data;
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => getResponseData(res));
  };
  //процедура проверки валидности токена и получения данных пользователя
  getUserInfo = (token) => {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'get',
      headers: {...this._headers, 'authorization': `Bearer ${token}` },
      credentials: 'include',
    }).then((res) => getResponseData(res));
  };
}

const authApi = new authAPI('https://api.dlvov.nomoredomains.sbs', {
  'Content-Type': 'application/json',
});

export default authApi;
