const cardTemplate = document.querySelector('#element').content;
const cardsContainer = document.querySelector('.elements');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const imagePopup = document.querySelector('.popup__image');

// delete

const getElementByEvent = (e) => e.currentTarget.closest('.element');

const deleteElement = (e) => getElementByEvent(e).remove();

// likes

const setIsFavourite = (e) => e.currentTarget.classList.toggle('element__like_active');

// opening of image

const galleryPopup = document.querySelector('#galleryPopup');

// popups

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#editPopup');
const profileForm = editPopup.querySelector('.popup__container');
const nameInput = editPopup.querySelector('.popup__input[name="name"]');
const descriptionInput = editPopup.querySelector('.popup__input[name="description"]');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('#addPopup');
const cardForm = addPopup.querySelector('.popup__container');
const cardTitle = document.querySelector('.element__title');
const cardPicture = document.querySelector('.element__picture');
const titleInput = addPopup.querySelector('.popup__input[name="title"]');
const linkInput = addPopup.querySelector('.popup__input[name="link"]');

const closePopup = (e) => {
  const popup = e.target.closest('.popup');
  popup.classList.remove('popup_opened');
  popup.querySelector('.popup__close-button').removeEventListener('click', closePopup);
  popup.removeEventListener('click', closePopupByOverlay);
};

const closePopupByOverlay = (e) => {
  if (e.target === e.currentTarget) {
    closePopup(e);
  }
};

const closePopupByEsc = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    if (popup) {
      popup.classList.remove('popup_opened');
    }
  }
};

const openImage = (e) => {
  imagePopup.src = e.currentTarget.src;
  imagePopup.alt = e.currentTarget.alt;
  document.querySelector('.popup__description').textContent = e.currentTarget.alt;
  openPopup(galleryPopup);
  imagePopup.querySelector('.popup__close-button').addEventListener('click', closePopup);
  imagePopup.addEventListener('click', closePopupByOverlay);
};

initialCards.forEach((element) => {
  createCards(element.name, element.link, 'append');
});

function createCards(nameValue, linkValue, pendType) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__picture');
  cardImage.src = linkValue;
  cardImage.alt = nameValue;
  cardElement.querySelector('.element__title').textContent = nameValue;

  cardElement.querySelector('.element__delete').addEventListener('click', deleteElement);
  cardElement.querySelector('.element__like').addEventListener('click', setIsFavourite);
  cardImage.addEventListener('click', openImage);

  if (pendType == 'append') {
    cardsContainer.append(cardElement);
  } else if (pendType == 'prepend') {
    cardsContainer.prepend(cardElement);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.querySelector('.popup__close-button').addEventListener('click', closePopup);
  popup.addEventListener('click', closePopupByOverlay);
}

function openEditPopup() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function openAddPopup() {
  openPopup(addPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editPopup);
  evt.target.reset();
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  createCards(titleInput.value, linkInput.value, 'prepend');
  closePopup(addPopup);
  evt.target.reset();
}

editButton.addEventListener('click', openEditPopup);

addButton.addEventListener('click', openAddPopup);

profileForm.addEventListener('submit', handleProfileFormSubmit);

cardForm.addEventListener('submit', handleCardFormSubmit);

const container = document.querySelector('.container');

document.addEventListener('keyup', closePopupByEsc);
