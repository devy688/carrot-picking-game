"use strict";

const playBtn = document.querySelector(".header__button");
const gameField = document.querySelector(".game__field");
const fieldRect = gameField.getBoundingClientRect();
const timer = document.querySelector(".header__timer");
const counter = document.querySelector(".header__counter");
const popUp = document.querySelector(".pop-up");
const replayBtn = document.querySelector(".pop-up__refresh");
const popUpMsg = document.querySelector(".pop-up__message");
const imgSize = 60;

const carrotsNum = 3;
const bugsNum = 1;
const totalTime = 10;

let timerInterval;
let started = false;

function gameResult(result) {
  if (result === "win") {
    popUpMsg.innerText = `YOU WIN🎉`;
  } else if (result === "lost") {
    popUpMsg.innerText = `YOU LOST😥`;
  }

  clearInterval(timerInterval);
  gameField.style.pointerEvents = "none";
  popUp.classList.remove("hide");
  playBtn.style.visibility = "hidden";
}

function onClickItem(event) {
  const target = event.target;
  let headerCounter = counter.innerText;

  if (target.classList[1] === "carrot") {
    target.style.visibility = "hidden";
    headerCounter--;
    counter.innerText = headerCounter;
    if (headerCounter === 0) {
      gameResult("win");
    }
  } else if (target.classList[1] === "bug") {
    gameResult("lost");
  }
}

function makeItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - imgSize;
  const y2 = fieldRect.height - imgSize;

  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    img.setAttribute("src", imgPath);
    img.setAttribute("class", `item ${className}`);

    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    img.style.position = "absolute";
    img.style.top = `${y}px`;
    img.style.left = `${x}px`;
    gameField.appendChild(img);
  }

  gameField.addEventListener("click", onClickItem);
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function countTimer() {
  let time = totalTime;
  timerInterval = setInterval(() => {
    time--;
    timer.innerText = `0:${time}`;
    if (time === 0) {
      gameResult("lost");
    }
  }, 1000);
}

function stopGame() {
  clearInterval(timerInterval);
  gameField.style.pointerEvents = "none";
  popUp.classList.remove("hide");
  popUpMsg.innerText = `REPLAY?❓`;
  playBtn.style.visibility = "hidden";
}

function startGame() {
  started = true;
  playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
  playBtn.style.visibility = "visible";
  playBtn.removeEventListener("click", startGame);
  playBtn.addEventListener("click", stopGame);
  makeItem("carrot", carrotsNum, "../img/carrot.png");
  makeItem("bug", bugsNum, "../img/bug.png");
  countTimer();
}

function initGame() {
  clearInterval(timerInterval);
  counter.innerText = carrotsNum;
  gameField.style.pointerEvents = "auto";
  timer.innerText = `0:${totalTime}`;
  while (gameField.hasChildNodes()) {
    gameField.removeChild(gameField.firstChild);
  }
  popUp.classList.add("hide");

  if (!started) {
    playBtn.addEventListener("click", startGame);
  }
  replayBtn.addEventListener("click", () => {
    initGame();
    startGame();
  });
}

initGame();
