const readline = require('readline')
const fs = require('fs')

const inputData = []
const inputFile = 'input.txt'
const lineReader = readline.createInterface({
    input: fs.createReadStream(inputFile)
});
lineReader.on('line', function (line) {
    inputData.push(line.split('').map(x => parseInt(x)))
});
lineReader.on('close', main);

function main() {
    console.log(inputData)
}