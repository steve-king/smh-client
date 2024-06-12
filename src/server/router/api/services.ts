import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import Spacemesh from '@/server/Spacemesh'
import { log } from '@/server/utils'
import config from '@/server/UserConfig'

const router = express.Router()

// GET ALL
// --------------------------------------------------
router.get('/services', (req, res) => {
  res.json(Spacemesh.getServices())
})

// GET ONE (by ID)
// --------------------------------------------------
router.get('/service/:id', (req, res) => {
  const service = Spacemesh.getService(req.params.id)
  if (!!service) {
    res.json(service)
  } else {
    res.status(404).json('Not found')
  }
})

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

  if (index !== -1) {
    log('INFO', 'API', 'Deleting service:', id)

    // Delete from config
    config.data.services.splice(index, 1)
    config.save(config.data)

    // Delete from cache
    const allKeys = Spacemesh.cache.keys()
    const keysToDelete = allKeys.filter((key) => key.includes(id))
    const numDeleted = Spacemesh.cache.del(keysToDelete)

    log('INFO', 'CACHE', `Deleted ${numDeleted} keys for id:`, id)

    // Reload the config
    config.load()

    res.status(200).json(id)
  } else {
    res.status(404).json('Not found')
  }
})

// UPDATE
// --------------------------------------------------
router.put('/service/:id', (req, res) => {
  const { id } = req.params
  const index = config.data.services.map((item) => item.id).indexOf(id)

  if (id !== req.body.id) {
    // Check IDs match
    res.status(400).send('ID mismatch')
    return
  }

  if (index === -1) {
    // Check the node exists
    res.status(404).json('Not found')
  } else {
    log('INFO', 'API', 'Updating service:', id)

    const service = {
      ...req.body,
    }

    // Replace the node in config
    config.data.services[index] = service
    config.save(config.data)

    // Delete from cache
    const allKeys = Spacemesh.cache.keys()
    const keysToDelete = allKeys.filter((key) => key.includes(id))
    const numDeleted = Spacemesh.cache.del(keysToDelete)

    log('INFO', 'CACHE', `Deleted ${numDeleted} keys for id:`, id)

    config.load()

    res.status(200).json(service)
  }
})

export default router
