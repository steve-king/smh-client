import { Link } from 'react-router-dom'
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

import { Node as NodeProps } from '@/types'

const Node = (props: NodeProps) => {
  const node = parseNode(props)
  const textClass = node.isOnline ? '' : 'text-muted-foreground'
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link to={node.path}>{node.name}</Link>
      </TableCell>
      <TableCell className="font-medium">{node.host}</TableCell>
      <TableCell>
        :{node.port_public} :{node.port_private} :{node.port_post}
      </TableCell>
      <TableCell>{node.version}</TableCell>
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
              <TableHead>Name</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Ports</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state?.nodes.map((node) => (
              <Node key={node.name} {...node} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </Page>
  )
}

export default Nodes
