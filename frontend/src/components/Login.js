import React from 'react';
import UserLoginInfo from './UserLoginInfo';

function Login({ handleLogin }) {
  return (
    <UserLoginInfo title='Вход' buttonText='Войти' onSubmit={handleLogin} />
  );
}

export default Login;
