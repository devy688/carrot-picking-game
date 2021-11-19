"use strict";

import * as sound from "./sound.js";

const IMG_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class Field {
  constructor(carrotsNum, bugsNum) {
    this.carrotsNum = carrotsNum;
    this.bugsNum = bugsNum;
    this.mover = undefined;
    this.setMover = undefined;
    this.intervals = [];
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);

    this.x1 = 0;
    this.y1 = 0;
    this.x2 = this.fieldRect.width - IMG_SIZE;
    this.y2 = this.fieldRect.height - IMG_SIZE;
  }

  // 출력할 아이템 수를 game class에서 전달받은 매개변수로 업데이트
  setItemCount(stageItemCount) {
    this.carrotsNum = stageItemCount;
    this.bugsNum = stageItemCount;
  }

  setClickListener = (onItemClick) => {
    this.onItemClick = onItemClick;
  };

  onClick = (event) => {
    const target = event.target;

    if (target.matches(".carrot")) {
      sound.playCarrot();
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches(".bug")) {
      sound.playBug();
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };

  #makeItem(className, count, imgPath) {
    for (let i = 0; i < count; i++) {
      const img = document.createElement("img");
      img.setAttribute("src", imgPath);
      img.setAttribute("class", `item ${className}`);

      const x = randomNumber(this.x1, this.x2);
      const y = randomNumber(this.y1, this.y2);
      img.style.position = "absolute";
      img.style.top = `${y}px`;
      img.style.left = `${x}px`;
      this.field.appendChild(img);

      className === "bug" && this.#moveItem(img, x, y);
    }
  }

  #moveItem(img, x, y) {
    this.mover = () => {
      const coordX = randomNumber(this.x1, this.x2) - x;
      const coordY = randomNumber(this.y1, this.y2) - y;
      img.style.transform = `translate(${coordX}px, ${coordY}px)`;
    };

    setTimeout(this.mover);
    this.setMover = setInterval(this.mover, 3000);
    this.intervals.push(this.setMover);
  }

  stopMoveItem() {
    // clear all intervals
    for (let i = 0; i < this.intervals.length; i++) {
      clearInterval(this.intervals[i]);
    }

    this.field.style.pointerEvents = "none";
  }

  init(itemsNum) {
    this.field.innerHTML = "";
    this.field.style.pointerEvents = "auto";
    this.#makeItem("carrot", itemsNum, "img/carrot.png");
    this.#makeItem("bug", itemsNum, "img/bug.png");
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
