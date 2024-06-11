import { Config } from '@/types'
import { setProperty, log } from '@/server/utils'

import { getNode } from '@/server/store/node'
import { getNodeStreams } from '@/server/store/node-streams'
import { getService } from '@/server/store/service'
import Stream from '@/server/store/Stream'

const testService1 = {
  name: 'test1',
  host: '192.168.1.10',
  port_operator: '10001',
  su: 16,
  data: {
    Proving: {
      nonces: { start: 0, end: 128 },
      // position: 317708042240,
      position: 0,
    },
  },
}

const testService2 = {
  name: 'test2',
  host: '192.168.1.10',
  port_operator: '10001',
  su: 16,
  data: {
    Proving: {
      nonces: { start: 0, end: 128 },
      position: 317708042240,
      // position: 0,
    },
  },
}

class Store {
  state: Config | null
  onUpdateCallback: Function | null
  streams: Stream[] = []

  constructor() {
    this.state = null
    this.onUpdateCallback = null
  }

  init = (config: Config) => {
    this.streams.forEach((stream) => stream.cancel())
    this.state = { ...config }
    this.state.nodes.forEach((node) => (node.data = {}))
    log('INFO', 'store', 'initialised')
    return this
  }

  fetch = () => {
    this.fetchNodes()
    this.fetchServices()
  }

  fetchNodes = () => {
    this.state?.nodes.forEach((node) => {
      getNode(node, this.updateNode)
    })
  }

  fetchServices = () => {
    let services = this.state?.services

    if (process.env.NODE_ENV !== 'production') {
      const testData = services?.filter((item) => item.name.startsWith('test'))
      if (!testData || testData.length === 0) {
        this.state?.services.unshift(testService1)
        this.state?.services.unshift(testService2)
      }
      services = this.state?.services.filter(
        (item) => !item.name.startsWith('test')
      )
    }

    services?.forEach((service) => {
      return getService(service, this.updateService)
    })
  }

  fetchStreams = () => {
    this.state?.nodes.forEach((node) => {
      const nodeStreams = getNodeStreams(node, this.updateNode)
      this.streams = this.streams.concat(nodeStreams)
    })
  }

  /**
   *
   */
  updateNode = (id: string, key: string, value: any) => {
    const node = this.state?.nodes.find((item) => item.name === id)
    if (node) {
      // node.data = node.data ? node.data : {}
      setProperty(node.data, key, value)

      if (typeof this.onUpdateCallback === 'function') {
        this.onUpdateCallback()
      }
    }
  }

  updateService = (id: string, key: string, value: any) => {
    const service = this.state?.services.find((item) => item.name === id)
    if (service) {
      setProperty(service, key, value)

      if (typeof this.onUpdateCallback === 'function') {
        this.onUpdateCallback()
      }
    }
  }

  onUpdate = (callback: Function) => {
    this.onUpdateCallback = () => {
      log('DEBUG', 'store', 'updated')
      callback()
    }
  }
}

const store = new Store()
export default store