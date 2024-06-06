import { useParams } from 'react-router-dom'
import { useStoreContext } from '@/client/lib/store'
import { findItemBy, parseNode } from '@/client/lib/utils'
import { Page } from '@/client/app'
import { Node as NodeProps } from '@/types'

import * as Icon from '@/client/components/Icon'

import Stat from '@/client/components/Stat'

// import colors from 'tailwindcss/colors'
// const green = colors.green[500] // #16a34a
// const yellow = colors.yellow[500] // #16a34a

const Node = () => {
  // let nodeProps: NodeProps
  let node
  const { name } = useParams()
  const { state } = useStoreContext()
  const nodeProps: NodeProps = findItemBy('name', name, state?.nodes)

  if (nodeProps) {
    node = parseNode(nodeProps)
    return (
      <Page title={node.name} Icon={Icon.Node}>
        <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={{ component: Icon.Host }}>
            <h3 className="text-xs text-muted-foreground">Host</h3>
            <p className="text-2xl">{node.host}</p>
            <p className="text-xs text-muted-foreground">
              :{node.port_public} :{node.port_private} :{node.port_post}
            </p>
          </Stat>
          <Stat
            icon={{
              component: Icon.Connection,
              props: { color: node.statusColour },
            }}
          >
            <h3 className="text-xs text-muted-foreground">Status</h3>
            <p className="text-2xl">{node.statusText}</p>
            <p className="text-xs text-muted-foreground">
              Layer: {node.status?.synced_layer?.number} /
              {node.status?.top_layer?.number}
            </p>
          </Stat>
          <Stat icon={{ component: Icon.Peers }}>
            <h3 className="text-xs text-muted-foreground">Network</h3>
            <p className="text-2xl">Peers: {node.status?.connected_peers}</p>
          </Stat>
          <Stat icon={{ component: Icon.Version }}>
            <h3 className="text-xs text-muted-foreground">Version:</h3>
            <p className="text-2xl">v1.5.7</p>
            <p className="text-xs text-muted-foreground">view source</p>
          </Stat>
        </div>

        {/* <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          <Stat icon={{ component: Icon.Node }}>
            <p>Status</p>
            <p>{status}</p>
          </Stat>
          <Stat icon={{ component: Icon.Service, props: { color: yellow } }}>
            <p>Storage</p>
            <p>Idle</p>
          </Stat>
        </div> */}

        {/* <Stat icon={{ component: Icon.Service, props: { color: yellow } }}>
          <p>Storage</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </Stat> */}

        <pre className="text-xs">{JSON.stringify(node, null, 2)}</pre>
      </Page>
    )
  }

  return null
}

export default Node
