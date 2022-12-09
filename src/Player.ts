"use strict";
import GameMap, { IChess } from "./GameMap";
import GameMgr from "./GameMgr";

export default class Player {
  // 游戏控制中心
  public static gameMgr: GameMgr | null = null;

  // 当前玩家是否是可以下棋状态
  public isActive: boolean = false;

  // 当前玩家的棋标记
  public mark: string = "";

  // 当前玩家下棋次数
  public tapCount: number = 0;

  // 构造器
  public constructor(mark: string = "") {
    this.mark = mark;
  }

  /**
   * 下棋
   */
  public tap(items: IChess[], item: IChess, gameMap: GameMap) {
    this.tapCount++;

    // TODO: 可以单独写个方法, 比如放图片, 而不是直接赋值一个字符串
    item.dom.innerText = item.mark = this.mark;
    const gameMgr = Player.gameMgr!;

    // 检测是否游戏获胜
    if (this.checkWin(items, this)) {
      setTimeout(() => {
        alert(`${this.mark} 赢了, 点击确定重新开始`);
        gameMgr.restart();
      });
      return;
    }

    // 检查是否平局
    if (this.checkEqual(gameMgr.p1!, gameMgr.p2!)) {
      setTimeout(() => {
        alert("平局, 点击确定重新开始");
        gameMgr.restart();
      });
      return;
    }

    // 切换当前玩家
    Player.gameMgr?.switchPlayer();
  }

  /**
   * 检测是否平局: 如果下了九次还没有获胜证明平局
   */
  public checkEqual(p1: Player, p2: Player): boolean {
    return p1.tapCount + p2.tapCount === 9;
  }

  /**
   * 检测是否获胜
   */
  public checkWin(items: IChess[], player: Player): boolean {
    // 检测
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
