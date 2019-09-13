const width = 1200, height = 400;
const column_width = 8;
const column_margin = 1;
const size = ~~(width / (column_width + column_margin));

let sortArr = new Array();
let ctx;

let animationTime = 0;
let time = 60;

window.onload = function() {
    const canvasDom = document.getElementById('can');
    canvasDom.width = width;
    canvasDom.height = height;
    ctx = canvasDom.getContext('2d');
    
    init();
    render(ctx, sortArr, -1, -1, -1);
    sort(sortArr);
}

function sort(arr) {
    sortRecursion(arr, 0, arr.length - 1)
    animation(ctx, arr, -1, -1, -1);
}

function sortRecursion(arr, l, r) {
    if (l >= r) return;

    let mid = ~~((l + r) / 2);
    sortRecursion(arr, l, mid);
    sortRecursion(arr, mid + 1, r);
    merge(arr, l, mid, r);
}

function merge(arr, l, mid, r) {
    let itemArr = copyArray(arr, l, r);
    
    let i = l, j = mid + 1;
    for (let k = l; k <= r; k ++) {
        if (i > mid) {
            arr[k] = itemArr[j - l];
            j ++;
        } else if (j > r) {
            arr[k] = itemArr[i - l];
            i ++;
        } else if (itemArr[i - l] < itemArr[j - l]) {
            arr[k] = itemArr[i - l];
            i ++;
        } else {
            arr[k] = itemArr[j - l];
            j ++;
        }
        animation(ctx, arr, k, l, r);
    }
}

function animation(ctx, arr, orderIndex, leftIndex, rightIndex) {
    let itemArr = copyArray(arr, 0, arr.length - 1);
    setTimeout(function() {
        render(ctx, itemArr,  orderIndex, leftIndex, rightIndex);
    }, animationTime ++ * time);
}

function copyArray(arr, start, end) {
    let itemArr = new Array();
    let index = 0;
    for (let i = start; i <= end; i ++) {
        itemArr[index] = arr[i];
        index ++;
    }
    return itemArr;
}

function render(ctx, arr ,orderIndex, leftIndex, rightIndex) {
    ctx.clearRect(0, 0, width, height);
    let color;
    for (let i = 0; i < arr.length; i ++) {
        if (i == orderIndex) 
            color = 'red';
        else if (i >= leftIndex && i <= rightIndex) 
            color = 'yellow';
        else 
            color = 'orange';
        drawColumn(ctx, i, arr[i], color);
    }
}

function drawColumn(ctx, index, column_height, color) {
    ctx.fillStyle = color;
    let startX = index * (column_margin + column_width);
    let startY = height;
    ctx.fillRect(startX, startY, column_width, - column_height);
}

function init() {
    for (let i = 0; i < size; i ++) {
        sortArr[i] = ~~(Math.random() * height) + 1;
    }
}