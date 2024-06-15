import express from 'express'
import NodeCache from 'node-cache'
import config from '@/server/UserConfig'
import { log } from '@/server/utils'

const router = express.Router()
const cache = new NodeCache()
let expired = true

// cache.on('expired') => expired = true

// FETCH
// --------------------------------------------------
router.get('/:id', (req, res) => {
  try {
    // does cache entry exist and not expired?
    // get coingecko key
    // fetch price data from coingecko
    // save to cache
    // set expired = false
    // else:
    // load from cache

    res.status(200).json('data')
  } catch (e) {
    res.status(500).json('Error fetching data')
  }
})

export default router
