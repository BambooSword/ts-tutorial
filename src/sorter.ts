interface Sortable {
  swap(i: number, j: number): void
  compare(i: number, j: number): boolean
  length: number
}
class Sorter {
  constructor(public collection: Sortable) {}
  bubbleSort() {
    const { length } = this.collection
    for (let i = length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        if (this.collection.compare(j, j + 1)) this.collection.swap(j, j + 1)
      }
    }
    return this.collection
  }
}

export default Sorter
