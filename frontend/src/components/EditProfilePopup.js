import React, { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const defaultValues = { name: '', about: '' };
  const {
    formValues,
    handleChangeInput,
    errors,
    isValid,
    setFormValues,
    resetForm,
  } = useFormAndValidation(defaultValues, true);
  const currentUser = useContext(CurrentUserContext);
  //Установка данных пользователя по умолчанию
  useEffect(() => {
    //Проверка на сущствование данных
    if (currentUser?.name) {
      resetForm();
      const { name, about } = currentUser;
      setFormValues({ name, about });
    }
  }, [currentUser, isOpen]);

  //Подтверждение сохранения картинки
  const handleSubmit = (e) => {
    //Отмена стандартной отправки формы
    e.preventDefault();
    onUpdateUser(formValues);
  };

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      isClose={!isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      buttonTextOnLoading='Сохранение'
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}>
      <input
        id='author'
        name='name'
        value={formValues.name}
        onChange={handleChangeInput}
        className='popup__text-input popup__text-input_order_first popup__text-input_type_author'
        type='text'
        minLength='2'
        maxLength='40'
        required
      />
      <span className='popup__error popup__error_type_author popup__error_order_first'>
        {errors.name}
      </span>
      <input
        id='description'
        name='about'
        value={formValues.about}
        onChange={handleChangeInput}
        className='popup__text-input popup__text-input_order_next popup__text-input_type_description'
        type='text'
        minLength='2'
        maxLength='200'
        required
      />
      <span className='popup__error popup__error_type_description popup__error_order_second'>
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
