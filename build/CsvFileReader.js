import fs from 'node:fs/promises';
import path from 'node:path';
export class CsvFileReader {
    constructor(fileName) {
        this.fileName = fileName;
        this.data = [];
    }
    async read() {
        this.data = await fs
            .readFile(path.join(process.cwd(), './football.csv'), 'utf-8')
            .then(raw => {
            return raw.split('\n').map(line => {
                return line.split(',');
            });
        });
    }
}
