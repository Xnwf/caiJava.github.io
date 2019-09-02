// 横竖方向方块数量
const WIDTH = 5; HEIGTH = 6;
// 方块大小
const CELL_SIZE = 80;
// 间距
const MARGIN = Math.floor(CELL_SIZE / 10);
// 存放数字的二维数组
let board = new Array();
// 移动动画时长
const MOVE_ANIMATION_TIME = 300;
// 最小数字
const MIN_NUMBER = 64;

window.onload = function() {
    init();
    updateGameView();
    // 生成两个数字
    createOneNumber();
    createOneNumber();
}

// 添加键盘监听
window.onkeydown = function(e) {
    switch (e.keyCode) {
        // 左
        case 37 : moveLeft(); break; 
        // 上
        case 38 : moveUp(); break;
        // 右
        case 39 : moveRight(); break;
        // 下
        case 40 : moveDown(); break;
    }
    // 判断是否游戏结束
    if(!(isMoveDown() || isMoveLeft() || isMoveRight() || isMoveUp())) {
        alert('game over!!!');
    }
}

// 判断是否可以向下移动
function isMoveDown() {
    // 遍历上三行
    for (let i = HEIGTH - 2; i >= 0; i --) {
        for (let j = 0; j < WIDTH; j ++) {
            // 如果当前方块不为零0
            if (board[i][j] != 0) {
                // 判断下方是否为零或与当前方块相等
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }                
            }
        }
    }
    return false;
}

function moveDown() {
    if (isMoveDown()) {
        for (let i = HEIGTH - 2; i >= 0; i --) {
            for (let j = 0; j < WIDTH; j ++) {
                // 如果当前方块不为零0
                if (board[i][j] != 0) {
                    for (let k = HEIGTH - 1; k > i; k --) {
                        // 判断下方是否为零或与当前方块相等
                        if (board[k][j] == 0 && noBlockBetweenRow(j, i, k)) {
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            cellMoveAnimation(i, j, k, j);
                        } else if (board[k][j] == board[i][j] && noBlockBetweenRow(j, i, k)) {
                            board[k][j] = board[i][j] * 2;
                            board[i][j] = 0;
                            cellMoveAnimation(i, j, k, j);
                        }
                    }
                }
            }
        }
        // 重新渲染页面
        setTimeout('updateGameView()', MOVE_ANIMATION_TIME);
        // 生成一个随机数字
        setTimeout('createOneNumber()', MOVE_ANIMATION_TIME);
    }
}

// 判断是否可以向上移动
function isMoveUp() {
    // 遍历下3列
    for (let i = 1; i < HEIGTH; i ++) {
        for (let j = 0; j < WIDTH; j ++) {
            if (board[i][j] != 0) {
                // 判断上一格是否与当前格相等，或上一格为零
                if (board[i - 1][j] == 0 || board[i][j] == board[i - 1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function moveUp() {
    if (isMoveUp()) {
        for (let i = 1; i < HEIGTH; i ++) {
            for (let j = 0; j < WIDTH; j ++) {
                if (board[i][j] != 0) {
                    // 遍历当前格子的上方
                    for (let k = 0; k < i; k ++) {
                        // 如果为零，并且k到i没有数字，移动
                        if (board[k][j] == 0 && noBlockBetweenRow(j, k, i)) {
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            cellMoveAnimation(i, j, k, j);
                        } else if (board[k][j] == board[i][j] && noBlockBetweenRow(j, k, i)) {
                            board[k][j] = board[i][j] * 2;
                            board[i][j] = 0;
                            cellMoveAnimation(i, j, k, j);
                        }
                    }
                }
            }
        }
        // 重新渲染页面
        setTimeout('updateGameView()', MOVE_ANIMATION_TIME);
        // 生成一个随机数字
        setTimeout('createOneNumber()', MOVE_ANIMATION_TIME);
    }
}

// 判断第col列和第row1行到row2行是否有数字
function noBlockBetweenRow(col, row1, row2) {
    for (let i = row1 + 1; i < row2; i ++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}

// 判断是否可以向右移动
function isMoveRight() {
    // 遍历左三列，从最右边开始遍历
    for (let i = 0; i < HEIGTH; i ++) {
        for (let j = WIDTH - 2; j >= 0; j --) {
            // 如果当前方块不为零
            if (board[i][j] != 0) {
                // 判断右边是否等于0或者等于当前
                if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 向右移动
function moveRight() {
    if (isMoveRight()) {
        for (let i = 0; i < HEIGTH; i ++) {
            for (let j = WIDTH - 2; j >= 0; j --) {
                // 如果当前方块不为零
                if (board[i][j] != 0) {
                    // 遍历当前方块的右方
                    for (let k = WIDTH - 1; k > j; k --) {
                        if (board[i][k] == board[i][j] && noBloakBetweenRow(i, j, k)){
                            // 移动
                            board[i][k] = board[i][j] * 2;
                            board[i][j] = 0;
                            cellMoveAnimation(i, j, i, k);
                        } else if (board[i][k] == 0 && noBloakBetweenRow(i, j, k)) {
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            cellMoveAnimation(i, j, i, k);
                        }
                    }
                }
            }
        }
        // 重新渲染页面
        setTimeout('updateGameView()', MOVE_ANIMATION_TIME);
        // 生成一个随机数字
        setTimeout('createOneNumber()', MOVE_ANIMATION_TIME);
    }
}

// 判断是否可以向左移动
function isMoveLeft() {
    for (let i = 0; i < HEIGTH; i ++) {
        for (let j = 1; j < WIDTH; j ++) {
            // 如果不等于零，判断左方是否是零或是否相等
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 向左移动
function moveLeft() {
    if (isMoveLeft()) {
        for (let i = 0; i < HEIGTH; i ++) {
            for (let j = 1; j < WIDTH; j ++) {
                // 如果不等于零，判断左方是否是零或是否相等
                if (board[i][j] != 0) {
                    for (let k = 0; k < j; k ++) {
                        // 如果k到j之间没有数字且k与j相等
                        if (board[i][j] == board[i][k] && noBloakBetweenRow(i, k, j)){
                            // 移动
                            board[i][k] = board[i][j] * 2;
                            board[i][j] = 0;
                            cellMoveAnimation(i, j, i, k);
                        }
                        // 如果k位置为零且k到j之间没有数字
                        else if (board[i][k] == 0 && noBloakBetweenRow(i, k, j)) {
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            cellMoveAnimation(i, j, i, k);
                        }

                    }
                }
            }
        }
        // 重新渲染页面
        setTimeout('updateGameView()', MOVE_ANIMATION_TIME);
        // 生成一个随机数字
        setTimeout('createOneNumber()', MOVE_ANIMATION_TIME);
    }
}

// 移动方块动画
function cellMoveAnimation(i, j, toi, toj) {
    $('#cell-' + i + '-' + j).animate({
        top: getPosTop(toi, toj),
        left: getPosLeft(toi, toj)
    }, MOVE_ANIMATION_TIME)
}

// 判断第row行的第col1列到col2列之间有没有数字
function noBloakBetweenRow(row, col1, col2) {
    for (let i = col1 + 1; i < col2; i ++) {
        if (board[row][i] != 0) return false;
    }
    return true;
}

// 更新游戏视图
function updateGameView() {
    // 清除旧的视图
    $('.cell').remove();
    for (let i = 0; i < HEIGTH; i ++) {
        for (let j = 0; j < WIDTH; j ++) {
            $('#game').append('<div class="cell" id="cell-' + i + '-' + j +'"></div>');
            // 判断此处是否是零
            if (board[i][j] == 0) {
                $('#cell-' + i + '-' + j).css('width', 0);
                $('#cell-' + i + '-' + j).css('height', 0);
                $('#cell-' + i + '-' + j).css('top', getPosTop(i, j) + CELL_SIZE / 2);
                $('#cell-' + i + '-' + j).css('left', getPosLeft(i, j) + CELL_SIZE / 2);
            } else {
                $('#cell-' + i + '-' + j).css('width', CELL_SIZE);
                $('#cell-' + i + '-' + j).css('height', CELL_SIZE);
                $('#cell-' + i + '-' + j).css('top', getPosTop(i, j));
                $('#cell-' + i + '-' + j).css('left', getPosLeft(i, j));
                $('#cell-' + i + '-' + j).css('font-size', CELL_SIZE / 2.5);
                $('#cell-' + i + '-' + j).css('line-height', CELL_SIZE + 'px');
                $('#cell-' + i + '-' + j).css('background-color', getColorByNumber(board[i][j]));
                $('#cell-' + i + '-' + j).text(board[i][j]);
            }
        }
    }
}

// 初使化数组和游戏地图
function init() {
    $('#game').css('width', WIDTH * (CELL_SIZE + MARGIN) + MARGIN);
    $('#game').css('height', HEIGTH * (CELL_SIZE + MARGIN) + MARGIN);
    // 初使化数组
    for (let i = 0; i < HEIGTH; i ++) {
        board[i] = new Array();
        for (let j = 0; j < WIDTH; j ++) {
            board[i][j] = 0;
            // 初使化固定的背景方块
            $('#game').append('<div class="default-cell" id="default-' + i + '-' + j + '"></div>');
            $('#default-' + i + '-' + j).css('width', CELL_SIZE);
            $('#default-' + i + '-' + j).css('height', CELL_SIZE);
            $('#default-' + i + '-' + j).css('top', getPosTop(i, j));
            $('#default-' + i + '-' + j).css('left', getPosLeft(i, j));
        }
    }
} 

// 获取方块到上方的距离
function getPosTop(i, j) {
    return i * (CELL_SIZE + MARGIN) + MARGIN;
}
// 获取方块到左方的距离
function getPosLeft(i, j) {
    return j * (CELL_SIZE + MARGIN) + MARGIN;
}

// 生成一个随机的数字
function createOneNumber() {
    let i, j;
    while(true) {
        i = Math.floor(Math.random() * HEIGTH);
        j = Math.floor(Math.random() * WIDTH);
        // 如果此处是零
        if (board[i][j] == 0) {
            board[i][j] = Math.random() > 0.5 ? MIN_NUMBER : 2 * MIN_NUMBER;
            // 显示数字动画
            $('#cell-' + i + '-' + j).css('background-color', getColorByNumber(board[i][j]));
            $('#cell-' + i + '-' + j).text(board[i][j]);
            $('#cell-' + i + '-' + j).css('font-size', CELL_SIZE / 2.5);
            $('#cell-' + i + '-' + j).css('line-height', CELL_SIZE + 'px');
            $('#cell-' + i + '-' + j).animate({
                width: CELL_SIZE,
                height: CELL_SIZE,
                top: getPosTop(i, j),
                left: getPosLeft(i, j),
            }, MOVE_ANIMATION_TIME)
            break;
        }
    }
}

function getColorByNumber(number) {
    switch (number) {
        case 2: return "#eee4da"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67c5f"; break;
        case 64: return "#f65e3b"; break;
        case 128: return "#edcf72"; break;
        case 256: return "#edcc61"; break;
        case 512: return "#9c0"; break;
        case 1024: return "#33b5e5"; break;
        case 2048: return "#09c"; break;
        case 4096: return "#a6c"; break;
        case 8192: return "#93c"; break;
        default: return 'break';
    }
}

