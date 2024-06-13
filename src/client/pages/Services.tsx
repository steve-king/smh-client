import { useContext, useState } from 'react'
import Page from '@/client/components/Page'

import { Button } from '../components/ui/button'
import Card from '@/client/components/Card'
import Icon from '@/client/components/Icon'

import { SpacemeshContext } from '../context/spacemesh'
import ServicesTable from '../components/tables/ServicesTable'
import { FormDialog, ServiceForm } from '@/client/components/forms'

export default function Services() {
  const { getServices } = useContext(SpacemeshContext)
  const [openForm, setOpenForm] = useState(false)
  const services = getServices()

  // console.log('SERVICES', services)

  return (
    <Page
      title="Services"
      icon="services"
      Actions={() => (
        <>
          <Button variant="ghost" size="icon" onClick={() => setOpenForm(true)}>
            <Icon i="add"></Icon>
          </Button>
          <FormDialog
            title="Create service"
            desc="Add a new service to your configuration."
            open={openForm}
          >
            <ServiceForm
              onSubmit={() => setOpenForm(false)}
              onCancel={() => setOpenForm(false)}
            />
          </FormDialog>
        </>
      )}
    >
      <Card>
        <ServicesTable services={services} />
      </Card>
    </Page>
  )
}
