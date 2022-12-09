import GameMgr from "./GameMgr";

// 棋子
export interface IChess {
  isTap: boolean;
  mark: string;
  dom: HTMLDivElement;
}

// 创建一个棋子
function createChess(dom: HTMLDivElement): IChess {
  return {
    isTap: false,
    mark: "",
    dom,
  };
}

export default class GameMap {
  // 所有棋子
  public items: Array<IChess> = [];

  // 放棋子的容器(棋盘)
  public container: HTMLDivElement = document.createElement("div");

  // 棋盘 & 棋子的 className
  public containerClassName: string = "chess-container";
  public chessClassName: string = "chess-item";

  // 游戏控制中心
  public static gameMgr: GameMgr | null = null;

  /**
   * draw 绘制地图
   */
  public draw(): DocumentFragment {
    const frag: DocumentFragment = document.createDocumentFragment();

    // 先创建一个容器
    this.container.classList.add(this.containerClassName);
    frag.append(this.container);

    // 在创建所有的块: 3 行 3 列
    let item: HTMLDivElement;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        item = document.createElement("div");
        item.classList.add(this.chessClassName);
        this.items.push(createChess(item));
        this.container.append(item);
      }
    }
    return frag;
  }

  /**
   * 事件代理: 监听事件
   */
  public addEvents(): void {
    const selector = `.${this.containerClassName} .${this.chessClassName}`;
    const chessList = document.querySelectorAll(selector)!;
    this.container.addEventListener("click", (e: MouseEvent) => {
      for (let i = 0; i < chessList.length; i++) {
        const item = this.items[i];
        if (e.target === item.dom) {
          GameMap.gameMgr!.activedPlayer!.tap(this.items, item, this);
          break;
        }
      }
    });
  }

  /**
   * 事件代理: 渲染地图
   */
  public render(el: HTMLDivElement): void {
    el.append(this.draw());
  }
}
