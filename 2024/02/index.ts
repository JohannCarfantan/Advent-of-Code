import * as fs from "fs"
import * as path from "path"

const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
const lines = input.split("\n")
const reports = lines.map((line) => line.split(" ").map(Number))

const enum Direction {
    End = 'end',
    Equals = 'equals',
    Increase = 'increase',
    Decrease = 'decrease',
}

type MovementType = Direction.End | Direction.Equals | Direction.Increase | Direction.Decrease
type Movement = [MovementType] | [Direction.Increase | Direction.Decrease, number]

const movementCache = new Map<string, Movement[]>()

const calculateMovements = (report: number[]): Movement[] => {
    const key = report.join(",")
    const cached = movementCache.get(key)
    if (cached) return cached

    const movements = report.slice(0, -1).map((level, index): Movement => {
        const nextLevel = report[index + 1]
        if (level === nextLevel) return [Direction.Equals]
        const diff = nextLevel - level
        return diff > 0
            ? [Direction.Increase, diff]
            : [Direction.Decrease, -diff]
    })

    movementCache.set(key, movements)
    return movements
}

const isValidDifference = (movement: Movement): boolean => {
    return movement[0] === Direction.Equals || (movement[1] as number >= 1 && movement[1] as number <= 3)
}

const isConsistentDirection = (movements: Movement[]): boolean => {
    const firstDirection = movements[0]?.[0]
    return firstDirection === Direction.Increase || firstDirection === Direction.Decrease
        ? movements.every(m => m[0] === firstDirection)
        : false
}

const isReportValidPart1 = (movements: Movement[]): boolean => {
    return movements.length > 0 && movements.every(isValidDifference) && isConsistentDirection(movements)
}

const isReportValidPart2 = (report: number[]): boolean => {
    if (isReportValidPart1(calculateMovements(report))) return true
    
    return report.some((_, indexToSkip) => 
        isReportValidPart1(
            calculateMovements(
                report.filter((_, index) => index !== indexToSkip)
            )
        )
    )
}

const countValidReports = (reports: number[][], validator: (report: number[]) => boolean): number => {
    return reports.reduce((acc, report) => acc + Number(validator(report)), 0)
}

const validReportsPart1 = countValidReports(reports, report => isReportValidPart1(calculateMovements(report)))
const validReportsPart2 = countValidReports(reports, isReportValidPart2)

console.log(`Part 1: ${validReportsPart1}`)
console.log(`Part 2: ${validReportsPart2}`)