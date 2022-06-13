const cardTemplate = document.querySelector('#element').content;
const cardsContainer = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup__image');

// delete

const getElementByEvent = (e) => e.currentTarget.closest('.element');

const deleteElement = (e) => getElementByEvent(e).remove();

// likes

const setIsFavourite = (e) => e.currentTarget.classList.toggle('element__like_active');

// opening of image

const galleryPopup = document.querySelector('#galleryPopup');

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
const cardTitle = document.querySelector('.element__title');
const cardPicture = document.querySelector('.element__picture');
const titleInput = cardCreatorPopup.querySelector('.popup__input[name="title"]');
const linkInput = cardCreatorPopup.querySelector('.popup__input[name="link"]');

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

const openImage = (evt) => {
  imagePopup.src = evt.currentTarget.src;
  imagePopup.alt = evt.currentTarget.alt;
  document.querySelector('.popup__description').textContent = evt.currentTarget.alt;
  openPopup(galleryPopup);
};

initialCards.forEach((element) => {
  renderCard(createCard(element.name, element.link), cardsContainer, true);
});

function renderCard(cardElement, container, isAppend = false) {
  if (isAppend) {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
}

function createCard(nameValue, linkValue) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__picture');
  cardImage.src = linkValue;
  cardImage.alt = nameValue;
  cardElement.querySelector('.element__title').textContent = nameValue;

  cardElement.querySelector('.element__delete').addEventListener('click', deleteElement);
  cardElement.querySelector('.element__like').addEventListener('click', setIsFavourite);
  cardImage.addEventListener('click', openImage);

  return cardElement;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.querySelector('.popup__close-button').addEventListener('click', closePopup);
  popup.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keyup', closePopupByEsc);
}

function openprofilePopup() {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function opencardCreatorPopup() {
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
  renderCard(createCard(titleInput.value, linkInput.value), cardsContainer);
  closePopup(evt);
  evt.target.reset();
}

profileButton.addEventListener('click', openprofilePopup);

cardCreatorButton.addEventListener('click', opencardCreatorPopup);

profileForm.addEventListener('submit', handleProfileFormSubmit);

cardForm.addEventListener('submit', handleCardFormSubmit);
