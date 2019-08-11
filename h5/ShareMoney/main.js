// 画布宽高
const WIDTH = 800, HEIGHT = 800;
// 柱子宽，柱子边距
const COLUMN_WIDTH = 10, COLUMN_MARGIN = 2;
// 柱子颜色
const COLUMN_COLOR = 'black';
// 存放所有人的钱的数组
let moneyArr = new Array();
// 房间里一共有多少人，根据画布和柱子宽确定
const COUNT = ~~(WIDTH / (COLUMN_WIDTH + COLUMN_MARGIN));

window.onload = function() {
    // 获取canvas DOM对象
    let canDom = document.getElementById('canvas');
    // 设置画布宽高 
    canDom.width = WIDTH;
    canDom.height = HEIGHT;
    // 获取canvas 2d对象
    let ctx = canDom.getContext('2d');
    // 初使化数组
    init();
    // 定时器
    setInterval(function() {
        //分钱, 加速
        for(let i = 0; i < 1000; i ++) {
            shareMoney();
        }
        // 清除画布
        clear(ctx);
        // 排序
        sort();
        // 渲染
        render(ctx);
        let result = "max: " + moneyArr[COUNT - 1] + ', min: ' + moneyArr[0];
        document.getElementById('result').innerHTML = result; 
    },100)
}

// 排序
function sort() {
    let item;
    for (let i = 0; i < COUNT - 1; i ++) {
        for (let j = i + 1; j < COUNT; j ++) {
            if (moneyArr[j] < moneyArr[i]) {
                item = moneyArr[j];
                moneyArr[j] = moneyArr[i];
                moneyArr[i] = item;
            }
        }
    }
}

// 清除画布
function clear(ctx) {
    ctx.beginPath();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();
}

// 进行一次随机分钱 
function shareMoney() {
    // 收钱的人
    let inIndex = ~~(Math.random() * COUNT);
    // 付钱的人
    let outIndex = ~~(Math.random() * COUNT);

    moneyArr[inIndex] ++;
    moneyArr[outIndex] --;
}

// 渲染
function render(ctx) {
    for (let i = 0; i < COUNT; i ++) {
        drawColumn(i, moneyArr[i], ctx)
    }
}

/**
 * 画柱子
 * @param {数组索引} index 
 * @param {高} height 
 * @param {canvas对象} ctx 
 */
function drawColumn(index, height, ctx) {
    ctx.beginPath();
    // 计算柱子起点 = 索引 * （柱子宽 + 柱子边距）
    let x = index * (COLUMN_WIDTH + COLUMN_MARGIN);
    // 从画布的中间开始画
    let y = HEIGHT / 2;
    // canvas的坐标是反的
    ctx.fillRect(x, y, COLUMN_WIDTH, -height);
    ctx.closePath();
}

// 初使化数组
function init() {
    for (let i = 0; i < COUNT; i ++) {
        // 每人有一百块
        moneyArr[i] = 100;
    }
}