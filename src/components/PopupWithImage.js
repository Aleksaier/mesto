import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupDescription = this._popupElement.querySelector('.popup__description');

    this.open = this.open.bind(this);
  }
  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupDescription.textContent = name;
    super.open();
  }
}
