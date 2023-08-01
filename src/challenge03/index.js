import Server from '../../server.js'
import { fetchLocalFile, SERVER_HOSTNAME, SERVER_PORT } from '../common.js'

const COLORS_FILE_URL = './src/challenge03/colors.txt'

const server = new Server().getClient()
server.listen(SERVER_PORT, SERVER_HOSTNAME, async () => {
  console.log(`Server runnig under http://${SERVER_HOSTNAME}:${SERVER_PORT}/`)

  handleZebraColors()
})

async function handleZebraColors() {
  const colors = await fetchLocalFile(COLORS_FILE_URL)
  const parsedColorsToJson = JSON.parse(colors)
  getZebraColors(parsedColorsToJson)
}

function getZebraColors(colors) {
  let maxZebraCounter = 0, lastZebraColor = '', lastSavedColor = '', nextColor = colors[0], currentZebraCounter = 1

  colors.forEach((currentColor) => {
    if (currentColor !== nextColor || lastSavedColor === currentColor) {
      currentZebraCounter = 1
    }

    currentZebraCounter++
    nextColor = lastSavedColor
    lastSavedColor = currentColor

    if (currentZebraCounter > maxZebraCounter) {
      maxZebraCounter = currentZebraCounter
      lastZebraColor = lastSavedColor
    }
  })


  console.log(lastZebraColor, maxZebraCounter)

  return {
    lastZebraColor,
    maxZebraCounter,
  }
}