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

initialCards.forEach((element) => {
  createCards(element.name, element.link, 'append');
});

function createCards(nameValue, linkValue, penType) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__picture').src = linkValue;
  cardElement.querySelector('.element__picture').alt = nameValue;
  cardElement.querySelector('.element__title').textContent = nameValue;

  if (penType == 'append') {
    cardsContainer.append(cardElement);
  } else if (penType == 'prepend') {
    cardsContainer.prepend(cardElement);
  }
}
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#editPopup');
const closeEditButton = editPopup.querySelector('.popup__close');
const formSubmit = editPopup.querySelector('.popup__container');
const nameInput = editPopup.querySelector('.popup__input[name="name"]');
const jobInput = editPopup.querySelector('.popup__input[name="job"]');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('#addPopup');
const closeAddButton = addPopup.querySelector('.popup__close');
const formSave = addPopup.querySelector('.popup__container');
const cardTitle = document.querySelector('.element__title');
const cardPicture = document.querySelector('.element__picture');
const titleInput = addPopup.querySelector('.popup__input[name="title"]');
const linkInput = addPopup.querySelector('.popup__input[name="link"]');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openEditPopup() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openAddPopup() {
  openPopup(addPopup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closeEditPopup() {
  closePopup(editPopup);
}

function closeAddPopup() {
  closePopup(addPopup);
}

function onFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
}

function onFormSaveHandler(evt) {
  evt.preventDefault();
  createCards(titleInput.value, linkInput.value, 'prepend');
  closePopup(addPopup);
}

editButton.addEventListener('click', openEditPopup);

addButton.addEventListener('click', openAddPopup);

closeEditButton.addEventListener('click', closeEditPopup);

closeAddButton.addEventListener('click', closeAddPopup);

formSubmit.addEventListener('submit', onFormSubmitHandler);

formSave.addEventListener('submit', onFormSaveHandler); //кнопка сохранить
