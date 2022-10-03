class Card {
  constructor({
    name,
    link,
    defaultLikesCount,
    defaultIsLiked,
    handleFavouriteClick,
    isOwner,
    cardConfig,
    handleCardClick,
    handleDelete,
  }) {
    this._name = name;
    this._link = link;
    this._likesCount = defaultLikesCount;
    this._isLiked = defaultIsLiked;
    this._isOwner = isOwner;
    this._cardConfig = cardConfig;
    this._handleCardClick = handleCardClick;
    this._handleFavouriteClick = handleFavouriteClick;
    this._handleDelete = handleDelete;
  }

  _getTemplate = () => document.querySelector(this._cardConfig.cardTemplateSelector).content;

  createCard() {
    this._cardElement = this._getTemplate()
      .querySelector(this._cardConfig.cardSelector)
      .cloneNode(true);
    const cardImage = this._cardElement.querySelector(this._cardConfig.cardPictureSelector);
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardImage.addEventListener('click', this._handleCardClick);

    this._cardElement.querySelector(this._cardConfig.cardTitleSelector).textContent = this._name;

    this._cardLikeElement = this._cardElement.querySelector(this._cardConfig.cardLikeSelector);
    this._cardLikeCountElement = this._cardElement.querySelector(
      this._cardConfig.cardLikeCountSelector
    );

    this._setLike();
    this._setLikeCount();
    if (this._isOwner) {
      this._cardDeleteElement = this._cardElement.querySelector(
        this._cardConfig.cardDeleteSelector
      );
      this._cardDeleteElement.classList.add(this._cardConfig.cardDeleteActiveClass);
      this._cardDeleteElement.addEventListener('click', () => this._handleDelete(this));
    }

    this._cardLikeElement.addEventListener('click', () => this._handleFavouriteClick(this));

    return this._cardElement;
  }

  removeCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
    this._cardLikeElement = null;
    this._cardLikeCountElement = null;
    this._cardDeleteElement = null;
  };

  setIsFavourite = (isLiked, likesCount) => {
    this._isLiked = isLiked;
    this._likesCount = likesCount;

    this._setLike();
    this._setLikeCount();
  };

  _setLike = () => {
    if (this._isLiked) {
      this._cardLikeElement.classList.add(this._cardConfig.cardLikeActiveClass);
    } else {
      this._cardLikeElement.classList.remove(this._cardConfig.cardLikeActiveClass);
    }
  };

  _setLikeCount = () => {
    this._cardLikeCountElement.textContent = this._likesCount;
    if (this._likesCount > 0) {
      this._cardLikeCountElement.classList.add(this._cardConfig.cardLikeVisibleClass);
    } else {
      this._cardLikeCountElement.classList.remove(this._cardConfig.cardLikeVisibleClass);
    }
  };

  getIsLiked() {
    return this._isLiked;
  }
}

export default Card;
