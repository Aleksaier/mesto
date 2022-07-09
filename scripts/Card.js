class Card {
  constructor(name, link, cardConfig, openPopup) {
    this._name = name;
    this._link = link;
    this._cardConfig = cardConfig;
    this._openPopup = openPopup;
  }

  _getTemplate = () => document.querySelector(this._cardConfig.cardTemplateSelector).content;

  _createCard() {
    const cardElement = this._getTemplate()
      .querySelector(this._cardConfig.cardSelector)
      .cloneNode(true);
    const cardImage = cardElement.querySelector(this._cardConfig.cardPictureSelector);
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardElement.querySelector(this._cardConfig.cardTitleSelector).textContent = this._name;

    cardElement
      .querySelector(this._cardConfig.cardDeleteSelector)
      .addEventListener('click', this._deleteElement);
    cardElement
      .querySelector(this._cardConfig.cardLikeSelector)
      .addEventListener('click', this._setIsFavourite);
    cardImage.addEventListener('click', this._openImage);

    return cardElement;
  }

  _deleteElement = (e) => e.currentTarget.closest(this._cardConfig.cardSelector).remove();

  _setIsFavourite = (e) => e.currentTarget.classList.toggle(this._cardConfig.cardLikeActiveClass);

  _getGalleryPopup = () => document.querySelector(this._cardConfig.galleryPopupSelector);

  _openImage = (evt) => {
    const imagePopup = document.querySelector(this._cardConfig.popupImageSelector);
    imagePopup.src = evt.currentTarget.src;
    imagePopup.alt = evt.currentTarget.alt;
    document.querySelector(this._cardConfig.popupDescriptionSelector).textContent =
      evt.currentTarget.alt;
    this._openPopup(this._getGalleryPopup());
  };

  render(container, isAppend = false) {
    if (isAppend) {
      container.append(this._createCard());
    } else {
      container.prepend(this._createCard());
    }
  }
}

export default Card;
