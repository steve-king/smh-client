import { Link } from 'react-router-dom'
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/client/components/ui/table'
import Icon from '@/client/components/Icon'
import { NodeStatus, NodeActions } from '@/client/components/tables/cells'
import { Node as NodeProps } from '@/types'

const NodeRow = ({ node }: { node: NodeProps }) => {
  const path = '/node/' + node.config.id
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link to={path}>{node.config.name}</Link>
      </TableCell>
      <TableCell>{node.PostStates?.length}</TableCell>
      <TableCell className="font-medium">{node.config.host}</TableCell>
      <TableCell>
        :{node.config.port_public} :{node.config.port_private} :
        {node.config.port_post}
      </TableCell>
      <TableCell>{node.Version}</TableCell>
      <TableCell>
        <NodeStatus node={node} />
      </TableCell>
      <TableCell>
        <NodeActions id={node.config.id} />
      </TableCell>
    </TableRow>
  )
}

interface Props {
  nodes: NodeProps[]
}
export default function NodesTable({ nodes }: Props) {
  return (
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
              <Icon i="services" className="mr-2" /> Services
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
              <Icon i="version" className="mr-2" /> Version
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center">Status</div>
          </TableHead>
          <TableHead>
            <div className="flex items-center justify-end">&nbsp;</div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {nodes.map((node: NodeProps) => (
          <NodeRow key={node.config.id} node={node} />
        ))}
      </TableBody>
    </Table>
  )
}
