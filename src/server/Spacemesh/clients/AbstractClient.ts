import { debounce } from 'lodash'
import { log, objectsAreEqual, pingHost } from '../../utils'
import spacemesh from '../Spacemesh'

export default abstract class SpacemeshClient {
  key = ''
  defaultPort = 0
  config: any = null
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
    const { host } = this.config
    this.isOnline = await pingHost(host, Number(this.defaultPort))
    if (!this.isOnline) this.connectStreams = true
    this.setCache(`${this.key}:isOnline`, this.isOnline)
    return this.isOnline
  }

  debouncedCheckOnline = debounce(this.checkOnline, this.debounceMs)

  // Check data has changed before caching
  setCache = (key: string, value: any) => {
    const oldValue = spacemesh.cache.get(key)
    if (objectsAreEqual(value, oldValue)) {
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

  handleGrpcStreamEnd = (streamName: string) => {
    log('DEBUG', 'GRPC', streamName + ' ended')
    this.debouncedCheckOnline()
  }

  cancelStreams = () => {
    this.streams.forEach((stream) => stream.cancel())
    log('INFO', 'GRPC', `${this.streams.length} streams cancelled`)
  }
}
