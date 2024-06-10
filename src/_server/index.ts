export const logPreference = ['ERROR'] //['ERROR', 'INFO', 'DEBUG']

import express from 'express'
import http from 'http'
import path from 'path'

import { getConfig, cronTask } from '@/server/utils'
import Socket from './socket'
import Store from '@/server/store'
import routes from '@/server/routes'

const app = express()
const PORT = 3131
const server = http.createServer(app)

const config = getConfig()
const store = Store.init(config)
store.fetch()
store.fetchStreams()
cronTask(config.settings?.refreshInterval, store.fetch).start()

app.use(express.json())
app.use('/api', routes)

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const dist = path.resolve(__dirname, '../../dist')
  app.use(express.static(dist))
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(dist, 'index.html'))
  })
}

// Listen
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)

  // Emit updates
  const socket = Socket.init(server)
  store.onUpdate(() => socket.emit('update'))
})
