import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');

    this._onFormSubmit = (evt) => {
      evt.preventDefault();
      this._action();
    };
  }

  setOnFormSubmitAction(action) {
    this._action = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._onFormSubmit);
  }
}
