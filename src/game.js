"use strict";

import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

const INIT_NUM = 1;
const INIT_DURATION = 5;

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
      this.gameDuration, //
      this.carrotsNum, //
      this.bugsNum
    );
  }
}

class Game {
  constructor(gameDuration, carrotsNum, bugsNum) {
    this.level = INIT_NUM;
    this.carrotsNum = carrotsNum;
    this.bugsNum = bugsNum;
    this.gameDuration = gameDuration;

    this.started = false;
    this.score = 0;
    this.point = 0;
    this.timer = undefined;

    this.gameTimer = document.querySelector(".header__timer");
    this.gameScore = document.querySelector(".header__score");
    this.gameTotalScore = document.querySelector(".total-score");
    this.gameBtn = document.querySelector(".header__button");
    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop(Reason.pause, this.gameTotalScore.innerText);
      } else {
        this.start();
      }
    });

    this.gameField = new Field(carrotsNum, bugsNum);
    this.gameField.setClickListener(this.onItemClick);
  }

  setGameStopListener = (onGameStop) => {
    this.onGameStop = onGameStop;
  };

  nextStage() {
    this.level++;
    this.carrotsNum = this.carrotsNum + this.level;
    this.bugsNum = this.bugsNum + this.level;
    this.gameDuration++;
  }

  initStage() {
    this.level = INIT_NUM;
    this.carrotsNum = INIT_NUM;
    this.bugsNum = INIT_NUM;
    this.gameDuration = INIT_DURATION;
    this.point = 0;
    this.updateTotalScoreBoard();
  }

  start() {
    this.started = true;
    this.init();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    this.showTotalScore();
    sound.playBackground();
  }

  stop(reason, point) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    this.gameField.stopMoveItem();
    sound.pauseBackground();

    if (reason !== Reason.win) this.initStage();
    this.onGameStop && this.onGameStop(reason, point);
  }

  onItemClick = (item) => {
    if (!this.started) return;

    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      this.point++;
      this.updateTotalScoreBoard();
      if (this.score === this.carrotsNum) {
        this.stop(Reason.win, this.gameTotalScore.innerText);
        this.nextStage();
        this.gameField.setItemCount(this.carrotsNum);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose, this.gameTotalScore.innerText);
      this.initStage();
      this.stopGameTimer();
    }
  };

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

  showTotalScore() {
    this.gameTotalScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        this.stop(
          this.carrotsNum === this.score ? Reason.win : Reason.lose,
          this.gameTotalScore.innerText
        );
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    let minute = minutes < 10 ? `0${minutes}` : minutes;
    let second = seconds < 10 ? `0${seconds}` : seconds;
    this.gameTimer.innerText = `${minute}:${second}`;
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotsNum - this.score;
  }

  updateTotalScoreBoard() {
    this.gameTotalScore.innerText = this.point;
  }

  init() {
    this.score = 0;
    this.gameField.init(this.carrotsNum);
    this.gameScore.innerText = this.carrotsNum;
  }
}
