# carrot-picking-game

### 🥕 VanillaJS practice

- 드림코딩 프론트엔드강의에서 진행한 프로젝트
- 링크: https://devy688.github.io/carrot-picking-game/
  <br>
  <br>

### 📅 프로젝트 기간

- 2021.09.26 ~ 2021.10.06
  <br>
  <br>

### 🥕 사용된 기술

- HTML
- CSS
- Javascript
  <br>
  <br>

### 📚 구현

<br>

### 1. Object.freeze

- 객체를 동결시켜 변경되지 않게 만듬

  ```javascript
  export const Reason = Object.freeze({
    win: "win",
    lost: "lost",
    pause: "pause",
  });
  ```

<br>

### 2. 빌더 패턴

```javascript
// game.js
export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  withCarrotCount(num) {
    this.carrotsNum = num;
    return this;
  }
  withBugCount(num) {
    this.bugsNum = num;
    return this;
  }
  build() {
    return new Game(
      this.gameDuration, //
      this.carrotsNum, //
      this.bugsNum
    );
  }
}
```

```javascript
// main.js
const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(1)
  .withBugCount(1)
  .build();
```

<br>

### 🥕 새로 배운 것

- 콜백함수 등록하기 (코드의 재사용성을 높여줌)

  ```javascript
  // popup.js
  class PopUp {
    constructor() {
      this.popUpRefresh = document.querySelector(".pop-up__refresh");
      this.popUpRefresh.addEventListener("click", () => {
        this.onClick && this.onClick();
        this.hide();
      });
    }
    setClickListener = (onClick) => {
      this.onClick = onClick;
    };
  }
  ```

  ```javascript
  // main.js
  const gameFinishBanner = new PopUp();
  gameFinishBanner.setClickListener(() => {
    game.start();
  });
  ```

- 리팩토링

  - 컴포넌트단위로 클래스 생성하기
  - 프로그램의 생애주기별로 세분화하기

    ```javascript
    // 게임의 3단계
    start() {
      this.started = true;
      this.init();
      this.showStopButton();
      this.showTimerAndScore();
      this.startGameTimer();
      this.showTotalScore();
      sound.playBackground();
    }
    stop(reason, point) {
      this.started = false;
      this.stopGameTimer();
      this.hideGameButton();
      sound.pauseBackground();
      if (reason === Reason.pause) this.initStage();
      this.onGameStop && this.onGameStop(reason, point);
    }
    nextStage() {
      this.level++;
      this.carrotsNum = this.carrotsNum + this.level;
      this.bugsNum = this.bugsNum + this.level;
      this.gameDuration++;
    }
    ```

<br>
