import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupDescription = this._popupElement.querySelector('.popup__description');

    this.open = this.open.bind(this);
  }
  open(evt) {
    this._popupImage.src = evt.currentTarget.src;
    this._popupImage.alt = evt.currentTarget.alt;
    this._popupDescription.textContent = evt.currentTarget.alt;
    super.open();
  }
}
