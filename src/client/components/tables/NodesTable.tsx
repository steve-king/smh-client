import { Link } from 'react-router-dom'
import Icon from '@/client/components/Icon'

import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/client/components/ui/table'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/client/components/ui/dropdown-menu'

import { Button } from '@/client/components/ui/button'

import { NodeStatus } from './cells/NodeStatus'

import { Node as NodeProps } from '@/types'

const NodeRow = ({
  node,
  showEditForm,
  openDeleteDialog,
}: {
  node: NodeProps
  showEditForm: (id: string) => void
  openDeleteDialog: (id: string) => void
}) => {
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
        <div className="flex items-center justify-end gap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="mx-1">
              <Button variant="ghost" size="icon">
                <Icon i="actions" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => showEditForm(node.config.id)}>
                <Icon i="edit" size="16" className="mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => openDeleteDialog(node.config.id)}
                className="hover:text-red-600"
              >
                <Icon i="delete" size="16" className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  )
}

interface Props {
  nodes: NodeProps[]
  showEditForm: (id: string) => void
  openDeleteDialog: (id: string) => void
}
export default function NodesTable({
  nodes,
  showEditForm,
  openDeleteDialog,
}: Props) {
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
          <NodeRow
            key={node.config.id}
            node={node}
            showEditForm={showEditForm}
            openDeleteDialog={openDeleteDialog}
          />
        ))}
      </TableBody>
    </Table>
  )
}
