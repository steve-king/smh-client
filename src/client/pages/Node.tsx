import { useParams } from 'react-router-dom'
import { useSpacemesh } from '../context/spacemesh'
import Page from '@/client/components/Page'
import Card from '@/client/components/Card'
import { displayNodeStatus } from '../components/tables/cells/NodeStatus'
import { Node as NodeProps } from '@/types'
import { EventsStream } from '../components/Events'
import { PeersStream } from '../components/Peers'

const Node = () => {
  const { id } = useParams()
  const { nodes } = useSpacemesh()
  let node = id && nodes.find((node: NodeProps) => node.config.id === id)

  if (node) {
    const { config, Status, Version, Events, Peers } = node
    const statusDisplay = displayNodeStatus(node.isOnline, node.Status)

    return (
      <Page title={config.name} icon="nodes">
        {/* <pre className="text-xs">{JSON.stringify(Events, null, 2)}</pre> */}
        <div className="mb-4 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            icon={statusDisplay.icon}
            iconProps={{ className: statusDisplay.iconColour }}
          >
            <h3 className="text-xs text-muted-foreground">Status</h3>
            <p className="text-2xl">{statusDisplay.text}</p>
            {node.Status ? (
              <p className="text-xs text-muted-foreground">
                Layer: {node.Status?.synced_layer} / {node.Status?.top_layer}
              </p>
            ) : (
              <p className="text-xs">&nbsp;</p>
            )}
          </Card>
          <Card icon="peers">
            <h3 className="text-xs text-muted-foreground">Network</h3>
            <p className="text-2xl">Peers: {Status?.connected_peers || 0}</p>
          </Card>
          <Card icon="version">
            <h3 className="text-xs text-muted-foreground">Version:</h3>
            <p className="text-2xl">{Version}</p>
            <p className="text-xs text-muted-foreground">view source</p>
          </Card>
          <Card icon="host">
            <h3 className="text-xs text-muted-foreground">Host</h3>
            <p className="text-2xl">{config.host}</p>
            <p className="text-xs text-muted-foreground">
              :{config.port_public} :{config.port_private} :{config.port_post}
            </p>
          </Card>
        </div>
        <div className="mb-4 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          <div>
            <Card className="mb-4">
              <h2 className="font-medium">Rewards</h2>
              <hr className="my-2" />
              <p className="text-xs">Coinbase: {node.Coinbase}</p>
            </Card>
            <Card className="mb-4">
              <h2 className="font-medium">Services</h2>
              <hr className="my-2" />
              <pre className="text-xs">
                {JSON.stringify(node.PostStates, null, 2)}
              </pre>
            </Card>
            {Peers && <PeersStream peers={Peers} />}
          </div>
          {Events && <EventsStream events={Events} />}
        </div>
      </Page>
    )
  }

  return null
}

export default Node
