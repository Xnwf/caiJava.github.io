const WIDTH = 1200, HEIGHT = 400;
const COLUMN_WIDTH = 10, COLUMN_MARGIN = 1;
const LENGTH = ~~(WIDTH / (COLUMN_WIDTH + COLUMN_MARGIN));
const DEFAULT_COLOR = '#293462', CURRENT_SELECT_COLOR = '#f7be16', CURRENT_MIN_COLOR = '#ed1250', COMPLATE_COLOR = '#ff935c'

let animateTime = 1;

let sortArray = new Array();

window.onload = function () {
    let canDom = document.getElementById('canvas');
    canDom.width = WIDTH;
    canDom.height = HEIGHT;
    let ctx = canDom.getContext('2d');
    init();
    sort(ctx);
}

function sort(ctx) {
    for (let i = 0; i < sortArray.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < sortArray.length; j++) {
            if (sortArray[j] < sortArray[minIndex]) {
                minIndex = j;
            }
            updateView(ctx, copyArray(sortArray), i, j, minIndex);
        }
        swap(sortArray, i, minIndex);
        updateView(ctx, copyArray(sortArray), i, -1, -1);
    }
}

function updateView(ctx, array, orderIndex, currentCompareIndex, minIndex) {
    setTimeout(function () {
        render(ctx, array, orderIndex, currentCompareIndex, minIndex);
    }, animateTime++ * 30)
}

function render(ctx, drowArray, orderIndex, currentCompareIndex, minIndex) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let i = 0; i < LENGTH; i++) {
        if (i < orderIndex) {
            drowColumn(ctx, i, drowArray[i], COMPLATE_COLOR);
        } else if (i == currentCompareIndex) {
            drowColumn(ctx, i, drowArray[i], CURRENT_SELECT_COLOR);
        } else if (i == minIndex) {
            drowColumn(ctx, i, drowArray[i], CURRENT_MIN_COLOR);
        } else if (i == orderIndex) {
            if (i == LENGTH - 1) {
                drowColumn(ctx, i, drowArray[i], COMPLATE_COLOR);
            } else {
                drowColumn(ctx, i, drowArray[i], 'black');
            }
        } else {
            drowColumn(ctx, i, drowArray[i], DEFAULT_COLOR)
        }

    }
}

function swap(array, i, j) {
    let item = array[i];
    array[i] = array[j];
    array[j] = item;
}

function copyArray(array) {
    let item = []
    for (let i = 0; i < array.length; i++) {
        item[i] = array[i];
    }
    return item;
}

function drowColumn(ctx, index, height, color) {
    let startX = index * (COLUMN_WIDTH + COLUMN_MARGIN);
    let startY = HEIGHT;
    ctx.fillStyle = color;
    ctx.fillRect(startX, startY, COLUMN_WIDTH, - height);
}

function init() {
    for (let i = 0; i < LENGTH; i++) {
        let randomNum = ~~(Math.random() * HEIGHT + 1);
        sortArray[i] = randomNum;
    }
}
