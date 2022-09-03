import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const defaultValues = { avatar: '' };
  const { formValues, handleChangeInput, errors, isValid, resetForm } =
    useFormAndValidation(defaultValues, false);
  //Сохраение аватара
  const handleSubmit = (e) => {
    e.preventDefault();
    const { avatar } = formValues;
    onUpdateAvatar(avatar);
    resetForm();
  };
  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      isClose={!isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
      buttonTextOnLoading='Сохранение'
      isLoading={isLoading}
      isValid={isValid}>
      <input
        id='url'
        className='popup__text-input popup__text-input_order_first'
        name='avatar'
        type='url'
        placeholder='Ссылка на аватар'
        required
        onChange={handleChangeInput}
        value={formValues.avatar}
      />
      <span className='popup__error popup__error_type_url popup__error_order_first'>
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
