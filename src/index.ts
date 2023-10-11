class Sorter {
  constructor(public collection: number[] | string) {}
  bubbleSort() {
    const { length } = this.collection
    for (let i = length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        const element = this.collection[j]
        const follow = this.collection[j + 1]
        if (follow < element) this.swap(j, j + 1)
      }
    }
    return this.collection
  }

  swap(i: number, j: number) {
    if (this.collection instanceof Array) {
      ;[this.collection[j], this.collection[i]] = [
        this.collection[i],
        this.collection[j],
      ]
    } else {
    }
  }
}
const mySorter = new Sorter([9, 3, 7, 2])
mySorter.bubbleSort()
console.log('🚀 ~ file: index.ts:24 ~ mySorter hello:==》', mySorter.collection)
