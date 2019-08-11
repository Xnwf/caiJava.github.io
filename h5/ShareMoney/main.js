// 画布宽高
const WIDTH = 800, HEIGHT = 800;
// 柱子宽
const COLUMN_WIDTH = 10;
// 柱子间距
const COLUMN_MARGIN = 2;
// 柱子颜色
const COLUMN_COLOR = 'black';
// 存放所有人的钱的数组
let moneyArr = new Array();
// 房间一共有多少人，根据画布宽和柱子宽，柱子间距来确定
const COUNT = ~~(WIDTH / (COLUMN_WIDTH + COLUMN_MARGIN));

window.onload = function() {
    // 获取canvas DOM对象 
    const canDom = document.getElementById('canvas');
    // 设置画布宽高
    canDom.width = WIDTH;
    canDom.height = HEIGHT;
    // 获取canvas 2d对象
    let ctx = canDom.getContext('2d');
    init();
    setInterval(function() {
        // 加速
        for (let i = 0; i < 500; i ++) {
            //　分钱
            share();
        }
        // 排序
        sort();
        let result = "最有钱：" + moneyArr[COUNT - 1] + ", 最穷: " + moneyArr[0];
        document.getElementById('result').innerHTML = result;
        // 清除画布
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        render(ctx);
    }, 50)
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


// 进行一次随机分钱
function share() {
    let outIndex = ~~(Math.random() * COUNT);
    let inIndex = ~~(Math.random() * COUNT);
    // 加一元
    moneyArr[inIndex] ++;
    // 减一元
    moneyArr[outIndex] --;
}

// 渲染
function render(ctx) {
    for (let i = 0; i < COUNT; i ++) {
        drawColumn(i, moneyArr[i], ctx);
    }
}

/**
 * 封装画柱子的函数
 * @param {*} index 第几根柱子，数组的索引 
 * @param {*} height 柱子高度
 * @param {*} ctx canves 2d
 */
function drawColumn(index, height, ctx) {
    // 柱子起点,从画布的中心开始画
    let startY = HEIGHT / 2;
    let startX = index * (COLUMN_WIDTH + COLUMN_MARGIN);
    ctx.beginPath();
    // canvas坐标是反的
    ctx.fillRect(startX, startY, COLUMN_WIDTH, -height);
    ctx.closePath();
}

// 初使化数组，每人有一百元
function init() {
    for (let i = 0; i < COUNT; i ++) {
        moneyArr[i] = 100; 
    }
}