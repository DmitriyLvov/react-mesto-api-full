import React from 'react';
import { popupClassStyle } from '../utils/utils';

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={popupClassStyle('image', isOpen)}>
      <div className='popup__container popup__container_type_image'>
        <button
          type='button'
          className='popup__close-button'
          onClick={onClose}
        ></button>
        <img className='popup__image' src={card.link} alt={card.name} />
        <p className='popup__description'>{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
