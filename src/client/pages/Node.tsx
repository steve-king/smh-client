import { useParams } from 'react-router-dom'
import { useSpacemesh } from '../context/spacemesh'
import Page from '@/client/components/Page'
import Card from '@/client/components/Card'
import { displayNodeStatus } from '../components/tables/cells/NodeStatus'

const Node = () => {
  const { id } = useParams()
  const { state } = useSpacemesh()
  let node = id && state.node[id]

  if (node) {
    const { config, Status, Version } = node
    const statusDisplay = displayNodeStatus(node.isOnline, node.Status)
    return (
      <Page title={config.name} icon="nodes">
        <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card icon="host">
            <h3 className="text-xs text-muted-foreground">Host</h3>
            <p className="text-2xl">{config.host}</p>
            <p className="text-xs text-muted-foreground">
              :{config.port_public} :{config.port_private} :{config.port_post}
            </p>
          </Card>
          <Card
            icon={statusDisplay.icon}
            iconProps={{ className: statusDisplay.iconColour }}
          >
            <h3 className="text-xs text-muted-foreground">Status</h3>
            <p className="text-2xl">{statusDisplay.text}</p>
            <p className="text-xs text-muted-foreground">
              Layer: {node.Status?.synced_layer} /{node.Status?.top_layer}
            </p>
          </Card>
          <Card icon="peers">
            <h3 className="text-xs text-muted-foreground">Network</h3>
            <p className="text-2xl">Peers: {Status.connected_peers}</p>
          </Card>
          <Card icon="version">
            <h3 className="text-xs text-muted-foreground">Version:</h3>
            <p className="text-2xl">{Version}</p>
            <p className="text-xs text-muted-foreground">view source</p>
          </Card>
        </div>
        <pre className="text-xs">{JSON.stringify(node, null, 2)}</pre>
      </Page>
    )
  }

  return null
}

export default Node
