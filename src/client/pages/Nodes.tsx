import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Page from '@/client/components/Page'
import { cn } from '@/client/lib/utils'

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

import {
  SpacemeshContext,
  findNodeBelongsToService,
} from '../context/spacemesh'

import {
  NodeStatus,
  parseNodeStatus,
} from '@/client/components/tables/NodeStatus'
import { Node, Service } from '@/types'

const NodeRow = (props: NodeProps) => {
  // const node = parseNodeStatus(props)
  const textClass = props.isOnline ? '' : 'text-muted-foreground'
  const path = '/node/' + props.id
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link to={props.path}>{props.config.name}</Link>
      </TableCell>
      <TableCell>{props.Version}</TableCell>
      <TableCell className="font-medium">{props.config.host}</TableCell>
      <TableCell>
        :{props.config.port_public} :{props.config.port_private} :
        {props.config.port_post}
      </TableCell>
      <TableCell>{props.PostStates?.length}</TableCell>
      <TableCell>
        <NodeStatus {...parseNodeStatus(props)} />
        {/* <div className="flex items-center">
          <Icon i={node.statusIcon} className={node.statusColour} />
          <span className={cn('ml-2', textClass)}>{node.statusText}</span>
        </div> */}
      </TableCell>
    </TableRow>
  )
}

const Nodes = () => {
  const { getServices, getNodes } = useContext(SpacemeshContext)
  const nodes = getNodes()
  // const services = getServices().map((service: Service) => ({
  //   ...service,
  //   node: findNodeBelongsToService(nodes, service),
  // }))

  const [showForm, setShowForm] = useState(false)

  const onNodeFormSubmit = () => {
    console.log('nodeFormSubmit')
    setShowForm(false)
  }

  console.log('NODES', nodes)

  return (
    <Page
      title="Nodes"
      icon="node"
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
