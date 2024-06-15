import express from 'express'
import coingecko from '@/server/modules/Coingecko'
// import { log } from '@/server/utils'

const router = express.Router()

// PRICE
// --------------------------------------------------
router.get('/coingecko/:coinId/price', (req, res) => {
  try {
    coingecko
      .coinPrice('spacemesh')
      .then((data: any) => res.status(200).json(data))
      .catch(() => res.status(500).json('Error fetching coingecko data'))
  } catch (e) {
    res.status(500).json('Error')
  }
})

// CHART
// --------------------------------------------------
router.get('/coingecko/:coinId/chart', (req, res) => {
  try {
    coingecko
      .coinChart('spacemesh')
      .then((data: any) => res.status(200).json(data))
      .catch(() => res.status(500).json('Error fetching coingecko data'))
  } catch (e) {
    res.status(500).json('Error')
  }
})

export default router
