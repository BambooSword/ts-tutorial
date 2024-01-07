import exp from 'constants'
import { CsvFileReader } from './CsvFileReader.js'
import { dateStringToDate } from './utils/index.js'
import { MatchResult } from './constants/index.js'
export type MatchData = [
  Date,
  string,
  string,
  number,
  number,
  MatchResult,
  string
]

export class MatchReader extends CsvFileReader<MatchData> {
  mapRow(row: string[]): MatchData {
    return [
      dateStringToDate(row[0]),
      row[1],
      row[2],
      parseInt(row[3]),
      parseInt(row[4]),
      row[5] as MatchResult,
      row[6],
    ]
  }
}
