import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import Spacemesh from '@/server/Spacemesh'
import { log } from '@/server/utils'
import config from '@/server/UserConfig'

const router = express.Router()

// CREATE
// --------------------------------------------------
router.post('/nodes', (req, res) => {
  try {
    const node = {
      id: uuidv4(),
      ...req.body,
    }
    log('INFO', 'API', 'Creating node:', JSON.stringify(node))
    config.data.nodes.push(node)
    config.save(config.data)
    config.load()
    res.status(200).json(node)
  } catch (e) {
    res.status(500).json('Error creating node')
  }
})

// DELETE
// --------------------------------------------------
router.delete('/node/:id', (req, res) => {
  const { id } = req.params
  const index = config.data.nodes.map((item) => item.id).indexOf(id)

  if (index === -1) {
    res.status(404).json('Not found')
  } else {
    log('INFO', 'API', 'Deleting node:', id)
    config.data.nodes.splice(index, 1)
    config.save(config.data)
    Spacemesh.deleteNode(id)
    config.load()
    res.status(200).json(id)
  }
})

// UPDATE
// --------------------------------------------------
router.put('/node/:id', (req, res) => {
  const { id } = req.params
  const index = config.data.nodes.map((item) => item.id).indexOf(id)

  if (id !== req.body.id) {
    res.status(400).send('ID mismatch')
    return
  } else if (index === -1) {
    res.status(404).json('Not found')
  } else {
    log('INFO', 'API', 'Updating node:', id)
    config.data.nodes[index] = req.body
    config.save(config.data)
    config.load()
    res.status(200).json(req.body)
  }
})

export default router
