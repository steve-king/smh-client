import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Page from '@/client/components/Page'

import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/client/components/ui/alert-dialog'
import { Button } from '../components/ui/button'
import Card from '@/client/components/Card'
import Icon from '@/client/components/Icon'

import { NodeForm } from '@/client/components/forms'
import { Node as NodeProps } from '@/types'
import { SpacemeshContext } from '../context/spacemesh'
import { NodeStatus } from '@/client/components/tables/cells/NodeStatus'
import { Node } from '@/types'

const NodeRow = (props: NodeProps) => {
  const path = '/node/' + props.config.id
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link to={path}>{props.config.name}</Link>
      </TableCell>
      <TableCell>{props.Version}</TableCell>
      <TableCell className="font-medium">{props.config.host}</TableCell>
      <TableCell>
        :{props.config.port_public} :{props.config.port_private} :
        {props.config.port_post}
      </TableCell>
      <TableCell>{props.PostStates?.length}</TableCell>
      <TableCell>
        <NodeStatus node={props} />
      </TableCell>
    </TableRow>
  )
}

const Nodes = () => {
  const [showForm, setShowForm] = useState(false)
  const { getNodes } = useContext(SpacemeshContext)
  const nodes = getNodes()

  const onNodeFormSubmit = () => {
    console.log('nodeFormSubmit')
    setShowForm(false)
  }

  // console.log('NODES', nodes)

  return (
    <Page
      title="Nodes"
      icon="nodes"
      Actions={() => (
        <Button variant="ghost" size="icon" onClick={() => setShowForm(true)}>
          <Icon i="add"></Icon>
        </Button>
      )}
    >
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
            {nodes.map((node: Node) => (
              <NodeRow key={node.config.id} {...node} />
            ))}
          </TableBody>
        </Table>
      </Card>
      <AlertDialog open={showForm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Node config</AlertDialogTitle>
            <AlertDialogDescription>
              Add a new node to your configuration.
            </AlertDialogDescription>
            <NodeForm
              onSubmit={onNodeFormSubmit}
              onCancel={() => setShowForm(false)}
            />
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </Page>
  )
}

export default Nodes
