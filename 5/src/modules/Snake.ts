class Snake {
  head: HTMLElement;
  bodies: HTMLCollection;
  snake: HTMLElement;

  constructor() {
    this.head = document.querySelector("#snake > div")!;
    this.bodies = document.getElementById("snake")!.getElementsByTagName("div");
    this.snake = document.getElementById("snake")!;
  }

  getX(): number {
    return this.head.offsetLeft;
  }
  getY(): number {
    return this.head.offsetTop;
  }
  setX(x: number): void {
    if (this.getX() === x) return; // 如果没有变化，则不改变
    if (x < 0 || x > 290) throw new Error("撞墙了"); 
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === x) {
      // 发生掉头就往反方向走
      if (x > this.getX()) { // 大于旧值，此时蛇要掉头往右走，应该-10，向左走
        x = this.getX() - 10;
      } else { 
        x = this.getX() + 10;
      }
    }

    this.moveBody();
    this.head.style.left = `${x}px`;
    this.checkHeadBody();
  }
  setY(y: number): void {
    if (this.getY() === y) return; // 如果没有变化，则不改变
    if (y < 0 || y > 290) throw new Error("撞墙了"); // 
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === y) {
      // 发生掉头就往反方向走
      if (y > this.getY()) { // 大于旧值，此时蛇要掉头向下走，应该-10，向上走
        y = this.getY() - 10;
      } else { 
        y = this.getY() + 10;
      }
    }
    this.moveBody();
    this.head.style.top = `${y}px`;
    this.checkHeadBody();
  }
  addBody(): void {
    this.snake.insertAdjacentHTML("beforeend", "<div></div>");
  }
  moveBody(): void {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let preX = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let preY = (this.bodies[i - 1] as HTMLElement).offsetTop;

      (this.bodies[i] as HTMLElement).style.left = `${preX}px`;
      (this.bodies[i] as HTMLElement).style.top = `${preY}px`;
    }
  }
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.getX() === bd.offsetLeft && this.getY() === bd.offsetTop) {
        throw new Error("吃到自己了");
      }
    }
  }
}

export default Snake;