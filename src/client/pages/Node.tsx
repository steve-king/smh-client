import { useParams } from 'react-router-dom'
import { useSpacemesh } from '../context/spacemesh'
import Page from '@/client/components/Page'
import Card from '@/client/components/Card'
import { displayNodeStatus } from '../components/tables/cells/NodeStatus'
import { Node as NodeProps } from '@/types'
import { EventsStream } from '../components/Events'
import { PeersStream } from '../components/Peers'
import { Progress } from '../components/ui/progress'

const Node = () => {
  const { id } = useParams()
  const { nodes } = useSpacemesh()
  let node = id && nodes.find((node: NodeProps) => node.config.id === id)

  if (node) {
    const { isOnline, config, Status, Version, Events, Peers } = node
    const statusDisplay = displayNodeStatus(node.isOnline, node.Status)

    return (
      <Page title={config.name} icon="nodes">
        {/* <pre className="text-xs">{JSON.stringify(Events, null, 2)}</pre> */}
        <div className="mb-4 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            icon={statusDisplay.icon}
            iconProps={{ className: statusDisplay.textColour }}
          >
            <h3 className="text-xs text-muted-foreground">Status</h3>
            <p className="text-2xl">{statusDisplay.text}</p>
            {isOnline ? (
              <>
                <p className="text-xs text-muted-foreground mb-1">
                  Layer: {node.Status?.synced_layer} / {node.Status?.top_layer}
                </p>
                {!node.Status?.is_synced && (
                  <Progress
                    value={statusDisplay.syncProgress}
                    className={statusDisplay.textColour}
                    indicatorColor={statusDisplay.bgColour}
                  />
                )}
              </>
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
              {node.Coinbase && (
                <>
                  <hr className="my-2" />
                  <p className="text-xs">Coinbase: {node.Coinbase}</p>
                </>
              )}
            </Card>
            <Card className="mb-4">
              <h2 className="font-medium">Services</h2>
              {node.PostStates && (
                <>
                  <hr className="my-2" />
                  <pre className="text-xs">
                    {JSON.stringify(node.PostStates, null, 2)}
                  </pre>
                </>
              )}
            </Card>
            <Card>
              <h2 className="font-medium">Peers</h2>
              {Peers && <PeersStream peers={Peers} />}
            </Card>
          </div>
          <Card>
            <h2 className="mb-4 font-medium">Events</h2>
            {Events && <EventsStream events={Events} />}
          </Card>
        </div>
      </Page>
    )
  }

  return null
}

export default Node
