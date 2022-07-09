class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorElementActiveClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorElementActiveClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid);

  _disableButtonState = (buttonElement) => {
    buttonElement.classList.add(this._config.buttonElementInactiveClass);
    buttonElement.setAttribute('disabled', 'disabled');
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      this._disableButtonState(buttonElement);
    } else {
      buttonElement.classList.remove(this._config.buttonElementInactiveClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  enableValidation = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputClass));
    const buttonElement = this._formElement.querySelector(this._config.buttonElementClass);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };
}

export default FormValidator;
