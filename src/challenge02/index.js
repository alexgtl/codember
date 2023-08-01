import { SERVER_HOSTNAME, SERVER_PORT } from '../common.js'
import Server from '../../server.js'

const ENCRYPTED_STRING = '11610497110107115 102111114 11210897121105110103 9911110010110998101114 11210810197115101 11510497114101'
const SPACE_ASCII_CHAR = 32
const LOWERCASE_Z_ASCII_CHAR = 122

const server = new Server().getClient()
server.listen(SERVER_PORT, SERVER_HOSTNAME, async () => {
  console.log(`El servidor se está ejecutando en http://${SERVER_HOSTNAME}:${SERVER_PORT}/`)

  const decrypttedText = decrypt(ENCRYPTED_STRING)
  console.log(decrypttedText)
})

function decrypt(encriptedString) {
  let phrase = ''

  const splittedWords = getSplittedWords(encriptedString)
  splittedWords.forEach((asciiString) => {
    let word = '', asciiNumber = 0
    const splittedChars = asciiString.split('')

    splittedChars.forEach((character) => {
      asciiNumber = asciiNumber * 10 + (character - '0')

      if (asciiNumber >= SPACE_ASCII_CHAR && asciiNumber <= LOWERCASE_Z_ASCII_CHAR) {
        word += String.fromCharCode(asciiNumber)
        asciiNumber = 0
      }
    })

    phrase += word + ' '
  })

  const trimmedPhrase = phrase.trim()
  return trimmedPhrase
}

function getSplittedWords(stringValue) {
  return stringValue.split(' ')
}

