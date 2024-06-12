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

// export interface NodeData {
//   status?: any
//   build?: any
//   coinbase?: any
//   nodeInfo?: any
//   postInfo?: any
//   version?: string
//   ErrorStream?: any[]
//   EventsStream?: any[]
//   PeerInfoStream?: any[]
// }

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
  Status?: string | ProvingStatus
  // data: string | any
}

type ProvingStatus = {
  Proving: {
    position: number
    nonces: number
  }
}

export interface Action {
  type: string
  payload: any
}
