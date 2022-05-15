let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input[name="name"]');
let jobInput = document.querySelector('.popup__input[name="job"]');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

editButton.addEventListener('click', toggle);

closeButton.addEventListener('click', toggle);

formElement.addEventListener('submit', formSubmitHandler);

function toggle() {
  popup.classList.toggle('popup_opened');
  setNameAndJob();
}

function setNameAndJob() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  toggle();
}
