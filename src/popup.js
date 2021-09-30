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

  showWithText(result) {
    if (result === "win") {
      this.popUpMsg.innerText = `YOU WIN🎉`;
    } else if (result === "lost") {
      this.popUpMsg.innerText = `YOU LOST😥`;
    } else if (result === "pause") {
      this.popUpMsg.innerText = `REPLAY❓`;
    }

    // gameField.style.pointerEvents = "none";
    this.popUp.classList.remove("hide");
  }

  hide() {
    this.popUp.classList.add("hide");
  }
}

export default PopUp;
