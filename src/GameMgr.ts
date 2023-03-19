import GameMap from "./GameMap";
import Player from "./Player";

/**
 * 游戏管理类: 控制游戏的开始 & 绘制 & 重新开始
 */
export default class GameMgr {
  // 单例
  private static instance?: GameMgr;
  private constructor() { }
  public static getInstance(): GameMgr {
    if (GameMgr.instance === undefined) {
      GameMgr.instance = new GameMgr();
    }
    return GameMgr.instance;
  }

  // 游戏地图实例对象
  private static _gameMap?: GameMap;
  public get gameMap() {
    if (!GameMgr._gameMap) {
      GameMgr._gameMap = new GameMap(this);
    }
    return GameMgr._gameMap;
  }

  // 游戏玩家, activePlayerIndex: 当前可以下棋的玩家
  public p1: Player;
  public p2: Player;
  public activedPlayer: Player;

  /**
   * 初始化
   */
  public init(container: HTMLDivElement) {
    // 渲染地图棋盘 && 加载玩家
    this.gameMap.render(container);
    this.p1 = new Player("x");
    this.p2 = new Player("o");
    return this;
  }

  /**
   * 开始游戏
   */
  public start(): void {
    // 设置先手玩家
    this.switchPlayer(this.p1);
  }

  /**
   * 重新开始游戏
   */
  public restart(msg: string): void {
    setTimeout(() => {
      alert(msg);
      window.location.reload();
    });
  }

  /**
   * 切换下棋玩家
   */
  public switchPlayer(player?: Player): void {
    if (player) {
      this.activedPlayer = player;
    } else {
      this.activedPlayer = this.activedPlayer === this.p1 ? this.p2 : this.p1;
    }
  }
}
