import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import Spacemesh from '@/server/Spacemesh'
import { log } from '@/server/utils'
import config from '@/server/UserConfig'

const router = express.Router()

// GET ALL
// --------------------------------------------------
// router.get('/nodes', (req, res) => {
//   res.json(Spacemesh.getNodes())
// })

// // GET ONE (by ID)
// // --------------------------------------------------
// router.get('/node/:id', (req, res) => {
//   const node = Spacemesh.getNode(req.params.id)
//   if (node !== undefined) {
//     res.json(node)
//   } else {
//     res.status(404).json('Not found')
//   }
// })

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

  if (index !== -1) {
    log('INFO', 'API', 'Deleting node:', id)

    // Delete from config
    config.data.nodes.splice(index, 1)
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
router.put('/node/:id', (req, res) => {
  const { id } = req.params
  const index = config.data.nodes.map((item) => item.id).indexOf(id)

  if (id !== req.body.id) {
    // Check IDs match
    res.status(400).send('ID mismatch')
    return
  }

  if (index === -1) {
    // Check the node exists
    res.status(404).json('Not found')
  } else {
    log('INFO', 'API', 'Updating node:', id)

    const node = {
      ...req.body,
    }

    // Replace the node in config
    config.data.nodes[index] = node
    config.save(config.data)

    // Delete from cache
    const allKeys = Spacemesh.cache.keys()
    const keysToDelete = allKeys.filter((key) => key.includes(id))
    const numDeleted = Spacemesh.cache.del(keysToDelete)

    log('INFO', 'CACHE', `Deleted ${numDeleted} keys for id:`, id)

    config.load()

    res.status(200).json(node)
  }
})

export default router
