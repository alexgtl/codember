import Server from '../../server.js'
import { fetchLocalFile, SERVER_HOSTNAME, SERVER_PORT } from '../common.js'

const USERS_FILE = './src/challenge05/users.json'
const SKIP_CHAR = 'x'

const server = new Server().getClient()
server.listen(SERVER_PORT, SERVER_HOSTNAME, async () => {
  console.log(`Server running under http://${SERVER_HOSTNAME}:${SERVER_PORT}/`)

  const users = await fetchLocalFile(USERS_FILE)
  const singleElement = [users[0]]
  const testItem = [0, 'x', 2, 'x', 4, 'x', 6, 'x', 8]
  getWinner(users)

})

function getWinner(userList) {
  if (userList.length === 1) {
    console.log(`submit ${userList}-1`)
    return
  }

  let killer, lastIndex = 1, killed
  for (let i = 0; i < userList.length; i++) {
    const currentItem = userList[i]
    killer = currentItem
    killed = userList[i+1]
    console.log(userList.length)

    if (!killed) {
      console.log(killer)
      console.log(`${killer} kills ${userList[0]} with index ${userList.lastIndexOf(killer)}`)
      return
    }

    console.log(`${killer} kills ${killed} with index ${userList.lastIndexOf(killer)}`)
    i++
    lastIndex++
  }

  if (!killer) {
    console.log('No killer found')
    return
  }

  return {
    "paco": 23,
    0: 2
  }
}

