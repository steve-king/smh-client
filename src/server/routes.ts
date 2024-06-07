import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { log, getConfig, writeConfig } from '@/server/utils'
import store from '@/server/store'
const router = express.Router()

// Routes
router.get('/', (_req, res) => {
  res.send('smh-client api')
})

router.get('/state', (_req, res) => {
  log('INFO', 'http', '[GET] /api/state')
  res.json(store.state)
})

router.post('/node', (req, res) => {
  const data = req.body
  log('INFO', 'http', '[POST] /api/node ' + JSON.stringify(data))

  const config = getConfig()
  config.nodes.push({
    id: uuidv4(),
    ...data,
  })

  if (writeConfig(config)) {
    store.init(config)
    res.json({ message: 'Data received successfully', receivedData: data })
  } else {
    res.status(500).json({ error: true, message: 'Error saving config' })
  }
})

router.delete('/node/:id', (req, res) => {
  log('INFO', 'http', '[DELETE] /api/node/' + req.params.id)

  try {
    const config = getConfig()
    const index = config.nodes.findIndex((item) => item.id === req.params.id)
    config.nodes.splice(index, 1)
    writeConfig(config)
    store.init(config)
    res.status(200).send()
  } catch (e) {
    res.status(500).json({
      error: true,
      message: 'Could not delete node from disk: ' + req.params.id,
    })
  }
})

export default router
