class Card {
  constructor(name, link, cardConfig, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardConfig = cardConfig;
    this._handleCardClick = handleCardClick;
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

    this._cardLikeElement = this._cardElement.querySelector(this._cardConfig.cardLikeSelector);

    this._cardElement
      .querySelector(this._cardConfig.cardDeleteSelector)
      .addEventListener('click', this._deleteElement);
    this._cardLikeElement.addEventListener('click', this._setIsFavourite);
    cardImage.addEventListener('click', this._handleCardClick);

    return this._cardElement;
  }

  _deleteElement = () => {
    this._cardElement.remove();
    this._cardElement = null;
    this._cardLikeElement = null;
  };

  _setIsFavourite = () =>
    this._cardLikeElement.classList.toggle(this._cardConfig.cardLikeActiveClass);
}

export default Card;
