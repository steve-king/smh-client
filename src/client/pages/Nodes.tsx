import { useContext, useState } from 'react'
import Page from '@/client/components/Page'
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

import { SpacemeshContext } from '../context/spacemesh'
import NodesTable from '../components/tables/NodesTable'
import { NodeForm } from '@/client/components/forms'

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
        <NodesTable nodes={nodes} />
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
