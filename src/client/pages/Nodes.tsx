import { useContext, useState } from 'react'
import Page from '@/client/components/Page'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/client/components/ui/alert-dialog'
import { Button } from '../components/ui/button'
import Card from '@/client/components/Card'
import Icon from '@/client/components/Icon'

import { SpacemeshContext } from '../context/spacemesh'
import NodesTable from '../components/tables/NodesTable'
import { NodeForm } from '@/client/components/forms'

const Nodes = () => {
  const [ShowNodeForm, setShowNodeForm] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [nodeId, setNodeId] = useState<string | undefined>(undefined)
  const { getNodes } = useContext(SpacemeshContext)
  const nodes = getNodes()

  const onNodeFormSubmit = () => {
    console.log('nodeFormSubmit')
    setShowNodeForm(false)
    setNodeId(undefined)
  }

  // console.log('NODES', nodes)

  return (
    <Page
      title="Nodes"
      icon="nodes"
      Actions={() => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setNodeId(undefined)
            setShowNodeForm(true)
          }}
        >
          <Icon i="add"></Icon>
        </Button>
      )}
    >
      <Card>
        <NodesTable
          nodes={nodes}
          showEditForm={(id: string): void => {
            setNodeId(id)
            setShowNodeForm(true)
          }}
          showDeleteDialog={(id: string): void => {
            setNodeId(id)
            setShowDeleteDialog(true)
          }}
        />
      </Card>
      <AlertDialog open={ShowNodeForm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Node config</AlertDialogTitle>
            <AlertDialogDescription>
              Add a new node to your configuration.
            </AlertDialogDescription>
            <NodeForm
              nodeId={nodeId}
              onSubmit={onNodeFormSubmit}
              onCancel={() => {
                setShowNodeForm(false)
                setNodeId(undefined)
              }}
            />
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete node</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this node?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteDialog(false)
                setNodeId(undefined)
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                fetch('/api/node/' + nodeId, { method: 'DELETE' })
                  .then(() => {
                    setShowDeleteDialog(false)
                    setNodeId(undefined)
                  })
                  .catch((e) => console.log(e))
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Page>
  )
}

export default Nodes
