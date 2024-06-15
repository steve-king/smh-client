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
      const key = coinId + ':price'
      const cachedResponse = this.cache?.get(key)

      if (cachedResponse) {
        log('DEBUG', 'COINGECKO', `${key} cached response`)
        resolve(cachedResponse)
      } else {
        resolve(this.fetchCoinPrice(coinId, key))
      }
    })

  coinChart = (coinId: string) =>
    new Promise((resolve) => {
      const key = coinId + ':chart'
      const cachedResponse = this.cache?.get(key)

      if (cachedResponse) {
        log('DEBUG', 'COINGECKO', `${key} cached response`)
        resolve(cachedResponse)
      } else {
        resolve(this.fetchCoinChart(coinId, key))
      }
    })

  fetchCoinPrice = (coinId: string, key: string) => {
    log('DEBUG', 'COINGECKO', `fetching ${key} from api`)
    const queryParams = {
      ids: coinId,
      vs_currencies: 'USD',
      include_market_cap: true,
      include_24hr_vol: true,
      include_24hr_change: true,
      include_last_updated_at: true,
      precision: 2,
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

  fetchCoinChart = (coinId: string, key: string) => {
    log('DEBUG', 'COINGECKO', `fetching ${key} from api`)
    const queryString = new URLSearchParams({
      days: 365,
      interval: 'daily',
      precision: 2,
      vs_currency: 'USD',
    } as any).toString()
    const url = `${baseUrl}/coins/${coinId}/market_chart?${queryString}`
    const options = { method: 'GET', headers: { accept: 'application/json' } }
    return fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        this.cache?.set(key, data, this.cacheSeconds)
        return data
      })
      .catch((e) => log('ERROR', 'COINGECKO', JSON.stringify(e)))
  }
}

const coingecko = new Coingecko()
export default coingecko
