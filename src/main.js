"use strict";

import PopUp from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withGameDuration(10)
  .withCarrotCount(5)
  .withBugCount(2)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.pause:
      message = "REPLAY❓";
      sound.playAlert();
      break;
    case Reason.win:
      message = "YOU WIN🎉";
      sound.playWin();
      break;
    case Reason.lose:
      message = "YOU LOST😥";
      sound.playBug();
      break;
    default:
      throw new Error(`not valid reason`);
  }

  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
