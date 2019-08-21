const WIDTH = 400, HEIGHT = 400;
const COLUMN_WIDTH = 15, COLUMN_MARGIN = 1;
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
    let temp;
    for (let i = 0; i < sortArray.length; i++) {
        for (let j = i + 1; j > 0; j --) {
            if (sortArray[j - 1] > sortArray[j]) {
                updateView(ctx, copyArray(sortArray), i, j, j - 1);
                temp = sortArray[j - 1];
                sortArray[j - 1] = sortArray[j];
                sortArray[j] = temp
            } else {
                break;
            }
            updateView(ctx, copyArray(sortArray), i, j, j - 1);
        }
        updateView(ctx, copyArray(sortArray), i, -1, -1);
    }
}

function updateView(ctx, array, orderIndex, currentCompareIndex1, currentCompareIndex2) {
    setTimeout(function () {
        render(ctx, array, orderIndex, currentCompareIndex1, currentCompareIndex2);
    }, animateTime++ * 40)
}

function render(ctx, drowArray, orderIndex, currentCompareIndex1, currentCompareIndex2) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let i = 0; i < LENGTH; i++) {
        if(orderIndex == LENGTH - 1) {
            drowColumn(ctx, i, drowArray[i], COMPLATE_COLOR);
        }else if (i == currentCompareIndex1) {
            drowColumn(ctx, i, drowArray[i], CURRENT_MIN_COLOR);
        } else if (i == currentCompareIndex2) {
            drowColumn(ctx, i, drowArray[i], CURRENT_SELECT_COLOR);
        } else if(i < orderIndex){
            drowColumn(ctx, i, drowArray[i], COMPLATE_COLOR);
        } else {
            drowColumn(ctx, i, drowArray[i], DEFAULT_COLOR);
        }
    }
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
