const readline = require('readline')
const fs = require('fs')

const inputData = []
const inputFile = 'input.txt'
const lineReader = readline.createInterface({
    input: fs.createReadStream(inputFile)
});
lineReader.on('line', function (line) {
	inputData.push(parseInt(line))
});
lineReader.on('close', main);

function main(){
	console.log(`The answer to the first half is: ${findNumberOfTimesDepthIncreased()}`)
	console.log(`The answer to the second half is: ${findNumberOfTimesDepthIncreasedWithWindowSize(3)}`)
}

function findNumberOfTimesDepthIncreased(){
	return inputData
		.filter((depth, index) => inputData[index + 1] !== undefined && inputData[index + 1] > depth)
		.length
}

function findNumberOfTimesDepthIncreasedWithWindowSize(windowSize){
	return inputData
		.map((_, index) => inputData.slice(index, index + windowSize))
		.filter((window) => window.length === windowSize)
		.map((window) => window.reduce((prev, curr) => prev + curr))
		.filter((depthSum, index, depthSums) => depthSums[index + 1] ? depthSum < depthSums[index + 1] : false)
		.length
}