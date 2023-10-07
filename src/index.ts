console.log('====================================')
console.log('hi 123     ')
console.log('====================================')
function bubbleSort(origin: number[]) {
  if (!Array.isArray(origin) || !origin.length) return
  for (let i = 0; i < origin.length - 1; i++) {
    const element = origin[i]
    for (let j = i + 1; j < origin.length; j++) {
      const follow = origin[j]
      if (follow < element) swap(origin, i, j)
    }
  }
  return origin
}
function swap(arr: number[], i: number, j: number) {
  // const a = arr[i]
  // const b = arr[j]
  // arr[i] = b
  // arr[j] = a
  ;[arr[j], arr[i]] = [arr[i], arr[j]]
}

console.log(
  '🚀 ~ file: index.ts:23 ~ bubbleSort:',
  bubbleSort([9, 8, 7, 0, 10])
)
