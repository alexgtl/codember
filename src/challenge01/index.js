import { fetchLocalFile, SERVER_HOSTNAME, SERVER_PORT } from '../common.js'
import Server from '../../server.js'

const regex = /\n/g

const USERS_FILE = './src/challenge01/users.txt'
const validFields = ['usr', 'eme', 'psw', 'age', 'loc', 'fll']
let globalValidUsers = []

const server = new Server().getClient()
server.listen(SERVER_PORT, SERVER_HOSTNAME, async () => {
  console.log(`🚀 Server is running under http://${SERVER_HOSTNAME}:${SERVER_PORT}/`)

  const users = await fetchLocalFile(USERS_FILE)
  const parsedUsers = parseUsers(users)
  const flattenedUsers = parsedUsers.map(user => user.replace(regex, ' '))
  setValidUsers(flattenedUsers)
  console.log(`The number of valid users is ${globalValidUsers.length} and the last user is ${globalValidUsers.pop()}`)
})


function parseUsers(users) {
  return users.split('\n\n').filter(element => element.trim())
}

function setValidUsers(users) {
  users.forEach(user => {
    if(isValidUser(user.split(' '))) {
      globalValidUsers.push(user)
    }
  })
}

function isValidUser(fields) {
  let fieldMatches = 0
  let alreadyFoundFields = []

  fields.forEach(field => {
    const splittedField = field.split(':')[0]
    if (validFields.includes(splittedField) && !alreadyFoundFields.includes(splittedField)) {
      fieldMatches++
      alreadyFoundFields.push(splittedField)
    }
  })

  return fieldMatches === validFields.length
}