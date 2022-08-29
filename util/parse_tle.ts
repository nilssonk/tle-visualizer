import { Tle } from 'util/tle'

const parseDecimalExponent = (decimalSlice: string, exponentSlice: string) => {
    if (decimalSlice.charAt(0) === '-') {
        const decimal = decimalSlice.slice(1).trimStart()
        const toParse = `-0.${decimal}E${exponentSlice}`
        return parseFloat(toParse)
    }

    const toParse = `0.${decimalSlice.trimStart()}E${exponentSlice}`
    return parseFloat(toParse)
}

const hasChecksumError = (line: string): boolean => {
    const lastIndex = line.length - 1
    const checksum = parseInt(line.charAt(lastIndex))

    if (isNaN(checksum)) {
        return true
    }

    var sum = 0
    for (var i = 0; i < lastIndex; ++i) {
        const c = line.charAt(i)
        if (c === '-') {
            sum += 1
        } else {
            const intVal = parseInt(c)
            if (!isNaN(intVal)) {
                sum += intVal
            }
        }
    }

    return checksum !== sum % 10
}

const classificationMap = new Map([
    ['U', 'Unclassified'],
    ['C', 'Classified'],
    ['S', 'Secret'],
])

function ParseTle(input: string): Tle | null {
    if (input.length === 0) {
        return null
    }

    const [name, line1, line2] = input.split('\n')

    if (!line2 || !line1 || !name) {
        return null
    }

    // Line 1
    const catalogNumber = parseInt(line1.slice(2, 7))
    const classification = classificationMap.get(line1[7])
    const launchYear = parseInt(line1.slice(9, 11))
    const launchNumber = parseInt(line1.slice(11, 14))
    const launchPiece = line1.slice(14, 17)
    const epochYear = parseInt(line1.slice(18, 20))
    const epochDay = parseFloat(line1.slice(20, 32))
    const meanMotionDot = parseFloat(line1.slice(33, 43))
    const meanMotionDoubleDot = parseDecimalExponent(
        line1.slice(44, 50),
        line1.slice(50, 52)
    )
    const dragCoefficient = parseDecimalExponent(
        line1.slice(53, 59),
        line1.slice(59, 61)
    )
    const elementSetNumber = parseInt(line1.slice(64, 68))

    // Line 2
    const inclination = parseFloat(line2.slice(8, 16))
    const rightAscensionOfAscendingNode = parseFloat(line2.slice(17, 25))
    const eccentricity = parseFloat(`0.${line2.slice(26, 33)}`)
    const argumentOfPerigee = parseFloat(line2.slice(34, 42))
    const meanAnomaly = parseFloat(line2.slice(43, 51))
    const meanMotion = parseFloat(line2.slice(52, 63))
    const revolutionNumberAtEpoch = parseInt(line2.slice(63, 68))

    // Checksums
    if (hasChecksumError(line1) || hasChecksumError(line2)) {
        return null
    }

    // Sanity checks
    if (classification === undefined) {
        return null
    }

    return [
        ['Name', name],
        ['Catalog Number', catalogNumber],
        ['Classification', classification],
        ['Launch Year', launchYear],
        ['Launch Number', launchNumber],
        ['Launch Piece', launchPiece],
        ['Epoch Year', epochYear],
        ['Epoch Day', epochDay],
        ['First Derivative of Mean Motion', meanMotionDot],
        ['Second Derivative of Mean Motion', meanMotionDoubleDot],
        ['B* Drag Coefficient', dragCoefficient],
        ['Element Set Number', elementSetNumber],
        ['Inclination', inclination],
        [
            'Right Ascension of the Ascending Node',
            rightAscensionOfAscendingNode,
        ],
        ['Eccentricity', eccentricity],
        ['Argument of Perigee', argumentOfPerigee],
        ['Mean Anomaly', meanAnomaly],
        ['Mean Motion', meanMotion],
        ['Revolutions at Epoch', revolutionNumberAtEpoch],
    ]
}

export default ParseTle
