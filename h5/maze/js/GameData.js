import Queue from './Queue.js'
import RandomQueue from './RandomQueue.js'

export default class {
    
    constructor() {
        this.map = new Array();
        this.isMove = new Array();
        this.mapSize = 49;
        this.entrance = [1, 0];
        this.exit = [this.mapSize - 2, this.mapSize - 1];
        this.wall = 1;
        this.way = 0;
        this.render = null;
        this.direction = [[-1, 0],[0, -1],[1, 0],[0, 1]];
        this.animationTime = 0;
        this.time = 5;
    }

    /**
     * 初使化地图数组
     */
    init() {
        // 初使化二维数组
        for (let i = 0; i < this.mapSize; i ++) {
            this.map[i] = new Array(); 
            for (let j = 0; j < this.mapSize; j ++) 
                if (i % 2 == 1 && j % 2 == 1)
                    this.map[i][j] = this.way;
                else 
                    this.map[i][j] = this.wall;
        }
        // 把出口打开
        this.map[this.entrance[0]][this.entrance[1]] = this.way;
        this.map[this.exit[0]][this.exit[1]] = this.way;

        this.initIsMoveArr();
    }

    initIsMoveArr() {
        for (let i = 0; i < this.mapSize; i ++) {
            this.isMove[i] = new Array();
            for (let j = 0; j < this.mapSize; j ++) {
                this.isMove[i][j] = false;
            }
        }
    }

    /**
     * 深度优先遍历找出口
     */
    depthFirstSearch() {
        this.initIsMoveArr();
        this.depthFirstSearchRecursion(this.entrance[0], this.entrance[1] + 1);
    }

    // 深度优先递归实现
    depthFirstSearchRecursion(x, y) {
        
        if (this.isArea(x, y) && !this.isMove[x][y] && this.map[x][y] == this.way) {
            this.isMove[x][y] = true;
            this.setCellData(x, y, null);
        }
        
        if (this.isExit(x, y)) 
            return true;

        for (let i = 0; i < 4; i ++) {
            let nextX = x + this.direction[i][0];
            let nextY = y + this.direction[i][1];
            if (this.isArea(nextX, nextY) && !this.isMove[nextX][nextY] && this.map[nextX][nextY] == this.way) {
                if (this.depthFirstSearchRecursion(nextX, nextY)) return true;
            }      
        }

        this.setCellData(x, y, this.way);
        return false;
    }

    // 判断(x, y)是否是出口
    isExit(x, y) {
        if (x == this.exit[0] && y == this.exit[1] - 1) 
            return true;
        return false;
    }

    // 深度优先非递归
    depthFirstSearchNotRecursion() {
        let stack = new Array();

        let first = [this.entrance[0], this.entrance[1] + 1];
        stack.push(first);

        while (stack.length) {
            let cur = stack.pop();
            this.isMove[cur[0]][cur[1]] = true;

            for (let i = 0; i < 4; i ++) {
                let nextX = cur[0] + this.direction[i][0] * 2;
                let nextY = cur[1] + this.direction[i][1] * 2;
                if (this.isArea(nextX, nextY) && !this.isMove[nextX][nextY]) {
                    this.setCellData(cur[0] + this.direction[i][0], cur[1] + this.direction[i][1], this.way);
                    stack.push([nextX, nextY]);
                    this.isMove[nextX][nextY] = true;
                }
            }
        }
    }

    // 广度优先遍历
    breadthFirstSearch() {
        this.initIsMoveArr();
        
        let queue = new Queue();

        let first = [this.entrance[0], this.entrance[1] + 1];
        queue.addLast(first);
        
        while (!queue.isEmpty()) {
            let cur = queue.removeFirst();
            this.isMove[cur[0]][cur[1]] = true;
            this.setCellData(cur[0], cur[1], null);

            for (let i = 0; i < 4; i ++) {
                let nextX = cur[0] + this.direction[i][0];
                let nextY = cur[1] + this.direction[i][1];

                if (this.isArea(nextX, nextY) && !this.isMove[nextX][nextY] && this.map[nextX][nextY] == this.way) {
                    queue.addLast([nextX, nextY]);
                    if (this.isExit(nextX, nextY)) return ;
                }
            }
        }
    }

    // 广度优先遍历, 随机队列, 生成迷宫
    breadthFirstRandomSearch() {
        let randonQueue = new RandomQueue();

        let first = [this.entrance[0], this.entrance[1] + 1];
        randonQueue.add(first);
        
        while (!randonQueue.isEmpty()) {
            let cur = randonQueue.remove();
            this.isMove[cur[0]][cur[1]] = true;

            for (let i = 0; i < 4; i ++) {
                let nextX = cur[0] + this.direction[i][0] * 2;
                let nextY = cur[1] + this.direction[i][1] * 2;

                if (this.isArea(nextX, nextY) && !this.isMove[nextX][nextY]) {
                    this.setCellData(cur[0] + this.direction[i][0], cur[1] + this.direction[i][1], this.way);
                    randonQueue.add([nextX, nextY]);
                    this.isMove[nextX][nextY] = true;
                }
            }
        }
    }

    // 设置map数组数据,并且渲染指定格子
    setCellData(x, y, data) {
        let me = this;
        me.map[x][y] = data;

        setTimeout(() => {
            me.render.drawBlock(x, y, 
                data == this.wall ? this.render.wallColor : 
                    data == this.way ? this.render.wayColor : this.render.searchColor);
        }, this.animationTime ++ * this.time);
    }

    // 判断坐标是否有效
    isArea(x, y) {

        return !(x < 1 || x >= this.mapSize - 1 || y < 1 || y >= this.mapSize - 1);
    }
}