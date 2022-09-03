import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onConfirm, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };
  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      isOpen={isOpen}
      isClose={!isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Да'
      buttonTextOnLoading='Подтверждение'
      isLoading={isLoading}
      isValid={true}
    />
  );
}

export default ConfirmPopup;
