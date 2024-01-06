import { CsvFileReader } from './CsvFileReader.js'
import { MatchResult } from './constants/index.js'

import type { MatchData } from './CsvFileReader.js'
const reader = new CsvFileReader('football')
await reader.read()

const res = analysis(reader.data)

function analysis(data: MatchData[]) {
  console.log('🚀 ~ file: index.ts:14 ~ analysis ~ data:', data)
  let manUnitedWins = 0
  for (let match of data) {
    if (
      (match[1] === 'Man United' && match[5] === MatchResult.homeWin) ||
      (match[2] === 'Man United' && match[5] === MatchResult.awayWin)
    ) {
      manUnitedWins++
    }
  }
  return manUnitedWins
}
console.log('🚀 ~ file: index.ts:17 ~ analysis ~ analysis:', res)
