const WIDTH = 400, HEIGHT = 400;
const COLUMN_WIDTH = 20, COLUMN_MARGIN = 1;
const LENGTH = ~~(WIDTH / (COLUMN_MARGIN + COLUMN_WIDTH));

let sortArray = new Array();

let animationTime = 1;

window.onload = function() {
    const canvas = document.getElementById('main');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');
    init();
    sort();
    render(ctx)
}

function sort() {
    let temp = new Array();
    merge(sortArray, 0, LENGTH / 2, LENGTH, temp)
}

function merge(array, first, middle, end, temp) {

}

function render(ctx) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for(let i = 0; i < sortArray.length; i ++) {
        drawColumn(ctx, i, sortArray[i], '#FFC000');
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