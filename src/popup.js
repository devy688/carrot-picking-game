"use strict";

class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUpMsg = document.querySelector(".pop-up__message");
    this.popUpRefresh = document.querySelector(".pop-up__refresh");
    this.popUpRefresh.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener = (onClick) => {
    this.onClick = onClick;
  };

  showWithText(message) {
    this.popUpMsg.innerText = message;

    // gameField.style.pointerEvents = "none";
    this.popUp.classList.remove("hide");
  }

  hide() {
    this.popUp.classList.add("hide");
  }
}

export default PopUp;
