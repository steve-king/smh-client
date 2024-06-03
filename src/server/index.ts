import express, { Request, Response } from 'express'
import http from 'http'
import path from 'path'

import Socket from './socket'

const app = express()
const PORT = 3131

app.use(express.json())

app.get('/api', (_req: Request, res: Response) => {
  res.send('Hello from Express api!')
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')))
}

const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

Socket.init(server)
export const logLevel = '' // verbose
