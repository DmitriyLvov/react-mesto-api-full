import React from 'react';

function UserInfoPopup({ handleLogout, email, isVisible }) {
  return isVisible ? (
    <section className='header__popup'>
      <p className='header__text header__text_type_popup'>{email}</p>
      <button
        className='header__button header__button_type_popup'
        onClick={handleLogout}>
        Выйти
      </button>
    </section>
  ) : (
    <></>
  );
}

export default UserInfoPopup;
