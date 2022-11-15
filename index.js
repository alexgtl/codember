const http = require('http');
const fs = require('fs/promises')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo');
});


const validFields = ['usr', 'eme', 'psw', 'age', 'loc', 'fll']
let globalValidUsers = []

server.listen(port, hostname, async () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`)
  await getDocument();
});

async function getDocument() {
  const users = await fetchUsers('users.txt');
  const parsedUsers = parseUsers(users)
  const regex = /\n/g;
  const flattenedUsers = parsedUsers.map(user => user.replace(regex, ' '))
  getValidUsers(flattenedUsers)
  console.log(globalValidUsers.length, globalValidUsers.reverse())
}

async function fetchUsers(file) {
  try {
    return await fs.readFile(file, { encoding: 'utf8' });
  } catch (err) {
    console.log(err);
  }
}

function parseUsers(users) {
  const formatedUsers = users
                        .split('\n\n')
                        .filter(element => element.trim())
  return formatedUsers
}

function getValidUsers(users) {
  const validUsers = users.forEach(user => {
    if(isValidUser(user.split(' '))) {
      globalValidUsers.push(user);
    }
  });
}

function isValidUser(fields) {
  let fieldMatches = 0;
  let alreadyFoundFields = [];

  fields.forEach(field => {
    const splittedField = field.split(':')[0];
    if (validFields.includes(splittedField)) {
      fieldMatches++
      alreadyFoundFields.push(splittedField)
    }
  });

  return fieldMatches === validFields.length
}