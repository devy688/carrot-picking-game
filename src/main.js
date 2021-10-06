"use strict";

import PopUp from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(1)
  .withBugCount(1)
  .build();

game.setGameStopListener((reason, point) => {
  let message;
  switch (reason) {
    case Reason.pause:
      message = "REPLAY❓";
      sound.playAlert();
      break;
    case Reason.win:
      message = "🎉 NEXT STAGE 🎉";
      sound.playWin();
      break;
    case Reason.lose:
      message = `${point}점😥`;
      sound.playBug();
      break;
    default:
      throw new Error(`not valid reason`);
  }

  gameFinishBanner.showWithText(message, reason);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
