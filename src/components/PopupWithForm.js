import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, onFormSubmit) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputElements = this._formElement.querySelectorAll('.popup__input');

    this._onFormSubmit = (evt) => {
      evt.preventDefault();
      onFormSubmit(this._getInputValues());
      this.close();
    };
  }

  _getInputValues() {
    return Array.from(this._inputElements).reduce((values, input) => {
      values[input.name] = input.value;
      return values;
    }, {});
  }

  setInputValues(inputName, inputValue) {
    Array.from(this._inputElements).find((input) => input.name == inputName).value = inputValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._onFormSubmit);
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._formElement.removeEventListener('submit', this._onFormSubmit);
  }
}
