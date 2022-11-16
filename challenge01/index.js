import http from 'http'
import fs from 'fs/promises'

const hostname = '127.0.0.1';
const port = 3000;
const regex = /\n/g;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo');
});


const validFields = ['usr', 'eme', 'psw', 'age', 'loc', 'fll']
let globalValidUsers = []

server.listen(port, hostname, async () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`)

  const users = await fetchUsers('users.txt');
  const parsedUsers = parseUsers(users)
  const flattenedUsers = parsedUsers.map(user => user.replace(regex, ' '))
  setValidUsers(flattenedUsers)
  console.log(`The number of valid users is ${globalValidUsers.length} and the last user is ${globalValidUsers.pop()}`)
});



async function fetchUsers(file) {
  try {
    return await fs.readFile(file, { encoding: 'utf8' });
  } catch (err) {
    console.log(err);
  }
}

function parseUsers(users) {
  return users.split('\n\n').filter(element => element.trim())
}

function setValidUsers(users) {
  users.forEach(user => {
    if(isValidUser(user.split(' '))) {
      globalValidUsers.push(user);
    }
  });
}

function isValidUser(fields) {
  let fieldMatches = 0;
  let alreadyFoundFields = [];

  fields.forEach(field => {
    const splittedField = field.split(':')[0]
    if (validFields.includes(splittedField) && !alreadyFoundFields.includes(splittedField)) {
      fieldMatches++
      alreadyFoundFields.push(splittedField)
    }
  });

  return fieldMatches === validFields.length
}