"use strict";
import GameMap from "./GameMap";
import Player from "./Player";

/**
 * 游戏管理类: 控制游戏的开始 & 绘制 & 重新开始
 */
export default class GameMgr {
  // 单例
  private static instance: null | GameMgr = null;
  private constructor() {}
  public static getInstance(): GameMgr {
    if (GameMgr.instance == null) {
      GameMgr.instance = new GameMgr();
    }
    return GameMgr.instance;
  }

  // 游戏地图
  public gameMap: GameMap = new GameMap();

  // 游戏玩家, activePlayerIndex: 当前可以下棋的玩家
  private p1: Player = new Player("x");
  private p2: Player = new Player("o");
  public activedPlayer: Player = this.p1;

  /**
   * 初始化
   */
  public init(container: HTMLDivElement) {
    // 挂载控制中心
    Player.gameMgr = GameMap.gameMgr = this;

    // 渲染地图
    this.gameMap.render(container);

    // 加载玩家
    this.p1 = new Player("x");
    this.p2 = new Player("o");
    return this;
  }

  /**
   * 开始游戏
   */
  public start(): void {
    // 让p1先手 & 绑定事件
    this.switchPlayer(this.p1);
    this.gameMap.addEvents();
  }

  /**
   * 重新开始游戏
   */
  public restart(): void {
    window.location.reload();
  }

  /**
   * 切换下棋玩家
   */
  public switchPlayer(player: Player | undefined = undefined): void {
    if (player) {
      player.isActive = true;
      this.activedPlayer = player;
    } else {
      this.p1!.isActive = true;
      this.p2!.isActive = true;
      this.activedPlayer!.isActive = false;
      this.activedPlayer = [this.p1, this.p2].find((item) => item!.isActive)!;
    }
  }
}
