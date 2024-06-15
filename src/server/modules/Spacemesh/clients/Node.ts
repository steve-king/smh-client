import { credentials } from '@grpc/grpc-js'
import api from '../grpc'
import { debounce } from 'lodash'
import { log } from '@/server/utils'
import * as parsers from './parsers'

import SpacemeshClient from './AbstractClient'
import { NodeConfig } from '@/types'

export interface Config {
  id: string
  name: string
  host: string
  port_public: string
  port_private: string
  port_post: string
}

export default class NodeClient extends SpacemeshClient {
  config: NodeConfig
  clients: any
  events: any[] = []
  peers: any[] = []

  constructor(config: NodeConfig) {
    super()
    this.config = config
    this.defaultPort = Number(config.port_public)
    this.key = 'node:' + this.config.id
    this.setCache(this.key + ':config', this.config)
    this.clients = this.createGrpcClients()
  }

  callHttpEndpoints = () => {}

  createGrpcClients = () => {
    const { host, port_public, port_private, port_post } = this.config
    const publicHost = `${host}:${port_public}`
    const privateHost = `${host}:${port_private}`
    const postHost = `${host}:${port_post}`
    const creds = credentials.createInsecure()
    return {
      // NodeService: new api.spacemesh.v2alpha1.NodeService(publicHost, creds),
      NodeService: new api.spacemesh.v1.NodeService(publicHost, creds),
      PostInfoService: new api.spacemesh.v1.PostInfoService(postHost, creds),
      SmesherService: new api.spacemesh.v1.SmesherService(privateHost, creds),
      AdminService: new api.spacemesh.v1.AdminService(privateHost, creds),
    }
  }

  callUnaryClients = async () => {
    const { id } = this.config

    this.clients.NodeService.Status({}, (e: any, data: any) => {
      if (e) return this.handleGrpcError(e)
      this.setCache(`${this.key}:Status`, parsers.status(data))
    })

    this.clients.NodeService.Version({}, (e: any, data: any) => {
      if (e) return this.handleGrpcError(e)
      this.setCache(`${this.key}:Version`, parsers.version(data))
    })

    this.clients.PostInfoService.PostStates({}, (e: any, data: any) => {
      if (e) return this.handleGrpcError(e)
      this.setCache(`${this.key}:PostStates`, parsers.postStates(data))
    })

    this.clients.SmesherService.Coinbase({}, (e: any, data: any) => {
      if (e) return this.handleGrpcError(e)
      this.setCache(`${this.key}:Coinbase`, parsers.coinbase(data))
    })

    // // PeerInfo acts a bit like a unary call - after all peers have been reported, stream ends
    // // Therefore should be called on every interval - hence residing in callUnaryClients()
    this.peers = []
    this.clients.AdminService.PeerInfoStream({})
      .on('error', this.handleGrpcError)
      .on('data', (data: any) => {
        this.peers.push(parsers.peersStream(data))
        this.setPeersCache(`${this.key}:Peers`, this.peers)
      })
  }

  callStreamingClients = async () => {
    const { id } = this.config

    const statusStream = this.clients.NodeService.StatusStream({})
    statusStream.on('error', this.handleGrpcError)
    // statusStream.on('end', () => this.handleGrpcStreamEnd('StatusStream'))
    statusStream.on('data', (data: any) => {
      this.setCache(`${this.key}:Status`, parsers.status(data))
    })
    this.streams.push(statusStream)

    this.events = []
    const eventsStream = this.clients.AdminService.EventsStream({})
    eventsStream.on('error', this.handleGrpcError)
    // eventsStream.on('end', () => this.handleGrpcStreamEnd('EventsStream'))
    eventsStream.on('data', (data: any) => {
      this.events.push(parsers.eventsStream(data))
      this.setEventsCache(`node:${this.config.id}:Events`, this.events)
    })
    this.streams.push(eventsStream)

    log('INFO', 'GRPC', '2 streams started')
  }

  callHttpClients = async () => {}

  // Needs it's own debounce function so doesn't conflict with events
  setPeersCache = debounce((key: string, value: any) => {
    this.setCache(key, value)
  }, this.debounceMs)

  // Needs it's own debounce function so doesn't conflict with peers
  setEventsCache = debounce((key: string, value: any) => {
    this.setCache(key, value)
  }, this.debounceMs)
}
