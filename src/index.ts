import { NumbersCollection } from './NumbersCollection.js'
import { CharactersCollection } from './CharactersCollection.js'
import { LinkedList } from './LinkedList.js'
const mySorter = new NumbersCollection([9, 8, 7, 6, 5, 4, 3, 2, 1])
mySorter.bubbleSort()
console.log('🚀 ~ file: index.ts:24 ~ mySorter hello:==》', mySorter.data)
const stringSorter = new CharactersCollection('sasdfghjkl')
stringSorter.bubbleSort()
console.log('🚀 ~ file: index.ts:8 ~ stringSorter:', stringSorter.data)
const linkSorter = new LinkedList()
linkSorter.add(1)
linkSorter.add(10)
linkSorter.add(-1)
linkSorter.add(21)
linkSorter.add(51)
linkSorter.bubbleSort()
linkSorter.print()
// console.log('🚀 ~ file: index.ts:17 ~ linkSorter:', linkSorter.print())
