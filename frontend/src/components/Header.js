import React from 'react';
import logo from '../images/logo.svg';
import { Link, Routes, Route } from 'react-router-dom';

function Header({
  email,
  handleLogout,
  handleToggleHeaderPopupVisble,
  isHeaderPopupOpen,
  isAuth,
}) {
  const closeButtonStyle =
    !isHeaderPopupOpen || !isAuth ? { display: 'none' } : {};
  const menuButtonStyle =
    isHeaderPopupOpen || !isAuth ? { display: 'none' } : {};
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Логотип' />
      <button
        className='header__menu'
        onClick={handleToggleHeaderPopupVisble}
        type='button'
        style={menuButtonStyle}
      >
        <div className='header__menu-line' />
        <div className='header__menu-line' />
        <div className='header__menu-line' />
      </button>
      <button
        type='button'
        onClick={handleToggleHeaderPopupVisble}
        style={closeButtonStyle}
        className='popup__close-button popup__close-button_type_header'
      ></button>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <div className='header__panel'>
              <p className='header__text'>{email}</p>
              <button
                className='header__button header__button_type_gray'
                onClick={handleLogout}
              >
                Выйти
              </button>
            </div>
          }
        />
        <Route
          path='/sign-up'
          element={
            <Link to='/sign-in' className='header__button'>
              Войти
            </Link>
          }
        />

        <Route
          path='/sign-in'
          element={
            <Link to='/sign-up' className='header__button'>
              Регистрация
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
