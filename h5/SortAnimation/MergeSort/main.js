const WIDTH = 1200, HEIGHT = 600;
const COLUMN_WIDTH = 10, COLUMN_MARGIN = 1;
const LENGTH = ~~(WIDTH / (COLUMN_MARGIN + COLUMN_WIDTH));

let sortArray = new Array();
let animationTime = 1;
let ctx;
let orderIndex;

window.onload = function() {
    const canvas = document.getElementById('main');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    init();
    render(ctx, sortArray, -1, -1, -1);
    sort(sortArray);
}

function sort(arr) {
    sortRecursion(arr, 0, LENGTH - 1);
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

    let i = l; j = mid + 1;
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

function animation(ctx, arr, orderIndex, l, r) {
    let renderArr = copyArray(arr, 0, arr.length - 1);
    setTimeout(function() {
        render(ctx, renderArr, orderIndex, l, r);
    }, animationTime ++ * 100);

}

function copyArray(arr, start, end) {
    let itemArr = new Array();
    let index = 0;
    for (let i = start; i <= end; i ++, index ++) 
        itemArr[index] = arr[i];
    return itemArr;
}

function render(ctx, arr, orderIndex, l, r) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    let color;
    for(let i = 0; i < arr.length; i ++) {
        if ( i == orderIndex && i == arr.length - 1)
            color = 'orange'; 
        else if (i == orderIndex)
            color = 'red';
        else if (i >= l && i <= r) 
            color = 'yellow';
        else 
            color = 'orange';
        drawColumn(ctx, i, arr[i], color);
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