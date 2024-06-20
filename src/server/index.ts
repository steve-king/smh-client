import express from 'express'
import http from 'http'
import path from 'path'
import SocketIO from 'socket.io'

const app = express().use(express.json())
const PORT = 3131
const server = http.createServer(app)
const socket = new SocketIO.Server(server)

import { cronTask, log } from '@/server/utils'
import UserConfig from '@/server/modules/UserConfig'
import Spacemesh from '@/server/modules/Spacemesh'
import router from '@/server/router'
import Coingecko from './modules/Coingecko'

Spacemesh.cache.on('set', (key: string, value: any) => {
  socket.emit('update', { key, value })
  // log('DEBUG', 'SOCKET', 'emit', type)
})

UserConfig.onLoad((config: any) => {
  const { coingecko_api_key, coingecko_cache_duration } = config.settings
  Coingecko.init(coingecko_api_key, coingecko_cache_duration)
  Spacemesh.init(config)
  Spacemesh.updateAll()
})
UserConfig.load()

// TODO
// - stop and start cron task in UserConfig.onLoad
// - use the cronInterval config setting
cronTask(Spacemesh.updateAll, 1).start()

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
