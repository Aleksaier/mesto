import initialCards from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const cardsContainer = document.querySelector('.cards');

const galleryPopup = document.querySelector('#galleryPopup');

const galleryPopupImage = galleryPopup.querySelector('.popup__image');
const galleryPopupDescription = galleryPopup.querySelector('.popup__description');

const onImageClick = (evt) => {
  galleryPopupImage.src = evt.currentTarget.src;
  galleryPopupImage.alt = evt.currentTarget.alt;
  galleryPopupDescription.textContent = evt.currentTarget.alt;
  openPopup(galleryPopup);
};

const getNewCard = (name, link) => new Card(name, link, cardConfig, onImageClick).createCard();

initialCards.forEach((element) => {
  const newCardElement = getNewCard(element.name, element.link);
  renderCard(newCardElement, cardsContainer, true);
});

function renderCard(cardElement, container, isAppend = false) {
  if (isAppend) {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
}

// popups

const profileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profilePopup');
const profileForm = profilePopup.querySelector('.popup__container');
const nameInput = profilePopup.querySelector('.popup__input[name="name"]');
const descriptionInput = profilePopup.querySelector('.popup__input[name="description"]');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');

const cardCreatorButton = document.querySelector('.profile__add-button');
const cardCreatorPopup = document.querySelector('#cardCreatorPopup');
const cardForm = cardCreatorPopup.querySelector('.popup__container');
const titleInput = cardCreatorPopup.querySelector('.popup__input[name="title"]');
const linkInput = cardCreatorPopup.querySelector('.popup__input[name="link"]');

enablePopupValidation(profilePopup);
const cardCreatorPopupFormValidator = enablePopupValidation(cardCreatorPopup);

const closePopup = (evt) => {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_opened');
  popup.querySelector('.popup__close-button').removeEventListener('click', closePopup);
  popup.removeEventListener('click', closePopupByOverlay);
  document.removeEventListener('keyup', closePopupByEsc);
};

const closePopupByOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt);
  }
};

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    if (popup) {
      closePopup({ target: popup });
    }
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.querySelector('.popup__close-button').addEventListener('click', closePopup);
  popup.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keyup', closePopupByEsc);
}

function enablePopupValidation(popup) {
  const formElement = popup.querySelector(config.formClass);
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
  return formValidator;
}

function openProfilePopup() {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function openCardCreatorPopup() {
  openPopup(cardCreatorPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(evt);
  evt.target.reset();
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardElement = getNewCard(titleInput.value, linkInput.value);
  renderCard(newCardElement, cardsContainer);
  closePopup(evt);
  evt.target.reset();
  cardCreatorPopupFormValidator.disableButtonState();
}

profileButton.addEventListener('click', openProfilePopup);

cardCreatorButton.addEventListener('click', openCardCreatorPopup);

profileForm.addEventListener('submit', handleProfileFormSubmit);

cardForm.addEventListener('submit', handleCardFormSubmit);
