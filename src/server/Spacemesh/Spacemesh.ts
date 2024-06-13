import NodeCache from 'node-cache'
import Node from './clients/Node'
import Service from './clients/Service'
import { log } from '../utils'

interface Config {
  nodes: any
  services: any
}

class Spacemesh {
  config: Config | null = null
  nodes: Node[] = []
  services: Service[] = []
  cache: NodeCache = new NodeCache()

  init = (config: Config) => {
    this.stop()
    this.config = config

    // TODO
    // 1. Compare new config to old config.
    // 2. Leave unchanged Node/Service clients and their cache entries as they are.
    // 3. For new Nodes and Services, call new ()
    // 4. For any config that changed, call client.shutDown() and remove reference
    // 3. Client.Shutdown() should:
    // 1. stop all streams
    // 2. delete all cache entries
    // 4. invalidate all functions so they can no longer be called

    const { nodes, services } = this.config
    this.nodes = nodes.map((node: any) => new Node(node))
    this.services = services.map((service: any) => new Service(service))
    log(
      'INFO',
      'SPACEMESH',
      `initialised ${this.nodes.length} nodes, ${this.services.length} services`
    )
  }

  stop = () => {
    this.nodes.forEach((node) => node.cancelStreams())
  }

  update = () => {
    log('DEBUG', 'SPACEMESH', 'update')
    this.nodes.forEach((node) => node.update())
    this.services.forEach((service) => service.update())
  }

  // getNode = (id: string) => {
  //   const keyString = `node:${id}:`
  //   if (this.cache.has(keyString + 'isOnline')) {
  //     const nodeConfig = this.cache.get(keyString + 'config') as object
  //     return {
  //       ...nodeConfig,
  //       isOnline: this.cache.get(keyString + 'isOnline'),
  //       status: this.cache.get(keyString + 'Status'),
  //       version: this.cache.get(keyString + 'Version'),
  //       postStates: this.cache.get(keyString + 'PostStates'),
  //       coinbase: this.cache.get(keyString + 'Coinbase'),
  //       // peers: this.cache.get(keyString + 'Peers'),
  //       // events: this.cache.get(keyString + 'Events'),
  //     }
  //   }
  //   return undefined
  // }

  // getNodes = () => {
  //   const nodes = this.config?.nodes
  //     .map(({ id }: any) => this.getNode(id))
  //     .filter((item: any) => item !== null)
  //   return nodes
  // }

  // getService = (id: string) => {
  //   const keyString = `service:${id}:`
  //   if (this.cache.has(keyString + 'isOnline')) {
  //     const serviceConfig = this.cache.get(keyString + 'config') as object
  //     return {
  //       ...serviceConfig,
  //       isOnline: this.cache.get(keyString + 'isOnline'),
  //       config: this.cache.get(keyString + 'config'),
  //       status: this.cache.get(keyString + 'Status'),
  //     }
  //   }
  //   return undefined
  // }

  // getServices = () => {
  //   const services = this.config?.services
  //     .map(({ id }: any) => this.getService(id))
  //     .filter((item: any) => item !== null)
  //   return services
  // }

  /**
   * CACHE DEBUGGING
   */
  getAllKeys = () => this.cache.keys().sort()

  getAllData = () => {
    const data = this.cache.keys().map((key: string) => ({
      key,
      value: this.cache.get(key),
    }))

    // console.log('ALL DATA', data)

    return data
  }
  // debugKeys = () => {
  //   log('DEBUG', 'CACHE', 'getAllKeys')
  //   console.log(this.getAllKeys())
  // }

  // debugData = () => {
  //   log('DEBUG', 'CACHE', 'getAllData')
  //   console.log(this.getAllData())
  // }
}

const sm = new Spacemesh()
export default sm
