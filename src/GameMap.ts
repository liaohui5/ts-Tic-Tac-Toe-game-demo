import GameMgr from "./GameMgr";
import Player from "./Player";

// 棋盘格子
export interface ChessBlock {
  isTap: boolean;
  mark: string;
  dom: HTMLDivElement;
}

// 创建一个棋盘格子
function createChess(dom: HTMLDivElement): ChessBlock {
  return {
    isTap: false,
    mark: "",
    dom,
  };
}

export default class GameMap {
  // 所有棋盘格子
  private items: Array<ChessBlock> = [];

  // 放棋子的容器(棋盘)
  private container: HTMLDivElement = document.createElement("div");

  // 棋盘 & 棋子的 className
  private containerClassName: string = "chess-container";
  private chessClassName: string = "chess-item";

  // 初始化游戏控制中心
  public constructor(public gameMgr: GameMgr) { }

  /**
   * 渲染地图 && 事件代理
   */
  public render(el: HTMLDivElement): void {
    el.append(this.draw());
    this.addEvents();
  }

  /**
   * 下棋后,更新 dom 元素样式
   * TODO: 美化UI, 放个图片什么的, 而不是直接放一个字符串
   */
  public updateChessView(item: ChessBlock, player: Player) {
    item.dom.textContent = item.mark = player.mark;
  }

  /**
   * draw 绘制地图
   */
  private draw(): DocumentFragment {
    const frag: DocumentFragment = document.createDocumentFragment();

    // container
    this.container.classList.add(this.containerClassName);
    frag.append(this.container);

    // blocks
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
  private addEvents(): void {
    this.container.addEventListener("click", (e: MouseEvent) => {
      for (const item of this.items) {
        if (e.target === item.dom) {
          this.play(item);
          break;
        }
      }
    });
  }

  /**
   * 执行下棋操作
   */
  private play(item: ChessBlock) {
    // 检查当前位置已经有棋子了
    this.gameMgr.activedPlayer.tap(this.items, item, this);
    item.isTap = true;
  }
}
