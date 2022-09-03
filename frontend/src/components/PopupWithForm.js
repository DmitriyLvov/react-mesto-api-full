import React from 'react';
import { popupClassStyle } from '../utils/utils';

function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  children,
  buttonText,
  isLoading,
  buttonTextOnLoading,
  onSubmit,
  isValid,
}) {
  return (
    <div className={popupClassStyle(name, isOpen)}>
      <form
        name={`${name}-form`}
        onSubmit={onSubmit}
        className={`popup__container popup__container_type_form`}>
        <button
          type='button'
          className='popup__close-button'
          onClick={onClose}></button>
        <h2 className='popup__title'>{title}</h2>
        {children}
        {isValid ? (
          <button
            type='submit'
            className='popup__submit-button popup__submit-button_type_confirm'>
            {isLoading ? buttonTextOnLoading : buttonText}
          </button>
        ) : (
          <button
            type='submit'
            className='popup__submit-button popup__submit-button_type_confirm popup__submit-button_disabled'
            disabled>
            {isLoading ? buttonTextOnLoading : buttonText}
          </button>
        )}
      </form>
    </div>
  );
}

export default PopupWithForm;
