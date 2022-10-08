class Card {
  constructor({ data, userId, handleFavouriteClick, handleCardClick, handleDelete, cardConfig }) {
    this._data = data;
    this._userId = userId;
    this._cardConfig = cardConfig;
    this._handleCardClick = () => handleCardClick(this);
    this._handleFavouriteClick = () => handleFavouriteClick(this);
    this._handleDelete = () => handleDelete(this);

    this.getCardId = this.getCardId.bind(this);
    this.getCardName = this.getCardName.bind(this);
    this.getCardLink = this.getCardLink.bind(this);
    this.getLikesCount = this.getLikesCount.bind(this);
    this.getIsLiked = this.getIsLiked.bind(this);
    this.getIsOwner = this.getIsOwner.bind(this);
    this.setLikes = this.setLikes.bind(this);
  }

  _getTemplate = () => document.querySelector(this._cardConfig.cardTemplateSelector).content;

  createCard() {
    this._cardElement = this._getTemplate()
      .querySelector(this._cardConfig.cardSelector)
      .cloneNode(true);
    const name = this.getCardName();
    this._cardElement.querySelector(this._cardConfig.cardTitleSelector).textContent = name;

    const cardImage = this._cardElement.querySelector(this._cardConfig.cardPictureSelector);
    cardImage.src = this.getCardLink();
    cardImage.alt = name;
    cardImage.addEventListener('click', this._handleCardClick);

    this._cardLikeElement = this._cardElement.querySelector(this._cardConfig.cardLikeSelector);
    this._cardLikeCountElement = this._cardElement.querySelector(
      this._cardConfig.cardLikeCountSelector
    );

    this._changeIsFavourite();

    if (this.getIsOwner()) {
      this._cardDeleteElement = this._cardElement.querySelector(
        this._cardConfig.cardDeleteSelector
      );
      this._cardDeleteElement.classList.add(this._cardConfig.cardDeleteActiveClass);
      this._cardDeleteElement.addEventListener('click', this._handleDelete);
    }

    this._cardLikeElement.addEventListener('click', this._handleFavouriteClick);

    return this._cardElement;
  }

  removeCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
    this._cardLikeElement = null;
    this._cardLikeCountElement = null;
    this._cardDeleteElement = null;
  };

  _changeIsFavourite = () => {
    if (this.getIsLiked()) {
      this._cardLikeElement.classList.add(this._cardConfig.cardLikeActiveClass);
    } else {
      this._cardLikeElement.classList.remove(this._cardConfig.cardLikeActiveClass);
    }

    const likesCount = this.getLikesCount();
    this._cardLikeCountElement.textContent = likesCount;
    if (likesCount > 0) {
      this._cardLikeCountElement.classList.add(this._cardConfig.cardLikeVisibleClass);
    } else {
      this._cardLikeCountElement.classList.remove(this._cardConfig.cardLikeVisibleClass);
    }
  };

  getCardId() {
    return this._data._id;
  }

  getCardName() {
    return this._data.name;
  }

  getCardLink() {
    return this._data.link;
  }

  getLikesCount() {
    return this._data.likes.length;
  }

  getIsLiked() {
    return this._data.likes.find(({ _id }) => _id === this._userId);
  }

  getIsOwner() {
    return this._data.owner._id === this._userId;
  }

  setLikes(likes) {
    this._data.likes = likes;
    this._changeIsFavourite();
  }
}

export default Card;
