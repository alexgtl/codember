import Server from '../../server.js'
import { SERVER_HOSTNAME, SERVER_PORT } from '../common.js'

const SPECIAL_CHAR = 5
const MIN_RANGE_NUMBER = 11098
const MAX_RANGE_NUMBER = 98123

let validNumbers = []

const server = new Server().getClient()
server.listen(SERVER_PORT, SERVER_HOSTNAME, async () => {
  console.log(`Server running under http://${SERVER_HOSTNAME}:${SERVER_PORT}/`)

  const generatedNumbers = getNumbersInValidRange()
  recoverPassword(generatedNumbers)
})

function getNumbersInValidRange() {
  let generatedNumbers = []
  for (let i = MIN_RANGE_NUMBER; i <= MAX_RANGE_NUMBER; i++) {
    generatedNumbers.push(i)
  }
  return generatedNumbers
}

function recoverPassword(numbers) {
  numbers.forEach(number => {
    if (isValidNumber(number)) {
      validNumbers.push(number)
    }
  })

  console.log(`submit ${validNumbers.length}-${validNumbers[55]}`)
}

function isValidNumber(number) {
  let specialCharCounter = 0
  let hasLowerThanPreviousNumber = false

  const digits = [...number.toString()].map(digit => +digit)
  for(let i = 0; i <= digits.length; i++) {
    const currentDigit = digits[i]
    const previousDigit = digits[i-1]

    if (currentDigit === SPECIAL_CHAR) {
      specialCharCounter++
    }

    if (previousDigit > currentDigit) {
      hasLowerThanPreviousNumber = true
    }
  }

  return specialCharCounter >= 2 && !hasLowerThanPreviousNumber
}
