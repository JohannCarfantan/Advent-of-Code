import * as fs from "fs"
import * as path from "path"

const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")

function findValidMultiplications(text: string): number[] {
    const regex = /\bmul\((\d{1,3}),(\d{1,3})\)/g

    return Array.from(text.matchAll(regex))
        .map(([_, x, y]) => parseInt(x) * parseInt(y))
}

// Part 1

const matches = findValidMultiplications(input)
const sum = matches.reduce((acc, curr) => acc + curr, 0)

console.log(`Part 1: ${sum}`)

// Part 2

function findValidMultiplicationsWithToggle(text: string): number[] {
    const mulRegex = /\bmul\((\d{1,3}),(\d{1,3})\)/g
    const toggleRegex = /\b(do|don't)\(\)/g
    
    const matches: number[] = []
    let isEnabled = true
    let lastIndex = 0
    
    while (true) {
        const mulMatch = mulRegex.exec(text)
        const toggleMatch = toggleRegex.exec(text)
        
        if (!mulMatch && !toggleMatch) break
        
        if (toggleMatch && (!mulMatch || toggleMatch.index < mulMatch.index)) {
            isEnabled = toggleMatch[1] === 'do'
            lastIndex = toggleMatch.index
        } else if (mulMatch) {
            if (isEnabled) {
                const x = parseInt(mulMatch[1])
                const y = parseInt(mulMatch[2])
                matches.push(x * y)
            }
            lastIndex = mulMatch.index
        }
        
        mulRegex.lastIndex = lastIndex + 1
        toggleRegex.lastIndex = lastIndex + 1
    }
    
    return matches
}

const matchesWithToggle = findValidMultiplicationsWithToggle(input)
const sumWithToggle = matchesWithToggle.reduce((acc, curr) => acc + curr, 0)

console.log(`Part 2: ${sumWithToggle}`)