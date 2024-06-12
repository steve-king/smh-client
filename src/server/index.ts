import express from 'express'
import http from 'http'
import path from 'path'
import SocketIO from 'socket.io'

const app = express().use(express.json())
const PORT = 3131
const server = http.createServer(app)
const socket = new SocketIO.Server(server)

import { cronTask, log } from './utils'
import UserConfig from './UserConfig'
import Spacemesh from './Spacemesh'
import router from './router'

Spacemesh.cache.on('set', (type: string, payload: any) => {
  socket.emit(type, payload)
  // log('DEBUG', 'SOCKET', 'emit', type)
})

UserConfig.onLoad((data: any) => {
  Spacemesh.init(data)
  Spacemesh.update()
})
UserConfig.load()

cronTask(Spacemesh.update, 1).start()

app.use('/', router)

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const dist = path.resolve(__dirname, '../../dist')
  app.use(express.static(dist))
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(dist, 'index.html'))
  })
}

server.listen(PORT, () => {
  log('INFO', 'SERVER', `listening on http://localhost:${PORT}`)
})

// setTimeout(() => Spacemesh.debugKeys, 10000)
// setTimeout(() => Spacemesh.debugData, 20000)
