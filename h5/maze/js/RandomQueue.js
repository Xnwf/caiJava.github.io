export default class {
    constructor() {
        this.data = new Array();
        this.size = 0;
    }

    add(e) {
        this.data[this.size] = e;
        this.size ++;
    }

    remove() {
        let randIndex = ~~(Math.random() * this.size);
        let result = this.data[randIndex];
        this.data[randIndex] = this.data.pop();
        this.size --;
        return result;
    }

    isEmpty() {
        return this.size == 0;
    }
}