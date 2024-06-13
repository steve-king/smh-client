import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import Spacemesh from '@/server/Spacemesh'
import { log } from '@/server/utils'
import config from '@/server/UserConfig'

const router = express.Router()

// CREATE
// --------------------------------------------------
router.post('/services', (req, res) => {
  try {
    const service = {
      ...req.body,
      id: uuidv4(),
    }
    log('INFO', 'API', 'Creating service:', JSON.stringify(service))
    config.data.services.push(service)
    config.save(config.data)
    config.load()
    res.status(200).json(service)
  } catch (e) {
    res.status(500).json('Error creating service')
  }
})

// DELETE
// --------------------------------------------------
router.delete('/service/:id', (req, res) => {
  const { id } = req.params
  const index = config.data.services.map((item) => item.id).indexOf(id)

  if (index === -1) {
    res.status(404).json('Not found')
  } else {
    log('INFO', 'API', 'Deleting service:', id)
    config.data.services.splice(index, 1)
    config.save(config.data)
    Spacemesh.deleteService(id)
    config.load()
    res.status(200).json(id)
  }
})

// UPDATE
// --------------------------------------------------
router.put('/service/:id', (req, res) => {
  const { id } = req.params
  const index = config.data.services.map((item) => item.id).indexOf(id)

  if (id !== req.body.id) {
    res.status(400).send('ID mismatch')
  } else if (index === -1) {
    res.status(404).json('Not found')
  } else {
    log('INFO', 'API', 'Updating service:', id)
    config.data.services[index] = req.body
    config.save(config.data)
    config.load()
    res.status(200).json(req.body)
  }
})

export default router
