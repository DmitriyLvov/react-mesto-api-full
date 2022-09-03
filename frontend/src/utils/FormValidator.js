export class FormValidator {
  constructor(settings, formName) {
    //Сохраняем настройки в приватные поля для дальнейшего использования
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = document.forms[formName];
    this._inputs = Array.from(
      this._form.querySelectorAll(settings.inputSelector)
    );
    this._submitButton = this._form.querySelector(
      settings.submitButtonSelector
    );
  }

  //Функция изменения состояния кнопки подтверждения
  toggleButtonState = () => {
    // Если есть хотя бы один невалидный инпут
    if (!this._form.checkValidity()) {
      // сделай кнопку неактивной
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      // иначе сделай кнопку активной
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  };

  //Функция очищения всех полей ошибок для внешнего вызова
  clearAllErrorMessages = () => {
    this._inputs.forEach((input) => this._hideInputError(input));
  };

  // Функция, которая добавляет класс с ошибкой
  _showInputError = (input) => {
    //Выделение некорректного поля
    input.classList.add(this._inputErrorClass);
    //Найдем элемент ошибки
    const errorMessage = this._form.querySelector(
      `.popup__error_type_${input.id}`
    );
    //Передадим текст ошибки
    errorMessage.textContent = input.validationMessage;
    //Сделаем видимым сообщение об ошибке
    errorMessage.classList.add(this._errorClass);
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError = (input) => {
    //Снять выделение некорректного поля
    input.classList.remove(this._inputErrorClass);
    //Найдем элемент ошибки
    const errorMessage = document.querySelector(
      `.popup__error_type_${input.id}`
    );
    //Скроем сообщение об ошибке
    errorMessage.classList.remove(this._errorClass);
    //Очистим текст ошибки
    errorMessage.textContent = '';
  };
  // Функция, которая проверяет валидность поля
  _handleInput(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
    this.toggleButtonState();
  }

  enableValidation = () => {
    //Добавляем события изменения для каждого инпут
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>
        this._handleInput(inputElement)
      );
    });
  };
}

export const validatorSettings = {
  formSelector: '.popup__container_type_form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__error_visible',
};
