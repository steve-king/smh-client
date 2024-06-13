import express from 'express'
import nodes from './api/nodes'
import services from './api/services'
import Spacemesh from '../Spacemesh'

const router = express.Router()

router.get('/api', (req, res) => {
  res.json('Welcome to the api')
})

router.get('/api/state', (req, res) => {
  res.json(Spacemesh.getCacheData())
})

router.use('/api', [nodes, services])

export default router
