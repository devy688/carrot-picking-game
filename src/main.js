const playBtn = document.querySelector(".header__button");
const gameField = document.querySelector(".game__field");
const imgSize = 60;

let started = false;

function getRandomCoords() {
  const rect = gameField.getBoundingClientRect();
  const x = rect.right - rect.left - imgSize;
  const y = rect.bottom - rect.top - imgSize;
  const coordX = Math.random() * x;
  const coordY = Math.random() * y;
  return [coordX, coordY];
}

function makeItem() {
  for (let i = 0; i < 10; i++) {
    const carrot = document.createElement("img");
    carrot.setAttribute("src", "../img/carrot.png");
    carrot.setAttribute("class", "item carrot");

    const coords = getRandomCoords();
    carrot.style.top = `${coords[1]}px`;
    carrot.style.right = `${coords[0]}px`;
    gameField.appendChild(carrot);
  }

  for (let i = 0; i < 10; i++) {
    const bug = document.createElement("img");
    bug.setAttribute("src", "../img/bug.png");
    bug.setAttribute("class", "item bug");

    const coords = getRandomCoords();
    bug.style.top = `${coords[1]}px`;
    bug.style.right = `${coords[0]}px`;
    gameField.appendChild(bug);
  }
}

function startGame() {
  makeItem();
}

function init() {
  if (!started) playBtn.addEventListener("click", startGame);
}

init();
