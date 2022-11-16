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
    console.log(`The answer of the first half is: ${getPowerConsuption()}`)

    
    console.log(`The answer of the second half is: ${getLifeSupportRating()}`)
}

function getPowerConsuption(){
    const {epsilon, gamma} = processData(inputData)
    return epsilon * gamma
}

function getLifeSupportRating(){
    let oxygenFilteredData = inputData
    let co2FilteredData = inputData
    let oxygenGenerator = ''
    let co2Scrubber = ''
    for(let bitIndex = 0; bitIndex < inputData[0].length; bitIndex++){
        // Oxygen generator
        if(oxygenFilteredData.length !== 1){
            let {epsilonBits} = processData(oxygenFilteredData)
            oxygenFilteredData = oxygenFilteredData.filter(value => value[bitIndex] === epsilonBits[bitIndex])
        }else{
            oxygenGenerator = binaryToDecimal(oxygenFilteredData[0].join(''))
        }

        // Co2 scrubber
        if(co2FilteredData.length !== 1){
            let {gammaBits} = processData(co2FilteredData)
            co2FilteredData = co2FilteredData.filter(value => value[bitIndex] === gammaBits[bitIndex])
        }else{
            co2Scrubber = binaryToDecimal(co2FilteredData[0].join(''))
        }
    }
    return oxygenGenerator * co2Scrubber
}

function processData(inputArray){
    const oneBitsCounts = countOnesBitPerBit(inputArray)
    const epsilonBits = getEpsilonBits(oneBitsCounts, inputArray.length)
    const gammaBits = getGammaBits(oneBitsCounts, inputArray.length)
    const epsilon = getEpsilon(epsilonBits)
    const gamma = getGamma(gammaBits)

    return {
        epsilonBits,
        gammaBits,
        epsilon,
        gamma
    }
}

function countOnesBitPerBit(inputArray){
    return inputArray.reduce((previousBit, currentBit) => {
        return currentBit.map((bit, index) => {
            return previousBit ? previousBit[index] + bit : 0
        })
    })
}

function getEpsilonBits(oneBitsCounts, threshold){
    return oneBitsCounts.map(sum => sum >= threshold/2 ? 1 : 0)
}

function getGammaBits(oneBitsCounts, threshold){
    return oneBitsCounts.map(sum => sum >= threshold/2 ? 0 : 1)
}

function getEpsilon(epsilonBits){
    return binaryToDecimal(epsilonBits.join(''))
}

function getGamma(gammaBits){
    return binaryToDecimal(gammaBits.join(''))
}

function binaryToDecimal(binaryString){
    return parseInt(binaryString, 2)
}