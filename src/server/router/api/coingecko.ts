import express from 'express'
import coingecko from '@/server/modules/Coingecko'
import { log } from '@/server/utils'

const router = express.Router()

// --------------------------------------------------
router.get('/coingecko/:coinId', (req, res) => {
  try {
    coingecko
      .coinPrice('spacemesh')
      .then((data: any) => res.status(200).json(data))
      .catch(() => res.status(500).json('Error fetching coingecko data'))
  } catch (e) {
    res.status(500).json('Error')
  }
})

// --------------------------------------------------
// router.get('/coingecko/:coinId/data', (req, res) => {
//   try {
//     coingecko
//       .fetchCoinData('spacemesh')
//       .then((data: any) => res.status(200).json(data))
//       .catch(() => res.status(500).json('Error fetching coingecko data'))
//   } catch (e) {
//     res.status(500).json('Error')
//   }
// })

export default router
