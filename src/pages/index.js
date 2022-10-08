import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { Api } from '../components/Api';
import { config, cardConfig, apiConfig } from '../components/config';

const profileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profilePopup');

const cardCreatorButton = document.querySelector('.profile__add-button');
const cardCreatorPopup = document.querySelector('#cardCreatorPopup');

const avatarEditPopup = document.querySelector('#avatarEditPopup');
const avatarElement = document.querySelector('.profile__avatar-container');

const popupDelete = document.querySelector('#popupDelete');

const popupDeleteWithConfirmation = new PopupWithConfirmation('#popupDelete');
popupDeleteWithConfirmation.setEventListeners();

const popupWithImage = new PopupWithImage('#popupWithImage');
popupWithImage.setEventListeners();

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

let userData = {};

const api = new Api(apiConfig);

const promises = [getUserInfo(), getAllCards()];

Promise.all(promises)
  .then(([data, cards]) => {
    userData = data;
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setUserAvatar(data.avatar);
    cards.reverse();
    cards.forEach((data) => renderCard(data, userData._id));
  })
  .catch((err) => {
    console.log('Ошибка', err);
  });

const getNewCard = (data, userId) =>
  new Card({
    data,
    userId,
    handleFavouriteClick: (cardInstance) => {
      if (cardInstance.getIsLiked()) {
        removeFavourite(cardInstance.getCardId())
          .then(cardInstance.setLikes)
          .catch((err) => {
            console.log('Ошибка', err);
          });
      } else {
        addFavourite(cardInstance.getCardId())
          .then(cardInstance.setLikes)
          .catch((err) => {
            console.log('Ошибка', err);
          });
      }
    },
    handleCardClick: (cardInstance) =>
      popupWithImage.open(cardInstance.getCardName(), cardInstance.getCardLink()),
    handleDelete: (cardInstance) => {
      popupDeleteWithConfirmation.setOnFormSubmitAction(() => {
        const button = getButton(popupDelete);
        const prevButtonText = button.textContent;
        changeButtonSubmit(button, 'Удаление...');
        deleteCard(cardInstance.getCardId())
          .then(() => {
            cardInstance.removeCard();
            popupDeleteWithConfirmation.close();
          })
          .catch((err) => {
            console.log('Ошибка', err);
          })
          .finally(() => {
            changeButtonSubmit(button, prevButtonText);
          });
      });
      popupDeleteWithConfirmation.open();
    },
    cardConfig,
  }).createCard();

const section = new Section('.cards');

function renderCard(data, userId) {
  const newCard = getNewCard(data, userId);
  section.addItem(newCard);
}

const cardCreatorPopupFormValidator = enablePopupValidation(cardCreatorPopup);
const profilePopupValidator = enablePopupValidation(profilePopup);
const avatarPopupValidator = enablePopupValidation(avatarEditPopup);

const handleCardFormSubmit = (values) => {
  const button = getButton(cardCreatorPopup);
  const prevButtonText = button.textContent;
  changeButtonSubmit(button);
  addCard(values.title, values.link)
    .then((data) => {
      renderCard(data, userData._id);
      popupWithCardForm.close();
    })
    .catch((err) => {
      console.log('Ошибка', err);
    })
    .finally(() => {
      changeButtonSubmit(button, prevButtonText);
      cardCreatorPopupFormValidator.disableButtonState();
    });
};
const popupWithCardForm = new PopupWithForm('#cardCreatorPopup', handleCardFormSubmit);
popupWithCardForm.setEventListeners();

const handleProfileFormSubmit = ({ name, description }) => {
  const button = getButton(profilePopup);
  const prevButtonText = button.textContent;
  changeButtonSubmit(button);
  api
    .setUserInfo(name, description)
    .then(({ name, about }) => {
      userInfo.setUserInfo(name, about);
      popupWithProfileForm.close();
    })
    .catch((err) => {
      console.log('Ошибка', err);
    })
    .finally(() => {
      changeButtonSubmit(button, prevButtonText);

      profilePopupValidator.disableButtonState();
    });
};
const popupWithProfileForm = new PopupWithForm('#profilePopup', handleProfileFormSubmit);
popupWithProfileForm.setEventListeners();

const handleAvatarFormSubmit = ({ link }) => {
  const button = getButton(avatarEditPopup);
  const prevButtonText = button.textContent;
  changeButtonSubmit(button);
  api
    .setAvatar(link)
    .then(({ avatar }) => {
      userInfo.setUserAvatar(avatar);
      popupWithAvatarForm.close();
    })
    .catch((err) => {
      console.log('Ошибка', err);
    })
    .finally(() => {
      changeButtonSubmit(button, prevButtonText);
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

function getButton(buttonContainer) {
  return buttonContainer.querySelector(config.buttonElementClass);
}

function getUserInfo() {
  return api.getUserInfo().then((data) => data);
}

function getAllCards() {
  return api.getAllCards().then((data) => data);
}

function addFavourite(cardId) {
  return api.addLike(cardId).then(({ likes }) => likes);
}

function removeFavourite(cardId) {
  return api.deleteLike(cardId).then(({ likes }) => likes);
}

function addCard(title, link) {
  return api.addNewCard(title, link).then((data) => data);
}

function deleteCard(cardId) {
  return api.deleteCard(cardId).then((data) => data);
}

avatarElement.addEventListener('click', openAvatarEditPopup);

profileButton.addEventListener('click', openProfilePopup);

cardCreatorButton.addEventListener('click', popupWithCardForm.open);
