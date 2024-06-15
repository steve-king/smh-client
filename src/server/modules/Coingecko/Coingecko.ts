import { URLSearchParams } from 'url'
import NodeCache from 'node-cache'
import { log } from '@/server/utils'
import e from 'express'

const baseUrl = 'https://api.coingecko.com/api/v3'

class Coingecko {
  apiKey: string = ''
  cache: NodeCache | null = null
  cacheSeconds: number = 600

  init = (apiKey: string, cacheMinutes: number) => {
    this.cache = new NodeCache()
    this.apiKey = apiKey
    this.cacheSeconds = cacheMinutes * 60
  }

  coinPrice = (coinId: string) =>
    new Promise((resolve) => {
      const key = 'price:' + coinId
      const cachedResponse = this.cache?.get(key)

      if (cachedResponse) {
        log('DEBUG', 'COINGECKO', `${key} cached response`)
        resolve(cachedResponse)
      } else {
        resolve(this.fetchCoinPrice(coinId, key))
      }
    })

  fetchCoinPrice = (coinId: string, key: string) => {
    log('DEBUG', 'COINGECKO', `fetching ${coinId} price from api`)
    const queryParams = {
      ids: coinId,
      vs_currencies: 'USD',
      include_market_cap: true,
      include_24hr_vol: true,
      include_24hr_change: true,
      include_last_updated_at: true,
    }
    const queryString = new URLSearchParams(queryParams as any).toString()
    const url = `${baseUrl}/simple/price?${queryString}`
    const options = { method: 'GET', headers: { accept: 'application/json' } }
    return fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        this.cache?.set(key, data, this.cacheSeconds)
        return data
      })
      .catch((e) => log('ERROR', 'COINGECKO', JSON.stringify(e)))
  }

  // fetchCoinData = (coinId: string) => {
  //   const queryParams = {
  //     localization: false,
  //     sparkline: true,
  //     community_data: false,
  //     developer_data: false,
  //     tickers: false,
  //     market_data: false,
  //   }
  //   const queryString = new URLSearchParams(queryParams as any).toString()
  //   const url = `${baseUrl}/coins/${coinId}?${queryString}`
  //   const options = { method: 'GET', headers: { accept: 'application/json' } }
  //   return (
  //     fetch(url, options)
  //       .then((res) => res.json())
  //       // .then((json) => console.log(json))
  //       .catch((e) => log('ERROR', 'COINGECKO', JSON.stringify(e)))
  //   )
  // }
}

const coingecko = new Coingecko()
export default coingecko
