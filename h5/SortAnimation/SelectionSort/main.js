const WIDTH = 800, HEIGHT = 400;
const COLUMN_WIDTH = 10, COLUMN_MARGIN = 1;
const LENGTH = ~~(WIDTH / (COLUMN_WIDTH + COLUMN_MARGIN));
const DEFAULT_COLOR = '#293462', CURRENT_SELECT_COLOR = '#f7be16', CURRENT_MIN_COLOR = '#eb7070', COMPLATE_COLOR = '#ff935c'
let currentMinIndex = -1;
let animate = 1;

let sortArray = new Array();
window.onload = function() {
    let canDom = document.getElementById('canvas');
    canDom.width = WIDTH;
    canDom.height = HEIGHT;
    let ctx = canDom.getContext('2d');
    init();
    sort(ctx);
}

function sort(ctx) {
    for (let i = 0; i < LENGTH - 1; i ++) {
        for (let j = i + 1; j < LENGTH; j ++) {
            if (sortArray[j] < sortArray[i]) {
                let item = sortArray[i];
                sortArray[i] = sortArray[j];
                sortArray[j] = item;
            }
            // setTimeout(function() {
            //     render(ctx, JSON.stringify(sortArray), i + 1, j);
            // }, (animate ++) * 100)
        }
        setTimeout(function() {
            render(ctx, JSON.stringify(sortArray), i + 1, -1);
        }, (animate ++) * 100)
    }
}

function render(ctx, drowArray, orderIndex, currentCompareIndex) {
    drowArray = JSON.parse(drowArray);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let i = 0; i < LENGTH; i ++) {
        if (i <= orderIndex) {
            drowColumn(ctx, i, drowArray[i], COMPLATE_COLOR);
        } else if(i == currentCompareIndex) {
            drowColumn(ctx, i, drowArray[i], CURRENT_SELECT_COLOR);
        } else {
            drowColumn(ctx, i, drowArray[i], DEFAULT_COLOR)
        }

    }
}

function drowColumn(ctx, index, height, color) {
    ctx.beginPath();
    let startX = index * (COLUMN_WIDTH + COLUMN_MARGIN);
    let startY = HEIGHT;
    ctx.fillStyle = color;
    ctx.fillRect(startX, startY, COLUMN_WIDTH, - height);
    ctx.closePath();
}

function init() {
    let randomNum;
    for (let i = 0; i < LENGTH; i ++) {
        randomNum = ~~(Math.random() * HEIGHT + 1);
        sortArray[i] = randomNum;
    }
}
