import * as fs from "fs"
import * as path from "path"

// Input preparation

const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
const [leftList, rightList] = input
    .split("\n")
    .reduce<[number[], number[]]>(
        ([left, right], line) => {
            const [l, r] = line.split("   ").map(Number)
            left.push(l)
            right.push(r)
            return [left, right]
        },
        [[], []]
    )
// Part 1

leftList.sort((a, b) => a - b)
rightList.sort((a, b) => a - b)

const totalDistance = leftList
    .map((left, index) => {
        const right = rightList[index]
        return left >= right ? left - right : right - left
    })
    .reduce((acc, curr) => acc + curr, 0)

console.log(`Part 1: ${totalDistance}`)

// Part 2

const similarityScore = leftList
    .map((left) => left * rightList.filter((right) => right === left).length)
    .reduce((acc, curr) => acc + curr, 0)

console.log(`Part 2: ${similarityScore}`)
