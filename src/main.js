"use strict";

import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const CARROTS_NUM = 15;
const BUGS_NUM = 10;
const GAME_DURATION_SEC = 15;

const playBtn = document.querySelector(".header__button");
const gameTimer = document.querySelector(".header__timer");
const gameScore = document.querySelector(".header__score");

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
const gameField = new Field(CARROTS_NUM, BUGS_NUM);

gameFinishBanner.setClickListener(() => {
  startGame();
});

playBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

gameField.setClickListener(onFieldClick);

function startGame() {
  started = true;
  init();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  sound.playBackground();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText("pause");
  sound.pauseBackground();
  sound.playAlertSound();
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    sound.playWinSound();
  } else {
    sound.playAlertSound();
  }
  stopGameTimer();
  sound.pauseBackground();
  gameFinishBanner.showWithText(win ? "win" : "lost");
}

function showStopButton() {
  const icon = playBtn.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  playBtn.style.visibility = "visible";
}

function hideGameButton() {
  playBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      finishGame(false);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function stopGameTimer() {
  clearInterval(timer);
}

function onFieldClick(item) {
  if (!started) return;

  if (item === "carrot") {
    score++;
    updateScoreBoard();
    if (score === CARROTS_NUM) {
      finishGame(true);
    }
  } else if (item === "bug") {
    stopGameTimer();
    finishGame(false);
  }
}

function updateScoreBoard() {
  gameScore.innerText = CARROTS_NUM - score;
}

function init() {
  score = 0;
  gameScore.innerText = CARROTS_NUM;
  gameField.init();
}
