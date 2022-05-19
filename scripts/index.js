const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input[name="name"]');
const jobInput = document.querySelector('.popup__input[name="job"]');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function onPopupOpenHandler() {
  openPopup(popup);
  return 5;
}

function onPopupCloseHandler() {
  closePopup(popup);
}

function onFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popup);
}

editButton.addEventListener('click', onPopupOpenHandler);

closeButton.addEventListener('click', onPopupCloseHandler);

formElement.addEventListener('submit', onFormSubmitHandler);
