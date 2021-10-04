"use strict";

import PopUp from "./popup.js";
import { GameBuilder } from "./game.js";

const game = new GameBuilder()
  .withGameDuration(3)
  .withCarrotCount(2)
  .withBugCount(2)
  .build();

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

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
