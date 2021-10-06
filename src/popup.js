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

  showWithText(message, reason) {
    const icon = this.popUpRefresh.querySelector(".fas");
    if (reason === "win") {
      icon.classList.add("fa-arrow-right");
      icon.classList.remove("fa-redo");
    } else {
      icon.classList.add("fa-redo");
      icon.classList.remove("fa-arrow-right");
    }

    this.popUpMsg.innerText = message;
    this.popUp.classList.remove("hide");
  }

  hide() {
    this.popUp.classList.add("hide");
  }
}

export default PopUp;
