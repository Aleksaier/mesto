class Card {
  constructor(name, link, cardConfig, onImageClick) {
    this._name = name;
    this._link = link;
    this._cardConfig = cardConfig;
    this._onImageClick = onImageClick;
  }

  _getTemplate = () => document.querySelector(this._cardConfig.cardTemplateSelector).content;

  createCard() {
    this._cardElement = this._getTemplate()
      .querySelector(this._cardConfig.cardSelector)
      .cloneNode(true);
    const cardImage = this._cardElement.querySelector(this._cardConfig.cardPictureSelector);
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._cardElement.querySelector(this._cardConfig.cardTitleSelector).textContent = this._name;

    this._cardElement
      .querySelector(this._cardConfig.cardDeleteSelector)
      .addEventListener('click', this._deleteElement);
    this._cardElement
      .querySelector(this._cardConfig.cardLikeSelector)
      .addEventListener('click', this._setIsFavourite);
    cardImage.addEventListener('click', this._onImageClick);

    return this._cardElement;
  }

  _deleteElement = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _setIsFavourite = (e) => e.currentTarget.classList.toggle(this._cardConfig.cardLikeActiveClass);
}

export default Card;
