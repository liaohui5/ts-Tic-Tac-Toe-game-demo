import GameMgr from "./GameMgr";

const container = <HTMLDivElement>document.querySelector("#app");

GameMgr.getInstance().init(container).start();
