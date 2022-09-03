import React from 'react';
import Accepted from '../images/Accepted.png';
import Error from '../images/Error.png';
import { popupClassStyle } from '../utils/utils';

function InfoToolTip({ isSuccess, isOpen, onClose }) {
  const getText = (isSuccess) => {
    return isSuccess
      ? 'Вы успешно зарегистрировались!'
      : 'Что-то пошло не так! Попробуйте ещё раз.';
  };
  const getImage = (isSuccess) => {
    return isSuccess ? Accepted : Error;
  };
  return (
    <div className={popupClassStyle('form', isOpen)}>
      <div className='popup__container popup__container_type_form'>
        <button
          type='button'
          className='popup__close-button'
          onClick={onClose}
        ></button>
        <img
          className='popup__tooltip-image'
          alt='TooltipImage'
          src={getImage(isSuccess)}
        />
        <p className='popup__tooltip-text'>{getText(isSuccess)}</p>
      </div>
    </div>
  );
}

export default InfoToolTip;
