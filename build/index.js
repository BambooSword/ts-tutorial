import BubbleSort from './test.js';
import { CsvFileReader } from './CsvFileReader.js';
var MatchResult;
(function (MatchResult) {
    MatchResult["homeWin"] = "H";
    MatchResult["awayWin"] = "A";
    MatchResult["draw"] = "D";
})(MatchResult || (MatchResult = {}));
const reader = new CsvFileReader('football');
await reader.read();
const res = analysis(reader.data);
function analysis(data) {
    let manUnitedWins = 0;
    for (let match of data) {
        if ((match[1] === 'Man United' && match[5] === MatchResult.homeWin) ||
            (match[2] === 'Man United' && match[5] === MatchResult.awayWin)) {
            manUnitedWins++;
        }
    }
    return manUnitedWins;
}
console.log('🚀 ~ file: index.ts:17 ~ analysis ~ analysis:', res);
const sorted = BubbleSort([2, 9, 3, 5]);
console.log('🚀 ~ file: index.ts:16 ~ sorted:', sorted);
