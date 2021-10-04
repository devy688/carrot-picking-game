"use strict";

import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  pause: "pause",
});

// Builder Pattern
export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotsNum = num;
    return this;
  }

  withBugCount(num) {
    this.bugsNum = num;
    return this;
  }

  build() {
    return new Game(
      this.carrotsNum, //
      this.bugsNum,
      this.gameDuration
    );
  }
}

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
      this.stop(Reason.pause);
    } else {
      this.start();
    }
  };

  setGameStopListener = (onGameStop) => {
    this.onGameStop = onGameStop;
  };

  onFieldClick = (item) => {
    if (!this.started) return;

    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotsNum) {
        this.stop(Reason.win);
      }
    } else if (ItemType.bug) {
      this.stopGameTimer();
      this.stop(Reason.lose);
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

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    this.onGameStop && this.onGameStop(reason);
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
        this.stop(this.carrotsNum === this.score ? Reason.win : Reason.lose);
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
