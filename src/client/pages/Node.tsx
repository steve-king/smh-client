import { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { useStoreContext } from '@/client/lib/store'
import { findItemBy, parseNodeObject } from '@/client/lib/utils'
import { Page } from '@/client/app'
import { Node as NodeIcon } from '@/client/components/ui/icons'
import { Node as NodeProps } from '@/types'

import { Connection } from '@/client/components/ui/icons'

import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  // CardTitle,
} from '@/client/components/ui/card'

const CardTemplate = ({
  title,
  Icon,
  children,
}: {
  title: string
  Icon: React.ElementType
  children?: ReactNode
}) => {
  return (
    <Card className="flex items-center">
      {Icon && (
        <div className="pl-4 text-green-500">
          <Icon
            className="relative"
            style={{ top: '1px' }}
            size={48}
            strokeWidth={1}
          />
        </div>
      )}
      <div>
        <CardHeader className="pb-0">
          <h2 className="font-light">{title}</h2>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </div>
    </Card>
  )
}

const Node = () => {
  let nodeObject: NodeProps
  let node
  const { name } = useParams()
  const { state } = useStoreContext()
  nodeObject = findItemBy('name', name, state?.nodes)

  if (nodeObject) {
    node = parseNodeObject(nodeObject)

    let status = 'Offline'
    let colour = 'red'
    let version
    const isOnline = !node.data.status.error

    if (isOnline) {
      status = node.data.status.is_synced ? 'Online' : 'Syncing'
      colour = node.data.status.is_synced ? 'green' : 'yellow'
    }

    return (
      <Page title={node.name} Icon={NodeIcon}>
        <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <CardTemplate title="Status" Icon={Connection}>
            <p>{status}</p>
            <p className="text-xs font-light  text-muted-foreground"></p>
          </CardTemplate>
        </div>

        <pre className="text-xs">{JSON.stringify(node, null, 2)}</pre>
      </Page>
    )
  }

  return null
}

export default Node
