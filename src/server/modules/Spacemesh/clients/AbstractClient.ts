import { debounce, isEqual } from 'lodash'
import { log, pingHost } from '@/server/utils'
import spacemesh from '../Spacemesh'
import { NodeConfig, ServiceConfig } from '@/types'

export default abstract class SpacemeshClient {
  key = ''
  defaultPort = 0
  config: NodeConfig | ServiceConfig | null = null
  isOnline = false
  streams: any[] = []
  connectStreams = true
  debounceMs = 5000

  abstract createGrpcClients(): void
  abstract callUnaryClients(): void
  abstract callStreamingClients(): void
  abstract callHttpEndpoints(): void

  update = async () => {
    await this.checkOnline()
    if (this.isOnline) {
      this.callUnaryClients()
      this.callHttpEndpoints()
      if (this.connectStreams) {
        this.callStreamingClients()
        this.connectStreams = false
      }
    }
  }

  checkOnline = async () => {
    const { host } = this.config as NodeConfig | ServiceConfig
    this.isOnline = await pingHost(host, Number(this.defaultPort))

    if (!this.isOnline) {
      this.connectStreams = true
      this.setOffline()
    }
    this.setCache(`${this.key}:isOnline`, this.isOnline)

    return this.isOnline
  }

  setOffline = () => {}

  debouncedCheckOnline = debounce(this.checkOnline, this.debounceMs)

  // Check data has changed before caching
  setCache = (key: string, value: any) => {
    const oldValue = spacemesh.cache.get(key)
    if (isEqual(value, oldValue)) {
      log('VERBOSE', 'CACHE', 'no changes detected', key)
      return
    }

    // log('DEBUG', 'CACHE', `set ${key}`)
    // log('VERBOSE', JSON.stringify(value))

    spacemesh.cache.set(key, value)
  }

  handleGrpcError = (e: { code: number; details: any }) => {
    log('DEBUG', 'GRPC', `Error: ${e.code} - ${e.details}`)
    this.debouncedCheckOnline()
  }

  invalidateInstance = () => {
    this.streams.forEach((stream) => stream.cancel())

    // Delete all cache entires
    const cacheKeys = spacemesh.cache
      .keys()
      .filter((key) => key.includes(this.key))
    spacemesh.cache.del(cacheKeys)

    // Replace all functions
    // Prevents any overhanging checkOnline() calls from firing and clogging up cache with invalid entries
    const instanceKeys = Object.keys(this) as (keyof this)[]
    instanceKeys.forEach((key) => {
      if (typeof this[key] === 'function') {
        this[key] = (() => {
          log('DEBUG', 'SPACEMESH', `instance has been invalidated`)
        }) as any
      }
    })
  }
}
