export const config = {
  inputErrorClass: 'popup__input_type_error',
  errorElementActiveClass: 'popup__input-error_active',
  buttonElementInactiveClass: 'popup__submit-button_inactive',
  inputClass: '.popup__input',
  buttonElementClass: '.popup__submit-button',
  formClass: '.popup__form',
};

export const cardConfig = {
  cardSelector: '.card',
  cardTemplateSelector: '#card',
  cardPictureSelector: '.card__picture',
  cardTitleSelector: '.card__title',
  cardDeleteSelector: '.card__delete',
  cardLikeSelector: '.card__like',
  cardLikeCountSelector: '.card__like-count',
  cardLikeActiveClass: 'card__like_active',
  cardLikeVisibleClass: 'card__like-count_visible',
  cardDeleteActiveClass: 'card__delete_active',
};

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    'content-type': 'application/json',
    authorization: '5f03ed22-38d0-40eb-a88c-f70fdfb8e26a',
  },
};
