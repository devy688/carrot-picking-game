# Carrot Picking Game with VanillaJS

_VanillaJS Practice_

Demo Link => https://devy688.github.io/carrot-picking-game/

<br>

## 🥕 Purpose of this project

---

<br>

- Implementing app using VanillaJS
- Getting Element size using WebAPIs
- Learning about Refactoring

<br>

## 🐛 Tech Stack

---

<br>
<img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> 
<img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>
<img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>  
  <br>
  <br>
  <br>

## 💻 About Project

---

<br>

Demo Link => https://devy688.github.io/carrot-picking-game/

<br>
<br>

## 📝 What I Learned

---

<br>

### 1. Object.freeze

```javascript
export const Reason = Object.freeze({
  win: "win",
  lost: "lost",
  pause: "pause",
});
```

<br>

### 2. Builder Pattern

```javascript
/* game.js */
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

<br>

### 3. Create a custom callback

```javascript
/* popup.js */
class PopUp {
  constructor() {
    setClickListener = (onClick) => {
      this.onClick = onClick;
    };
  }
}
```

```javascript
/* main.js*/
const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});
```

<br>

### 4. Refactoring

- Extract Function & Class based on what they are doing
- Separating by program lifecycle

  ```javascript
  start -> nextStage -> stop -> initStage
  ```

<br>
<br>

## 👩‍💻 What I want to update

---

<br>

- [x] Increasing difficulty - _(Oct 6, 2021)_
- [x] Make bugs move - _(Nov 19, 2021)_
- [ ] Create a starter banner
- [ ] Float a special item - get rid of all bugs
