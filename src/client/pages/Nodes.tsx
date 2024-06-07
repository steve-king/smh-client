import { useState } from 'react'
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

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/client/components/ui/alert-dialog'

import { Button } from '../components/ui/button'

import { NodeForm } from '@/client/components/forms'

import { Node as NodeProps } from '@/types'
import { Separator } from '@radix-ui/react-separator'

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

  const [showForm, setShowForm] = useState(false)

  const onNodeFormSubmit = () => {
    console.log('nodeFormSubmit')
    setShowForm(false)
  }

  return (
    <Page
      title="Nodes"
      icon="node"
      Actions={() => (
        <Button variant="ghost" size="icon" onClick={() => setShowForm(true)}>
          {/* <span className="mr-2">Add node</span> */}
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
            {state?.nodes.map((node) => (
              <Node key={node.name} {...node} />
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
            <Separator className="my-4" />
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
