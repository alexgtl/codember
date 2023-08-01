import fs from 'fs/promises'

export const SERVER_HOSTNAME = '127.0.0.1'
export const SERVER_PORT = 3000

export async function fetchLocalFile(file) {
  try {
    return await fs.readFile(file, { encoding: 'utf8' })
  } catch (err) {
    console.log(err)
  }
}