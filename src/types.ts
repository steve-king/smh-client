export interface Config {
  settings?: Settings
  nodes: Node[]
  services: Service[]
}

interface Settings {
  refreshInterval: number
}

export interface Node {
  id: string
  isOnline: boolean
  config: {
    id: string
    name: string
    host: string
    port_public: string
    port_private: string
    port_post: string
    smeshing: boolean | undefined
  }
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
  config: {
    id: string
    name: string
    host: string
    port_operator: string
    su: number
  }
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

export interface Action {
  type: string
  payload: any
}
