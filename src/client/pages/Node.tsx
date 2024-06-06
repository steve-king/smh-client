import { useParams } from 'react-router-dom'
import { useStoreContext } from '@/client/lib/store'
import { findItemBy, parseNode } from '@/client/lib/utils'
import { Page } from '@/client/app'
import { Node as NodeIcon } from '@/client/components/ui/icons'
import { Node as NodeProps } from '@/types'

import * as Icon from '@/client/components/ui/icons'

import Stat from '@/client/components/Stat'

import colors from 'tailwindcss/colors'
const green = colors.green[500] // #16a34a
const yellow = colors.yellow[500] // #16a34a

const Node = () => {
  let nodeProps: NodeProps
  let node
  const { name } = useParams()
  const { state } = useStoreContext()
  nodeProps = findItemBy('name', name, state?.nodes)

  if (nodeProps) {
    node = parseNode(nodeProps)
    return (
      <Page title={node.name} Icon={NodeIcon}>
        <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            icon={{
              component: Icon.Connection,
              props: { color: node.statusColour },
            }}
          >
            <p>Status</p>
            <p>{node.statusText}</p>
          </Stat>
          <Stat icon={{ component: Icon.Host }}>
            <p>Host: {}</p>
            <p>{node.host}</p>
          </Stat>
          <Stat icon={{ component: Icon.Service }}>
            <p>Storage</p>
            <p>Idle</p>
          </Stat>
        </div>

        <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          <Stat icon={{ component: Icon.Node }}>
            <p>Status</p>
            <p>{status}</p>
          </Stat>
          <Stat icon={{ component: Icon.Service, props: { color: yellow } }}>
            <p>Storage</p>
            <p>Idle</p>
          </Stat>
        </div>

        <Stat icon={{ component: Icon.Service, props: { color: yellow } }}>
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
        </Stat>

        <pre className="text-xs">{JSON.stringify(node, null, 2)}</pre>
      </Page>
    )
  }

  return null
}

export default Node
