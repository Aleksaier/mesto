class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputClass));
    this._buttonElement = this._formElement.querySelector(this._config.buttonElementClass);
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

  _hasInvalidInput = () => this._inputList.some((inputElement) => !inputElement.validity.valid);

  _disableButtonState = () => {
    this._buttonElement.classList.add(this._config.buttonElementInactiveClass);
    this._buttonElement.setAttribute('disabled', 'disabled');
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableButtonState();
    } else {
      this._buttonElement.classList.remove(this._config.buttonElementInactiveClass);
      this._buttonElement.removeAttribute('disabled');
    }
  };

  enableValidation = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
}

export default FormValidator;
