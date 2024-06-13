export interface Action {
  type: string
  payload: any
}

export interface UserConfig {
  settings?: Settings
  nodes: NodeConfig[]
  services: ServiceConfig[]
}

interface Settings {
  refreshInterval: number
}

export interface NodeConfig {
  id: string
  name: string
  host: string
  port_public: string
  port_private: string
  port_post: string
  smeshing: boolean | undefined
}

export interface ServiceConfig {
  id: string
  name: string
  host: string
  port_operator: string
  su: number
}

export interface Node {
  id: string
  isOnline: boolean
  config: NodeConfig
  Status?: NodeStatus
  Version: string
  PostStates?: [
    {
      name: string
    }
  ]
}

export interface NodeStatus {
  is_synced: boolean
}

export interface Service {
  node?: Node | undefined
  isOnline: boolean
  config: ServiceConfig
  Status?: ProvingStatus
}

export type ProvingStatus =
  | {
      Proving: {
        position: number
        nonces: number
      }
    }
  | string
