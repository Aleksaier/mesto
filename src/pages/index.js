import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { Api } from '../components/Api';

const config = {
  inputErrorClass: 'popup__input_type_error',
  errorElementActiveClass: 'popup__input-error_active',
  buttonElementInactiveClass: 'popup__submit-button_inactive',
  inputClass: '.popup__input',
  buttonElementClass: '.popup__submit-button',
  formClass: '.popup__form',
};
const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    'content-type': 'application/json',
    authorization: '5f03ed22-38d0-40eb-a88c-f70fdfb8e26a',
  },
};

const cardConfig = {
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

const profileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profilePopup');

const cardCreatorButton = document.querySelector('.profile__add-button');
const cardCreatorPopup = document.querySelector('#cardCreatorPopup');

const AvatarEditPopup = document.querySelector('#avatarEditPopup');
const avatarElement = document.querySelector('.profile__avatar-container');

const deletePopup = document.querySelector('#deletePopup');

const deletePopupWithConfirmation = new PopupWithConfirmation('#deletePopup');
deletePopupWithConfirmation.setEventListeners();

const popupWithImage = new PopupWithImage('#popupWithImage');
popupWithImage.setEventListeners();

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

let userData = {};

const api = new Api(apiConfig);

const promises = [getUserInfo(), getAllCards()];

Promise.all(promises).then(([data, cards]) => {
  userData = data;
  userInfo.setUserInfo(data.name, data.about);
  userInfo.setUserAvatar(data.avatar);
  cards.forEach(({ _id, name, link, likes, owner }) =>
    renderCard(
      _id,
      name,
      link,
      likes.length,
      getIsLiked(likes, userData._id),
      getIsOwner(owner._id, userData._id)
    )
  );
});

const getIsLiked = (likes, userId) => likes.find((like) => like._id === userId);
const getIsOwner = (ownerId, userId) => ownerId === userId;

const getNewCard = (cardId, name, link, likesCount, defaultIsLiked, isOwner) =>
  new Card({
    name,
    link,
    defaultLikesCount: likesCount,
    defaultIsLiked,
    handleFavouriteClick: (cardInstance) => {
      if (cardInstance.getIsLiked()) {
        addFavourite(cardId).then((data) =>
          cardInstance.setIsFavourite(getIsLiked(data.likes, userData._id), data.likes.length)
        );
      } else {
        removeFavourite(cardId).then((data) =>
          cardInstance.setIsFavourite(getIsLiked(data.likes, userData._id), data.likes.length)
        );
      }
    },
    isOwner,
    cardConfig,
    handleCardClick: () => popupWithImage.open(name, link),
    handleDelete: (cardInstance) => {
      deletePopupWithConfirmation.setOnFormSubmitAction(() => {
        const button = getButton(deletePopup);
        const prevButtonText = button.textContent;
        changeButtonSubmit(button, 'Удаление...');
        deleteCard(cardId)
          .then(cardInstance.removeCard)
          .finally(() => {
            changeButtonSubmit(button, prevButtonText);
            deletePopupWithConfirmation.close();
          });
      });
      deletePopupWithConfirmation.open();
    },
  }).createCard();

const section = new Section('.cards');

function renderCard(cardId, name, link, likesCount, isLiked, isOwner) {
  const newCard = getNewCard(cardId, name, link, likesCount, isLiked, isOwner);
  section.addItem(newCard);
}

const cardCreatorPopupFormValidator = enablePopupValidation(cardCreatorPopup);
const profilePopupValidator = enablePopupValidation(profilePopup);
const avatarPopupValidator = enablePopupValidation(AvatarEditPopup);

const handleCardFormSubmit = (values) => {
  const button = getButton(cardCreatorPopup);
  const prevButtonText = button.textContent;
  changeButtonSubmit(button);
  addCard(values.title, values.link)
    .then((card) =>
      renderCard(
        card._id,
        card.name,
        card.link,
        card.likes.length,
        getIsLiked(card.likes, userData._id),
        getIsOwner(card.owner._id, userData._id)
      )
    )
    .catch(function (err) {
      console.log('Ошибка', err);
    })
    .finally(() => {
      changeButtonSubmit(button, prevButtonText);
      popupWithCardForm.close();
      cardCreatorPopupFormValidator.disableButtonState();
    });
};
const popupWithCardForm = new PopupWithForm('#cardCreatorPopup', handleCardFormSubmit);
popupWithCardForm.setEventListeners();

const handleProfileFormSubmit = (values) => {
  const button = getButton(profilePopup);
  const prevButtonText = button.textContent;
  changeButtonSubmit(button);
  api
    .setUserInfo(values.name, values.description)
    .then(function (data) {
      userInfo.setUserInfo(data.name, data.about);
    })
    .catch(function (err) {
      console.log('Ошибка', err);
    })
    .finally(() => {
      changeButtonSubmit(button, prevButtonText);
      popupWithProfileForm.close();
      profilePopupValidator.disableButtonState();
    });
};
const popupWithProfileForm = new PopupWithForm('#profilePopup', handleProfileFormSubmit);
popupWithProfileForm.setEventListeners();

const handleAvatarFormSubmit = (values) => {
  const button = getButton(AvatarEditPopup);
  const prevButtonText = button.textContent;
  changeButtonSubmit(button);
  api
    .setAvatar(values.link)
    .then(function (data) {
      userInfo.setUserAvatar(data.avatar);
    })
    .catch(function (err) {
      console.log('Ошибка', err);
    })
    .finally(() => {
      changeButtonSubmit(button, prevButtonText);
      popupWithAvatarForm.close();
      avatarPopupValidator.disableButtonState();
    });
};
const popupWithAvatarForm = new PopupWithForm('#avatarEditPopup', handleAvatarFormSubmit);
popupWithAvatarForm.setEventListeners();

function openAvatarEditPopup() {
  popupWithAvatarForm.open();
  popupWithAvatarForm.setInputValues(userInfo.getUserAvatar());
}

function enablePopupValidation(popup) {
  const formElement = popup.querySelector(config.formClass);
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
  return formValidator;
}

function openProfilePopup() {
  popupWithProfileForm.open();
  popupWithProfileForm.setInputValues(userInfo.getUserInfo());
}

function changeButtonSubmit(button, text = 'Сохранение...') {
  button.textContent = text;
}

function getButton(form) {
  return form.querySelector(config.buttonElementClass);
}

function getUserInfo() {
  return api
    .getUserInfo()
    .then((data) => data)
    .catch(function (err) {
      console.log('Ошибка', err);
    });
}

function getAllCards() {
  return api
    .getAllCards()
    .then((data) => data)
    .catch(function (err) {
      console.log('Ошибка', err);
    });
}

function addFavourite(cardId) {
  return api
    .deleteLike(cardId)
    .then((data) => data)
    .catch(function (err) {
      console.log('Ошибка', err);
    });
}

function removeFavourite(cardId) {
  return api
    .setLike(cardId)
    .then((data) => data)
    .catch(function (err) {
      console.log('Ошибка', err);
    });
}

function addCard(title, link) {
  return api
    .addNewCard(title, link)
    .then((data) => data)
    .catch(function (err) {
      console.log('Ошибка', err);
    });
}

function deleteCard(cardId) {
  return api
    .deleteCard(cardId)
    .then((data) => data)
    .catch(function (err) {
      console.log('Ошибка', err);
    });
}

avatarElement.addEventListener('click', openAvatarEditPopup);

profileButton.addEventListener('click', openProfilePopup);

cardCreatorButton.addEventListener('click', popupWithCardForm.open);
