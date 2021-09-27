const playBtn = document.querySelector(".header__button");
const gameField = document.querySelector(".game__field");
const timer = document.querySelector(".header__timer");
const counter = document.querySelector(".header__counter");
const popUp = document.querySelector(".pop-up");
const replayBtn = document.querySelector(".pop-up__refresh");
const popUpMsg = document.querySelector(".pop-up__message");
const imgSize = 60;

const carrotsNum = 3;
const bugsNum = 1;

let timerInterval;
let started = false;

function getRandomCoords() {
  const rect = gameField.getBoundingClientRect();
  const x = rect.right - rect.left - imgSize;
  const y = rect.bottom - rect.top - imgSize;
  const coordX = Math.random() * x;
  const coordY = Math.random() * y;
  return [coordX, coordY];
}

function gameOver() {
  clearInterval(timerInterval);
  gameField.style.pointerEvents = "none";
  popUp.classList.remove("hide");
  popUpMsg.innerText = `YOU LOST😥`;
  playBtn.style.visibility = "hidden";
}

function gameWin() {
  clearInterval(timerInterval);
  gameField.style.pointerEvents = "none";
  popUp.classList.remove("hide");
  popUpMsg.innerText = `YOU WIN🎉`;
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
      gameWin();
    }
  } else if (target.classList[1] === "bug") {
    gameOver();
  }
}

function makeItem() {
  for (let i = 0; i < carrotsNum; i++) {
    const carrot = document.createElement("img");
    carrot.setAttribute("src", "../img/carrot.png");
    carrot.setAttribute("class", "item carrot");

    const coords = getRandomCoords();
    carrot.style.top = `${coords[1]}px`;
    carrot.style.right = `${coords[0]}px`;
    gameField.appendChild(carrot);
  }

  for (let i = 0; i < bugsNum; i++) {
    const bug = document.createElement("img");
    bug.setAttribute("src", "../img/bug.png");
    bug.setAttribute("class", "item bug");

    const coords = getRandomCoords();
    bug.style.top = `${coords[1]}px`;
    bug.style.right = `${coords[0]}px`;
    gameField.appendChild(bug);
  }

  gameField.addEventListener("click", onClickItem);
}

function countTimer() {
  let time = 10;
  timer.innerText = `0:${time}`;
  timerInterval = setInterval(() => {
    time--;
    timer.innerText = `0:${time}`;
    if (time === 0) {
      gameOver();
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
  playBtn.style.visibility = "visible";
  playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
  playBtn.removeEventListener("click", startGame);
  playBtn.addEventListener("click", stopGame);
  makeItem();
  countTimer();
}

function init() {
  gameField.style.pointerEvents = "auto";
  clearInterval(timerInterval);
  counter.innerText = carrotsNum;
  while (gameField.hasChildNodes()) {
    gameField.removeChild(gameField.firstChild);
  }
  popUp.classList.add("hide");

  if (!started) {
    playBtn.addEventListener("click", startGame);
  }
  replayBtn.addEventListener("click", () => {
    init();
    startGame();
  });
}

init();
