import GameMap, { ChessBlock } from "./GameMap";
import GameMgr from "./GameMgr";

export default class Player {
  // 游戏控制中心实例对象
  private static _gameMgr?: GameMgr;
  public get gameMgr(): GameMgr {
    if (!Player._gameMgr) {
      Player._gameMgr = GameMgr.getInstance();
    }
    return Player._gameMgr;
  }

  // 当前玩家的棋标记
  public mark: string = "";

  // 当前玩家下棋次数
  public playerTapCount: number = 0;

  // 构造器
  public constructor(mark: string = "") {
    this.mark = mark;
  }

  /**
   * 下棋
   */
  public tap(items: ChessBlock[], item: ChessBlock, gameMap: GameMap) {
    // 判断当前格子位置是否有其他棋子
    if (item.isTap) {
      alert("当前位置已经有棋子了");
      return;
    }

    // 下完棋要更新棋盘样式
    this.playerTapCount++;
    gameMap.updateChessView(item, this);

    const { gameMgr } = this;

    // 检测是否游戏获胜
    if (this.checkWin(items)) {
      gameMgr.restart(`${this.mark} 赢了, 点击确定重新开始`);
      return;
    }

    // 检查是否平局
    if (this.checkEqual(gameMgr.p1!, gameMgr.p2!)) {
      gameMgr.restart("平局, 点击确定重新开始");
      return;
    }

    // 切换当前玩家
    gameMgr.switchPlayer();
  }

  /**
   * 检测是否平局: 如果下了九次还没有获胜证明平局
   */
  public checkEqual(p1: Player, p2: Player): boolean {
    return p1.playerTapCount + p2.playerTapCount === 9;
  }

  /**
   * 检测是否获胜
   */
  public checkWin(items: ChessBlock[]): boolean {
    // 检测每一行是否是同一人下的棋子
    const check = (indexArrays: number[][]): boolean => {
      for (const indexes of indexArrays) {
        if (indexes.every((i) => items[i].mark === this.mark)) {
          return true;
        }
      }
      return false;
    };

    // 0 1 2
    // 3 4 5
    // 6 7 8

    // 横排
    const rowsArray: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    if (check(rowsArray)) {
      return true;
    }

    // 竖排
    const colsArray: number[][] = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    if (check(colsArray)) {
      return true;
    }

    // 斜线
    const italicArray: number[][] = [
      [0, 4, 8],
      [2, 4, 6],
    ];
    if (check(italicArray)) {
      return true;
    }
    return false;
  }
}
