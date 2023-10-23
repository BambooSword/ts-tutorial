import Sorter from './sorter'
import { NumbersCollection } from './NumbersCollection'
import { CharactersCollection } from './CharactersCollection'
const mySorter = new Sorter(new NumbersCollection([9, 8, 7, 6, 5, 4, 3, 2, 1]))
mySorter.bubbleSort()
console.log('🚀 ~ file: index.ts:24 ~ mySorter hello:==》', mySorter.collection)
const stringSorter = new Sorter(new CharactersCollection('sasdfghjkl'))
stringSorter.bubbleSort()
console.log('🚀 ~ file: index.ts:8 ~ stringSorter:', stringSorter.collection)
