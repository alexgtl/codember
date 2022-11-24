import http from 'http'
import fs from 'fs/promises'

const HOSTNAME = '127.0.0.1'
const PORT = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain')
  res.end('Alive!')
});

server.listen(PORT, HOSTNAME, async () => {
  console.log(`Server runnig under http://${HOSTNAME}:${PORT}/`)

  handleZebraColors()
});

async function handleZebraColors() {
  const colors = await fetchColors('./challenge03/colors.txt')
  const parsedColorsToJson = JSON.parse(colors)
  getZebraColors(parsedColorsToJson)
}

async function fetchColors(file) {
  try {
    return await fs.readFile(file, { encoding: 'utf8' });
  } catch (err) {
    console.log(err);
  }
}

function getZebraColors(colors) {
  let maxZebraCounter = 0, lastZebraColor = '', lastSavedColor = '', nextColor = colors[0], currentZebraCounter = 1;

  colors.forEach((currentColor) => {
    if (currentColor !== nextColor || lastSavedColor === currentColor) {
      currentZebraCounter = 1;
    }

    currentZebraCounter++;
    nextColor = lastSavedColor;
    lastSavedColor = currentColor;

    if (currentZebraCounter > maxZebraCounter) {
      maxZebraCounter = currentZebraCounter;
      lastZebraColor = lastSavedColor;
    }
  });


  console.log(lastZebraColor, maxZebraCounter)

  return {
    lastZebraColor,
    maxZebraCounter,
  };
}