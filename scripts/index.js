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
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', function () {
  openPopup(popup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeButton.addEventListener('click', function () {
  closePopup(popup);
});

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popup);
});
