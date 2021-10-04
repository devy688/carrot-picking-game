"use strict";

import PopUp from "./popup.js";
import Game from "./game.js";

const CARROTS_NUM = 15;
const BUGS_NUM = 10;
const GAME_DURATION_SEC = 15;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const game = new Game(CARROTS_NUM, BUGS_NUM, GAME_DURATION_SEC);
