import express from 'express'
import http from 'http'
import path from 'path'

import { getConfig, log, cronTask } from '@/server/utils'
import Socket from './socket'
import Store from '@/server/store'

const app = express()
const PORT = 3131
const server = http.createServer(app)
const socket = Socket.init(server)
const config = getConfig()
const store = Store.init(config)

// Routes
app.use(express.json())

app.get('/api', (_req, res) => {
  res.send('Hello from Express api!')
})

app.get('/api/state', (_req, res) => {
  log('INFO', 'http', '[GET] /api/state')
  res.json(store.state)
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')))
}

// Listen
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

// Fetch and emit state
store.fetch()
store.fetchStreams()
cronTask(config.settings?.refreshInterval, store.fetch).start()
store.onUpdate(() => socket.emit('update'))

// Log level
export const logLevel = '' // verbose
