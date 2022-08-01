// 定义记分牌类
class ScorePanel {
  score: number; // 分数
  level: number; // 等级
  scoreElement: HTMLElement; // 登记所在元素
  levelElement: HTMLElement; // 分数所在元素
  maxLevel: number;
  upScore: number; // 需要升级分数的梯度

  constructor(
    maxLevel: number = 10,
    upScore: number = 10,
  ) {
    this.scoreElement = document.getElementById("score")!;
    this.levelElement = document.getElementById("level")!;
    this.score = 0;
    this.level = 1;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 加分
  addScore(): void {
    this.score++;
    this.scoreElement.innerHTML = `${this.score}`;
    // 每加10分，难度增加一次
    if (this.score % this.upScore === 0) {
      this.upLevel();
    }
  }

  upLevel(): void {
    if (this.level < this.maxLevel) {
      this.level++;
      this.levelElement.innerHTML = `${this.level}`;
    }
  }
}

//   const panel = new ScorePanel();
//   panel.addScore();
//   panel.upLevel();

export default ScorePanel;
