const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

export const playCarrot = () => {
  playSound(carrotSound);
};

export const playAlert = () => {
  playSound(alertSound);
};

export const playBug = () => {
  playSound(bugSound);
};

export const playWin = () => {
  playSound(winSound);
};

export const playBackground = () => {
  playSound(bgSound);
};

export const pauseBackground = () => {
  pauseSound(bgSound);
};

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function pauseSound(sound) {
  sound.pause();
}
