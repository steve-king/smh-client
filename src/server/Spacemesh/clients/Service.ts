import { credentials } from '@grpc/grpc-js'
import api from '../grpc'
import { log } from '../../utils'
import SpacemeshClient from './AbstractClient'

export interface Config {
  id: string
  name: string
  host: string
  port_operator: string
  su: string
}

export default class ServiceClient extends SpacemeshClient {
  config: Config
  clients: any

  constructor(config: Config) {
    super()
    this.config = config
    this.defaultPort = Number(config.port_operator)
    this.key = 'service:' + this.config.id
    this.setCache(this.key + ':config', this.config)
    this.clients = this.createGrpcClients()
  }

  createGrpcClients = () => {
    const { host, port_operator } = this.config
    const operatorHost = `${host}:${port_operator}`
    const creds = credentials.createInsecure()
    return {
      OperatorService: new api.post.v1.OperatorService(operatorHost, creds),
    }
  }

  callUnaryClients = () => {}
  callStreamingClients = () => {}

  callHttpEndpoints = async () => {
    const { id, host, port_operator } = this.config
    const url = 'http://' + host + ':' + port_operator + '/status'

    fetch(url)
      .then((res) => res.ok && res.json())
      .then((data) => this.setCache(`${this.key}:Status`, data))
      .catch((e) => {
        log('ERROR', 'http', e)
        this.debouncedCheckOnline()
      })
  }
}
