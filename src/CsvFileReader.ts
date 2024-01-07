import fs from 'node:fs/promises'
import path from 'node:path'

export abstract class CsvFileReader<TransData> {
  data: TransData[] = []
  constructor(public fileName: string) {}
  abstract mapRow(row: string[]): TransData
  async read() {
    this.data = await fs
      .readFile(path.join(process.cwd(), './football.csv'), 'utf-8')
      .then(raw => {
        return raw
          .split('\n')
          .map(line => {
            return line.split(',')
          })
          .map(this.mapRow)
      })
  }
}
