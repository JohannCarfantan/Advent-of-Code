const readline = require('readline')
const fs = require('fs')

const inputData = []
const inputFile = 'input.txt'
const lineReader = readline.createInterface({
    input: fs.createReadStream(inputFile)
});
lineReader.on('line', function (line) {
    const movement = line.split(' ')
    movement[1] = parseInt(movement[1])
	inputData.push(movement)
});
lineReader.on('close', main);

function main() {
    console.log(`The answer to the first half is: ${multiplyFinalForwardByFinalDepth()}`)
    console.log(`The answer to the second half is: ${multiplyFinalForwardByFinalDepthWithAim()}`)
}

function multiplyFinalForwardByFinalDepth(){
    const movements = {
        'forward': 0,
        'down': 0,
        'up': 0,
    }
    inputData.forEach((movement) => {
        movements[movement[0]] += movement[1]
    })
    return(movements['forward'] * (movements['down'] - movements['up']))
}

function multiplyFinalForwardByFinalDepthWithAim(){
    const movements = {
        'forward': 0,
        'depth': 0,
        'aim': 0
    }
    inputData.forEach((movement) => {
        switch(movement[0]){
            case 'down': 
                movements['aim'] += movement[1]
                break
            case 'up': 
                movements['aim'] -= movement[1]
                break
            case 'forward': 
                movements['forward'] += movement[1]
                movements['depth'] += movements['aim'] * movement[1]
                break
        }
    })
    return movements['forward'] * movements['depth']
}