import http from 'http'

const HOSTNAME = '127.0.0.1';
const PORT = 3000;
const ENCRYPTED_STRING = '11610497110107115 102111114 11210897121105110103 9911110010110998101114 11210810197115101 11510497114101'
const SPACE_ASCII_CHAR = 32
const LOWERCASE_Z_ASCII_CHAR = 122

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo');
});

server.listen(PORT, HOSTNAME, async () => {
  console.log(`El servidor se está ejecutando en http://${HOSTNAME}:${PORT}/`)

  const decrypttedText = decrypt(ENCRYPTED_STRING)
  console.log(decrypttedText)
});

function decrypt(encriptedString) {
  let phrase = ''

  const splittedWords = getSplittedWords(encriptedString)
  splittedWords.forEach((asciiString) => {
    let word = '';
    let asciiNumber = 0;
    asciiString.split('').forEach((character) => {
      asciiNumber = asciiNumber * 10 + (character - '0');
      if (asciiNumber >= SPACE_ASCII_CHAR && asciiNumber <= LOWERCASE_Z_ASCII_CHAR) {
        word += String.fromCharCode(asciiNumber);
        asciiNumber = 0;
      }
    });
    phrase += word + ' ';
  });
  return phrase.trim();
}

function getSplittedWords(stringValue) {
  return stringValue.split(' ')
}

