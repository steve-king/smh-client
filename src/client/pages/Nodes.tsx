import { Page } from '@/client/app'

import Card from '@/client/components/Stat'

import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'

import { Link } from 'react-router-dom'

import * as Icon from '../components/ui/icons'
import { useStoreContext } from '@/client/lib/store'

import { Node as NodeProps } from '@/types'
import { parseNode } from '@/client/lib/utils'

const Node = (props: NodeProps) => {
  const node = parseNode(props)

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
      <TableCell className={'text-' + node.statusColour + '-500'}>
        <div className="flex items-center">
          <Icon.Connection />
          <span className="ml-2">{node.statusText}</span>
        </div>
      </TableCell>
    </TableRow>
  )
}

const Nodes = () => {
  const { state } = useStoreContext()
  return (
    <Page title="Nodes" Icon={Icon.Node}>
      <Card>
        <Table>
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
