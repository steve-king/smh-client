import NodeCache from 'node-cache'
import Node from './clients/Node'
import Service from './clients/Service'
import { log } from '@/server/utils'
import { UserConfig, NodeConfig, ServiceConfig } from '@/types'
import { isEqual } from 'lodash'

class Spacemesh {
  cache: NodeCache = new NodeCache()
  node: { [key: string]: Node } = {}
  service: { [key: string]: Service } = {}

  init = (config: UserConfig) => {
    config.nodes.forEach((nodeConfig: NodeConfig) => {
      const { id } = nodeConfig
      // create new
      if (this.node[id] === undefined) {
        this.node[id] = new Node(nodeConfig)
      }
      // updated - recreate instance
      else if (!isEqual(nodeConfig, this.node[id].config)) {
        this.node[id].invalidateInstance()
        this.node[id] = new Node(nodeConfig)
      }
    })

    config.services.forEach((serviceConfig: ServiceConfig) => {
      const { id } = serviceConfig
      // create new
      if (this.service[id] === undefined) {
        this.service[id] = new Service(serviceConfig)
      }
      // updated - recreate instance
      else if (!isEqual(serviceConfig, this.service[id].config)) {
        this.service[id].invalidateInstance()
        this.service[id] = new Service(serviceConfig)
      }
    })

    log(
      'INFO',
      'SPACEMESH',
      `initialised ${Object.entries(this.node).length} nodes, ${
        Object.entries(this.service).length
      } services`
    )
  }

  deleteNode = (id: string) => {
    this.node[id]?.invalidateInstance()
    delete this.node[id]
  }

  deleteService = (id: string) => {
    this.service[id]?.invalidateInstance()
    delete this.service[id]
  }

  updateAll = () => {
    log('DEBUG', 'SPACEMESH', 'update')
    Object.entries(this.node).forEach((entry) => entry[1].update())
    Object.entries(this.service).forEach((entry) => entry[1].update())
  }

  getCacheKeys = () => this.cache.keys().sort()

  getCacheData = () => {
    const data = this.cache.keys().map((key: string) => ({
      key,
      value: this.cache.get(key),
    }))

    return data
  }
}

const sm = new Spacemesh()
export default sm
