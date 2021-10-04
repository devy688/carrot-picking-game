"use strict";

import Field from "./field.js";
import * as sound from "./sound.js";

class Game {
  constructor(carrotsNum, bugsNum, gameDuration) {
    this.carrotsNum = carrotsNum;
    this.bugsNum = bugsNum;
    this.gameDuration = gameDuration;

    this.gameTimer = document.querySelector(".header__timer");
    this.gameScore = document.querySelector(".header__score");
    this.gameBtn = document.querySelector(".header__button");
    this.gameBtn.addEventListener("click", this.onClick);

    this.gameField = new Field(carrotsNum, bugsNum);
    this.gameField.setClickListener(this.onFieldClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  onClick = () => {
    if (this.started) {
      this.stop("pause");
    } else {
      this.start();
    }
  };

  setGameStopListener = (onGameStop) => {
    this.onGameStop = onGameStop;
  };

  onFieldClick = (item) => {
    if (!this.started) return;

    if (item === "carrot") {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotsNum) {
        this.finish("win");
      }
    } else if (item === "bug") {
      this.stopGameTimer();
      this.finish("lost");
    }
  };

  start() {
    this.started = true;
    this.init();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    this.onGameStop && this.onGameStop("pause");
    sound.pauseBackground();
    sound.playAlertSound();
  }

  finish(result) {
    if (result === "win") {
      sound.playWinSound();
    } else if (result === "lost") {
      sound.playAlertSound();
    } else if (result === "pause") {
      sound.playAlertSound();
    }
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    this.onGameStop && this.onGameStop(result);
    sound.pauseBackground();
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        this.finish("lost");
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotsNum - this.score;
  }

  init() {
    this.score = 0;
    this.gameField.init();
    this.gameScore.innerText = this.carrotsNum;
  }
}

export default Game;
