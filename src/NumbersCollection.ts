import Sorter from './sorter.js'
export class NumbersCollection extends Sorter {
  constructor(public data: number[]) {
    super()
  }

  get length(): number {
    return this.data.length
  }
  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex]
  }
  swap(i: number, j: number) {
    ;[this.data[j], this.data[i]] = [this.data[i], this.data[j]]
  }
}
