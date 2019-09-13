import GameData from './GameData.js'

export default class {
    constructor() {
        this.ctx = null;
        this.wallColor = 'black';
        this.wayColor = 'white';
        this.searchColor = 'orange';
        this.blockSize = 10;
        this.gameData = null;
        this.animationTime = 0;
    }

    /**
     * 画方块
     * @param {横坐标} x 
     * @param {纵坐标} y 
     * @param {方块颜色} color 
     */
    drawBlock(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
    }

    /**
     * @param {地图数组} mapArr 
     */
    render() {
        for (let i = 0; i < this.gameData.map.length; i ++) {
            for (let j = 0; j < this.gameData.map[i].length; j ++) {
                if (this.gameData.map[i][j] == this.gameData.wall)
                this.drawBlock(j , i, this.wallColor)
            }
        }
    }

    setGameData(gameData) {
        this.gameData = gameData;
        this.render();
    }
}