import Reactc from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const defaultValues = { name: '', link: '' };
  const { formValues, handleChangeInput, errors, isValid, resetForm } =
    useFormAndValidation(defaultValues, false);
  //Подтверждение сохранения картинки
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(formValues);
    resetForm();
  };
  return (
    <PopupWithForm
      name='card'
      title='Новое место'
      isOpen={isOpen}
      isClose={!isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Добавить'
      buttonTextOnLoading='Добавление'
      isLoading={isLoading}
      isValid={isValid}>
      <input
        id='name'
        name='name'
        className='popup__text-input popup__text-input_order_first popup__text-input_type_picture-name'
        type='text'
        placeholder='Название'
        onChange={handleChangeInput}
        value={formValues.name}
        minLength='2'
        maxLength='30'
        required
      />
      <span className='popup__error popup__error_type_name popup__error_order_first'>
        {errors.name}
      </span>
      <input
        id='path'
        name='link'
        className='popup__text-input popup__text-input_order_next popup__text-input_type_picture-path'
        onChange={handleChangeInput}
        type='url'
        value={formValues.link}
        placeholder='Ссылка на картинку'
        required
      />
      <span className='popup__error popup__error_type_path popup__error_order_second'>
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
