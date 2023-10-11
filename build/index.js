"use strict";
class Sorter {
    constructor(collection) {
        this.collection = collection;
    }
    bubbleSort() {
        if (!Array.isArray(this.collection) || !this.collection.length)
            return;
        for (let i = this.collection.length - 1; i >= 0; i--) {
            for (let j = 0; j < i; j++) {
                const element = this.collection[j];
                const follow = this.collection[j + 1];
                if (follow < element)
                    this.swap(j, j + 1);
            }
        }
        return this.collection;
    }
    swap(i, j) {
        // const a = this.collection[i]
        // const b = this.collection[j]
        // this.collection[i] = b
        // this.collection[j] = a
        ;
        [this.collection[j], this.collection[i]] = [
            this.collection[i],
            this.collection[j],
        ];
    }
}
const mySorter = new Sorter([9, 3, 7, 2]);
mySorter.bubbleSort();
console.log('🚀 ~ file: index.ts:24 ~ mySorter hello:==》', mySorter.collection);
