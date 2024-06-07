import { Link, Outlet } from 'react-router-dom'
import { Page } from '@/client/app'
import { useStoreContext } from '@/client/lib/store'
import { parseNode, cn } from '@/client/lib/utils'

import Card from '@/client/components/Card'
import Icon from '../components/Icon'

import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'

import { NodeForm } from '@/client/components/forms'

import { Node as NodeProps } from '@/types'

const Node = (props: NodeProps) => {
  const node = parseNode(props)
  const textClass = node.isOnline ? '' : 'text-muted-foreground'
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link to={node.path}>{node.name}</Link>
      </TableCell>
      <TableCell>{node.version}</TableCell>
      <TableCell className="font-medium">{node.host}</TableCell>
      <TableCell>
        :{node.port_public} :{node.port_private} :{node.port_post}
      </TableCell>
      <TableCell>{props.data.postInfo?.states?.length}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <Icon i={node.statusIcon} className={node.statusColour} />
          <span className={cn('ml-2', textClass)}>{node.statusText}</span>
        </div>
      </TableCell>
    </TableRow>
  )
}

const Nodes = () => {
  const { state } = useStoreContext()
  return (
    <Page title="Nodes" icon="node">
      <Card>
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center">
                  <Icon i="name" className="mr-2" /> Name
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <Icon i="version" className="mr-2" /> Version
                </div>
              </TableHead>

              <TableHead>
                <div className="flex items-center">
                  <Icon i="host" className="mr-2" /> Host
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <Icon i="port" className="mr-2" /> Ports
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <Icon i="services" className="mr-2" /> Services
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">Status</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state?.nodes.map((node) => (
              <Node key={node.name} {...node} />
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="mt-6">
          <NodeForm />
        </Card>
      </div>
    </Page>
  )
}

export default Nodes
