interface Sortable {
  swap(i: number, j: number): void
  compare(i: number, j: number): boolean
  length: number
}
abstract class Sorter {
  abstract compare(leftIndex: number, rightIndex: number): boolean
  abstract swap(leftIndex: number, rightIndex: number): void
  abstract length: number
  bubbleSort() {
    const { length } = this
    for (let i = length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        if (this.compare(j, j + 1)) this.swap(j, j + 1)
      }
    }
  }
}

export default Sorter
