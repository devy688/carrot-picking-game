"use strict";

const IMG_SIZE = 60;
const CARROTS_NUM = 15;
const BUGS_NUM = 10;
const GAME_DURATION_SEC = 15;

const playBtn = document.querySelector(".header__button");
const gameField = document.querySelector(".game__field");
const fieldRect = gameField.getBoundingClientRect();
const gameTimer = document.querySelector(".header__timer");
const gameScore = document.querySelector(".header__score");

const popUp = document.querySelector(".pop-up");
const replayBtn = document.querySelector(".pop-up__refresh");
const popUpMsg = document.querySelector(".pop-up__message");

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined;

playBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});
gameField.addEventListener("click", onFieldClick);
replayBtn.addEventListener("click", () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameResult("pause");
  pauseSound(bgSound);
  playSound(alertSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(alertSound);
  }
  stopGameTimer();
  pauseSound(bgSound);
  gameResult(win ? "win" : "lost");
}

function gameResult(result) {
  if (result === "win") {
    popUpMsg.innerText = `YOU WIN🎉`;
  } else if (result === "lost") {
    popUpMsg.innerText = `YOU LOST😥`;
  } else if (result === "pause") {
    popUpMsg.innerText = `REPLAY❓`;
  }

  gameField.style.pointerEvents = "none";
  popUp.classList.remove("hide");
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

function hidePopUp() {
  popUp.classList.add("hide");
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function pauseSound(sound) {
  sound.pause();
}

function onFieldClick(event) {
  if (!started) return;
  const target = event.target;

  if (target.matches(".carrot")) {
    playSound(carrotSound);
    target.remove();
    score++;
    updateScoreBoard();
    if (score === CARROTS_NUM) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    stopGameTimer();
    playSound(bugSound);
    finishGame(false);
  }
}

function updateScoreBoard() {
  gameScore.innerText = CARROTS_NUM - score;
}

function makeItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - IMG_SIZE;
  const y2 = fieldRect.height - IMG_SIZE;

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
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function initGame() {
  score = 0;
  gameField.innerHTML = "";
  gameScore.innerText = CARROTS_NUM;
  gameField.style.pointerEvents = "auto";
  makeItem("carrot", CARROTS_NUM, "../img/carrot.png");
  makeItem("bug", BUGS_NUM, "../img/bug.png");
}
