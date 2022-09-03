import React from 'react';
import { Link } from 'react-router-dom';
import UserLoginInfo from './UserLoginInfo';

function Register({ handleRegisterUser }) {
  return (
    <>
      <UserLoginInfo
        title='Регистрация'
        buttonText='Зарегистрироваться'
        onSubmit={handleRegisterUser}
      />
      <p className='login__description'>
        Уже зарегистрированы?{' '}
        <Link className='login__description' to='/sign-in'>
          Войти
        </Link>
      </p>
    </>
  );
}

export default Register;
