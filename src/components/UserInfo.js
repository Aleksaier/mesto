export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector, userAvatarSelector) {
    this._name = document.querySelector(userNameSelector);
    this._description = document.querySelector(userDescriptionSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  getUserAvatar() {
    return { link: this._avatar.src };
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
