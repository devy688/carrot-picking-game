"use strict";

export default class Init {
  constructor(gameLevel) {
    this.gameLevel = gameLevel;
    this.gameDuration;
    this.carrotCount;
    this.bugCount;
  }

  getGameCondition(gameLevel) {
    if (gameLevel === 1) {
      this.gameDuration = 5;
      this.carrotCount = 1;
      this.bugCount = 1;
    } else if (gameLevel === 2) {
      this.gameDuration = 6;
      this.carrotCount = 3;
      this.bugCount = 3;
    } else if (gameLevel === 3) {
      this.gameDuration = 7;
      this.carrotCount = 6;
      this.bugCount = 6;
      return [this.gameDuration, this.carrotCount, this.bugCount];
    }
  }
}

// gameCondition(gameLevel) {
//   this.gameDuration++;
//   // this.gameDuration();
//   // this.carrotAndBugCount();
// }

// gameDuration() {}

// carrotAndBugCount() {}

// import PopUp from "./popup.js";
// import { GameBuilder, Reason } from "./game.js";
// import * as sound from "./sound.js";

// export default class Init {
//   constructor(gameLevel, gameDuration, carrotCount, bugCount) {
//     this.gameLevel = gameLevel;
//     this.gameDuration = gameDuration;
//     this.carrotCount = carrotCount;
//     this.bugCount = bugCount;

//     this.game = new GameBuilder()
//       .withLevel(gameLevel)
//       .withGameDuration(gameDuration)
//       .withCarrotCount(carrotCount)
//       .withBugCount(bugCount)
//       .build();
//     this.game.setGameStopListener((reason) => {
//       let message;
//       switch (reason) {
//         case Reason.pause:
//           message = "REPLAY❓";
//           sound.playAlert();
//           break;
//         case Reason.win:
//           this.gameLevel++;
//           message = "🎉 NEXT STAGE 🎉";
//           sound.playWin();
//           break;
//         case Reason.lose:
//           message = "YOU LOST😥";
//           sound.playBug();
//           break;
//         default:
//           throw new Error(`not valid reason`);
//       }

//       this.gameFinishBanner.showWithText(message, reason);
//     });

//     this.gameFinishBanner = new PopUp(this.gameLevel);
//     this.gameFinishBanner.setClickListener(() => {
//       this.game.start(this.gameLevel);
//     });
//   }

//   setGameNextLevel = (onNextLevel) => {
//     this.onNextLevel = onNextLevel;
//   };

//   makeNewGame = (gameLevel) => {
//     this.game = new GameBuilder()
//       .withLevel(gameLevel)
//       .withGameDuration(gameDuration)
//       .withCarrotCount(carrotCount)
//       .withBugCount(bugCount)
//       .build();
//     this.onNextLevel && this.onNextLevel(gameLevel);
//   };

//   // stop reason이 win이면 다음레벨로 넘어가야 함.
//   // this.onNextLevel && this.onNextLevel(reason, this.level);
// }
