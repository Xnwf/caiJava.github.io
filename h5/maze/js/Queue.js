export default class {

    constructor () {
        this.data = new Array();
        this.size = 0;
    }
    
    addLast(e) {
        this.data[this.size] = e;
        this.size ++;
    }

    removeFirst() {
        if (this.size > 0) {
            let first = this.data[0];

            for (let i = 1; i < this.size; i ++)
                this.data[i - 1] = this.data[i];
            this.size --;

            return first;
        } 
        return null;
    }

    isEmpty() {
        return this.size == 0;
    }
}