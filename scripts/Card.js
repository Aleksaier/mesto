class Card {
  constructor(config, card, createCard) {
    this._config = config;
    this._card = card;
    this._createCard = createCard;
  }

  _getTemplate() {
    return document.querySelector(this._config.cardTemplate).content.children[0].cloneNode(true);
  }

  addCard(name, link) {
    name.render(this._view);
  }

  render(parent) {
    this._view = this._getTemplate();

    this._items.forEach((card) => {
      const card = this._createCard(card.name);

      card.render(this._view);
    });

    parent.append(this._view);
  }
}

export default Card;
