import React from 'react';
import { useForm } from '../hooks/useForm';

function UserLoginInfo({ title, buttonText, onSubmit }) {
  const { formValues, handleChangeInput } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };
  return (
    <form className='login' onSubmit={handleSubmit}>
      <p className='login__title'>{title}</p>
      <input
        className='popup__text-input popup__text-input_order_login-first popup__text-input_type_login'
        placeholder='Email'
        name='email'
        type='email'
        value={formValues.email}
        onChange={handleChangeInput}
      />
      <input
        className='popup__text-input popup__text-input_order_login-next popup__text-input_type_login'
        placeholder='Пароль'
        name='password'
        type='password'
        onChange={handleChangeInput}
        value={formValues.password}
      />
      <button className='popup__submit-button popup__submit-button-type_login'>
        {buttonText}
      </button>
    </form>
  );
}

export default UserLoginInfo;
