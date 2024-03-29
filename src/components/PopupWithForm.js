import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, onFormSubmit) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputElementList = Array.from(this._formElement.querySelectorAll('.popup__input'));

    this._onFormSubmit = (evt) => {
      evt.preventDefault();
      onFormSubmit(this._getInputValues());
    };
  }

  _getInputValues() {
    return this._inputElementList.reduce((values, input) => {
      values[input.name] = input.value;
      return values;
    }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._onFormSubmit);
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setInputValues(data) {
    this._inputElementList.forEach((input) => {
      input.value = data[input.name];
    });
  }
}
