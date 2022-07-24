export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._popupCloseButtonElement = this._popupElement.querySelector('.popup__close-button');

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
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
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  setEventListeners() {
    this._popupCloseButtonElement.addEventListener('click', this.close);
    this._popupElement.addEventListener('click', this._handleOverlayClose);
  }
}
