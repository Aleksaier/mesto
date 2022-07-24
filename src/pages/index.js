import './index.css';
import initialCards from '../components/data.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

const config = {
  inputErrorClass: 'popup__input_type_error',
  errorElementActiveClass: 'popup__input-error_active',
  buttonElementInactiveClass: 'popup__submit-button_inactive',
  inputClass: '.popup__input',
  buttonElementClass: '.popup__submit-button',
  formClass: '.popup__form',
};

const cardConfig = {
  cardSelector: '.card',
  cardTemplateSelector: '#card',
  cardPictureSelector: '.card__picture',
  cardTitleSelector: '.card__title',
  cardDeleteSelector: '.card__delete',
  cardLikeSelector: '.card__like',
  cardLikeActiveClass: 'card__like_active',
};

const popupWithImage = new PopupWithImage('#popupWithImage');
popupWithImage.setEventListeners();

const getNewCard = (name, link) =>
  new Card(name, link, cardConfig, () => popupWithImage.open(name, link)).createCard();

const section = new Section({ items: initialCards, renderer: renderCard }, '.cards');

section.renderItems();

function renderCard(name, link) {
  const newCard = getNewCard(name, link);
  this.addItem(newCard);
}

// popups

const profileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profilePopup');

const cardCreatorButton = document.querySelector('.profile__add-button');
const cardCreatorPopup = document.querySelector('#cardCreatorPopup');

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

enablePopupValidation(profilePopup);

const cardCreatorPopupFormValidator = enablePopupValidation(cardCreatorPopup);

const handleCardFormSubmit = (values) => {
  const newCardElement = getNewCard(values.title, values.link);

  section.addItem(newCardElement);
  popupWithCardForm.close();
  cardCreatorPopupFormValidator.disableButtonState();
};

const popupWithCardForm = new PopupWithForm('#cardCreatorPopup', handleCardFormSubmit);
popupWithCardForm.setEventListeners();
const handleProfileFormSubmit = (values) => {
  userInfo.setUserInfo(values.name, values.description);
};
const popupWithProfileForm = new PopupWithForm('#profilePopup', handleProfileFormSubmit);
popupWithProfileForm.setEventListeners();

function enablePopupValidation(popup) {
  const formElement = popup.querySelector(config.formClass);
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
  return formValidator;
}

function openProfilePopup() {
  popupWithProfileForm.open();
  const userData = userInfo.getUserInfo();
  popupWithProfileForm.setInputValues(userData);
}

profileButton.addEventListener('click', openProfilePopup);

cardCreatorButton.addEventListener('click', popupWithCardForm.open);
