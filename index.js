let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input[name="name"]');
let jobInput = document.querySelector('.popup__input[name="job"]');

editButton.addEventListener("click", toggle);

closeButton.addEventListener("click", toggle);

formElement.addEventListener('submit', formSubmitHandler); 

function toggle() {
  popup.classList.toggle('popup_opened');
  setNameAndJob();
}

function setNameAndJob() {
  let profileName  = document.querySelector('.profile__title').textContent;
  let profileJob  = document.querySelector('.profile__subtitle').textContent;
  nameInput.value = profileName;
  jobInput.value = profileJob;
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 
}

