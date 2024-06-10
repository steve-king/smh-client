import express from 'express'
import nodes from './api/nodes'
import services from './api/services'

const router = express.Router()

router.get('/api', (req, res) => {
  res.json('Welcome to the api')
})

router.use('/api', [nodes, services])

export default router
