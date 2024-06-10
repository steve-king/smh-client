import express from 'express'
import http from 'http'
import SocketIO from 'socket.io'

const app = express().use(express.json())
const PORT = 3131
const server = http.createServer(app)
const socket = new SocketIO.Server(server)

import { cronTask, log } from './utils'
import UserConfig from './UserConfig'
import Spacemesh from './Spacemesh'
import router from './router'

Spacemesh.cache.on('set', (key, value) => {
  log('DEBUG', 'CACHE', `set ${key}`)
  log('VERBOSE', JSON.stringify(value))
  socket.emit(key, value)
})

UserConfig.onLoad((data: any) => {
  Spacemesh.init(data)
  Spacemesh.update()
})
UserConfig.load()

cronTask(Spacemesh.update, 1).start()

app.use('/', router)

server.listen(PORT, () => {
  log('INFO', 'SERVER', `listening on http://localhost:${PORT}`)
})

// setTimeout(() => Spacemesh.debugKeys, 10000)
// setTimeout(() => Spacemesh.debugData, 20000)
