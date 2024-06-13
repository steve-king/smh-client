import { useContext, useState } from 'react'
import Page from '@/client/components/Page'

import { Button } from '../components/ui/button'
import Card from '@/client/components/Card'
import Icon from '@/client/components/Icon'

import { SpacemeshContext } from '../context/spacemesh'
import NodesTable from '../components/tables/NodesTable'
import { FormDialog, NodeForm } from '@/client/components/forms'

const Nodes = () => {
  const { getNodes } = useContext(SpacemeshContext)
  const [openForm, setOpenForm] = useState(false)
  const nodes = getNodes()

  return (
    <Page
      title="Nodes"
      icon="nodes"
      Actions={() => (
        <>
          <Button variant="ghost" size="icon" onClick={() => setOpenForm(true)}>
            <Icon i="add"></Icon>
          </Button>
          <FormDialog
            title="Create node"
            desc="Add a new node to your configuration."
            open={openForm}
          >
            <NodeForm
              onSubmit={() => setOpenForm(false)}
              onCancel={() => setOpenForm(false)}
            />
          </FormDialog>
        </>
      )}
    >
      <Card>
        <NodesTable nodes={nodes} />
      </Card>
    </Page>
  )
}

export default Nodes
