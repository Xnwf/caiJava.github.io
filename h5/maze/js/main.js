import GameData from './GameData.js'
import Render from './Render.js'

let gameDate = new GameData();
gameDate.init();

window.onload = function() {
    let gameData = new GameData();
    let render = new Render();
    
    const canvasDom = document.getElementById('can');

    canvasDom.width = gameData.mapSize * render.blockSize;
    canvasDom.height = gameData.mapSize * render.blockSize;
    const ctx = canvasDom.getContext('2d');

    render.ctx = ctx;

    gameData.init();                // 初使化
    render.setGameData(gameData);   // 设置地图数据,渲染
    gameData.render = render;       // 设置gameData的画布,可以在gameData里面渲染

    // gameData.depthFirstSearchNotRecursion();   // 深度非递归优先
    gameData.breadthFirstRandomSearch();        // 广度优先随机队列,生成maze
    // gameData.breadthFirstSearch();              // 广度优先
    gameData.depthFirstSearch();                // 深度优先找出口

}