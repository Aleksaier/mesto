export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._popupCloseButtonElement = this._popupElement.querySelector('.popup__close-button');

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._removeEventListeners = this._removeEventListeners.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  setEventListeners() {
    this._popupCloseButtonElement.addEventListener('click', this.close);
    this._popupElement.addEventListener('click', this._handleOverlayClose);
    document.addEventListener('keyup', this._handleEscClose);
  }

  _removeEventListeners() {
    this._popupCloseButtonElement.removeEventListener('click', this.close);
    this._popupElement.removeEventListener('click', this._handleOverlayClose);
    document.removeEventListener('keyup', this._handleEscClose);
  }
}
