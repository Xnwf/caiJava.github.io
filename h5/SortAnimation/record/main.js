const WIDTH = 400, HEIGHT = 400;
const COLUMN_WIDTH = 15, COLUMN_MARGIN = 1;
const LENGTH = ~~(WIDTH / (COLUMN_MARGIN + COLUMN_WIDTH));

let sortArray = new Array();

let animationTime = 1;

window.onload = function() {
    const canvas = document.getElementById('main');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');
    init();
    sort(ctx);
}

function sort(ctx) {
    let item;
    for (let i = 0; i < LENGTH; i ++) {
        for (let j = i + 1; j > 0; j --) {
            if (sortArray[j - 1] > sortArray[j]) {
                updateView(ctx, copyArray(sortArray), i, j - 1, j);
                item = sortArray[j - 1];
                sortArray[j - 1] = sortArray[j];
                sortArray[j] = item;
            } else {
                break;
            }
            updateView(ctx, copyArray(sortArray), i, j - 1, j);
        }
        updateView(ctx, copyArray(sortArray), i, -1, -1);
    }
}

function updateView(ctx, array, orderIndex, compareIndex1, compareIndex2) {
    setTimeout(function() {
        render(ctx, array, orderIndex, compareIndex1, compareIndex2);
    }, animationTime ++ * 20);
}

function copyArray(array) {
    let itemArr = new Array();
    for(let i = 0; i < array.length; i ++) {
        itemArr[i] = array[i];
    }
    return itemArr;
}

function render(ctx, array, orderIndex, compareIndex1, compareIndex2) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for(let i = 0; i < array.length; i ++) {
        if (i == compareIndex1) {
            drawColumn(ctx, i, array[i], '#00B050');
        } else if (i == compareIndex2) {
            drawColumn(ctx, i, array[i], '#00B0F0');
        } else if (i < orderIndex) {
            drawColumn(ctx, i, array[i], '#FFC000');
        } else {
            if (orderIndex == array.length - 1) {
                drawColumn(ctx, i, array[i], '#FFC000');
            } else {
                drawColumn(ctx, i, array[i], '#002060');
            }
        }
    }
}

function drawColumn(ctx, index, height, color) {
    ctx.fillStyle = color;
    let x = index * (COLUMN_MARGIN + COLUMN_WIDTH);
    let y = HEIGHT;
    ctx.fillRect(x, y, COLUMN_WIDTH, - height);
    
}

function init() {
    for(let i = 0; i < LENGTH; i ++) {
        sortArray[i] = ~~((Math.random() * HEIGHT) + 1);
    }
}