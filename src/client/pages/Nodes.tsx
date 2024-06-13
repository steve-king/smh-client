import { useContext, useState } from 'react'
import Page from '@/client/components/Page'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
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
  const { getNodes, fetchState } = useContext(SpacemeshContext)
  const nodes = getNodes()

  const openNodeForm = (id?: string) => {
    setNodeId(id)
    setShowNodeForm(true)
  }

  const closeNodeForm = () => {
    setShowNodeForm(false)
    setNodeId(undefined)
  }

  const openDeleteDialog = (id: string): void => {
    setNodeId(id)
    setShowDeleteDialog(true)
  }

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false)
    setNodeId(undefined)
  }

  const deleteNode = () => {
    fetch('/api/node/' + nodeId, { method: 'DELETE' })
      .then(() => {
        fetchState()
        closeDeleteDialog()
      })
      .catch((e) => console.log(e))
  }

  // console.log('NODES', nodes)

  return (
    <Page
      title="Nodes"
      icon="nodes"
      Actions={() => (
        <Button variant="ghost" size="icon" onClick={() => openNodeForm()}>
          <Icon i="add"></Icon>
        </Button>
      )}
    >
      <Card>
        <NodesTable
          nodes={nodes}
          showEditForm={openNodeForm}
          openDeleteDialog={openDeleteDialog}
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
              onSubmit={closeNodeForm}
              onCancel={closeNodeForm}
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
            <Button variant="outline" onClick={closeDeleteDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteNode}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Page>
  )
}

export default Nodes
