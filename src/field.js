"use strict";

const IMG_SIZE = 60;

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");

class Field {
  constructor(carrotsNum, bugsNum) {
    this.carrotsNum = carrotsNum;
    this.bugsNum = bugsNum;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  setClickListener = (onItemClick) => {
    this.onItemClick = onItemClick;
  };

  onClick = (event) => {
    const target = event.target;

    if (target.matches(".carrot")) {
      playSound(carrotSound);
      target.remove();
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      playSound(bugSound);
      this.onItemClick && this.onItemClick("bug");
    }
  };

  _makeItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - IMG_SIZE;
    const y2 = this.fieldRect.height - IMG_SIZE;

    for (let i = 0; i < count; i++) {
      const img = document.createElement("img");
      img.setAttribute("src", imgPath);
      img.setAttribute("class", `item ${className}`);

      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      img.style.position = "absolute";
      img.style.top = `${y}px`;
      img.style.left = `${x}px`;
      this.field.appendChild(img);
    }
  }

  init() {
    this.field.innerHTML = "";
    this.field.style.pointerEvents = "auto";
    this._makeItem("carrot", this.carrotsNum, "../img/carrot.png");
    this._makeItem("bug", this.bugsNum, "../img/bug.png");
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

export default Field;
