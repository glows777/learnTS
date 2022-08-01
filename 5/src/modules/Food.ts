// 定义食物类
class Food {
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("food")!;
  }

  // 获取食物X坐标
  getX(): number {
    return this.element.offsetLeft;
  }
  // 获取食物Y坐标
  getY(): number {
    return this.element.offsetTop;
  }

  /**
   * @description: 食物随机生成
   * @return: void
   */
  changePosition(): void {
    // 随机生成X，Y坐标
    // 最小是0，最大是290，蛇每一次移动10px
    let left: number = Math.floor(Math.random() * 29) * 10;
    let top: number = Math.floor(Math.random() * 29) * 10;

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }
}

export default Food;
