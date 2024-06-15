import express from 'express'
import Spacemesh from '@/server/modules/Spacemesh'
import nodes from './api/nodes'
import services from './api/services'
import coingecko from './api/coingecko'

const router = express.Router()

router.get('/api', (req, res) => {
  res.json('Welcome to the api')
})

router.get('/api/state', (req, res) => {
  res.json(Spacemesh.getCacheData())
})

router.use('/api', [nodes, services, coingecko])

export default router
