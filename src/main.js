"use strict";

import PopUp from "./popup.js";
import Game from "./game.js";

const CARROTS_NUM = 2;
const BUGS_NUM = 2;
const GAME_DURATION_SEC = 3;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new Game(CARROTS_NUM, BUGS_NUM, GAME_DURATION_SEC);
game.setGameStopListener((result) => {
  let message;
  switch (result) {
    case "pause":
      message = "REPLAY❓";
      break;
    case "win":
      message = "YOU WIN🎉";
      break;
    case "lost":
      message = "YOU LOST😥";
      break;
    default:
      throw new Error(`알 수 없는 결과`);
  }

  gameFinishBanner.showWithText(message);
});
