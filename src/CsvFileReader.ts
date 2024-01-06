import fs from 'node:fs/promises'
import path from 'node:path'
import { MatchResult } from './constants/index.js'
import { dateStringToDate } from './utils/index.js'
export type MatchData = [
  Date,
  string,
  string,
  number,
  number,
  MatchResult,
  string
]
export class CsvFileReader {
  data: MatchData[] = []
  constructor(public fileName: string) {}

  async read() {
    this.data = await fs
      .readFile(path.join(process.cwd(), './football.csv'), 'utf-8')
      .then(raw => {
        return raw
          .split('\n')
          .map(line => {
            return line.split(',')
          })
          .map((row: string[]): MatchData => {
            return [
              dateStringToDate(row[0]),
              row[1],
              row[2],
              parseInt(row[3]),
              parseInt(row[4]),
              row[5] as MatchResult,
              row[6],
            ]
          })
      })
  }
}
