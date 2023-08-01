import http from 'http'

export default class Server {
  constructor() {}

  getClient() {
    const STATUS_CODE = 200
    const DEFAULT_HEADER = ['Content-Type', 'text/plain']

    return http.createServer((req, res) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
    })
  }
}


