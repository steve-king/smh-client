import { useParams } from 'react-router-dom'
import { useStoreContext } from '@/client/lib/store'
import { findItemBy, parseNode } from '@/client/lib/utils'
import { Page } from '@/client/app'
import { Node as NodeProps } from '@/types'
import Stat from '@/client/components/Stat'

const Node = () => {
  let node
  const { name } = useParams()
  const { state } = useStoreContext()
  const nodeProps: NodeProps = findItemBy('name', name, state?.nodes)

  if (nodeProps) {
    node = parseNode(nodeProps)
    return (
      <Page title={node.name} icon="node">
        <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon="host">
            <h3 className="text-xs text-muted-foreground">Host</h3>
            <p className="text-2xl">{node.host}</p>
            <p className="text-xs text-muted-foreground">
              :{node.port_public} :{node.port_private} :{node.port_post}
            </p>
          </Stat>
          <Stat icon="connection">
            <h3 className="text-xs text-muted-foreground">Status</h3>
            <p className="text-2xl">{node.statusText}</p>
            <p className="text-xs text-muted-foreground">
              Layer: {node.status?.synced_layer?.number} /
              {node.status?.top_layer?.number}
            </p>
          </Stat>
          <Stat icon="peers">
            <h3 className="text-xs text-muted-foreground">Network</h3>
            <p className="text-2xl">Peers: {node.status?.connected_peers}</p>
          </Stat>
          <Stat icon="version">
            <h3 className="text-xs text-muted-foreground">Version:</h3>
            <p className="text-2xl">v1.5.7</p>
            <p className="text-xs text-muted-foreground">view source</p>
          </Stat>
        </div>
        <pre className="text-xs">{JSON.stringify(node, null, 2)}</pre>
      </Page>
    )
  }

  return null
}

export default Node
