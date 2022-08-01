import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction: string = "";
  isLive: boolean = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }

  init() {
    // 绑定键盘按下事件
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    this.move();
  }
  keyDownHandler(e: KeyboardEvent) {
    // 检查按下的键是否是上下左右
    this.direction = e.key;
    // console.log(this.direction);
  }

  // 检查吃到食物
  checkEat(X: number, Y: number): void {
    if (X === this.food.getX() && Y === this.food.getY()) {
      this.food.changePosition();
      this.snake.addBody();
      this.scorePanel.addScore();
    }
  }

  move() {
    let X = this.snake.getX();
    let Y = this.snake.getY();

    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;
    }
    this.checkEat(X, Y);
    try {
      this.snake.setX(X);
      this.snake.setY(Y);
    } catch (e: any) {
      alert(e.message);
      this.isLive = false;
    }

    this.isLive &&
      setTimeout(this.move.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }
}

export default GameControl;
