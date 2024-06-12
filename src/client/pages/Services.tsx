import { useSpacemesh, findNodeBelongsToService } from '../context/spacemesh'
import { Service } from '@/types'
import Page from '@/client/components/Page'
import Card from '../components/Card'
import ServicesTable from '../components/tables/ServicesTable'

export default function Services() {
  const { getServices, getNodes } = useSpacemesh()
  const nodes = getNodes()
  const services = getServices().map((service: Service) => ({
    ...service,
    node: findNodeBelongsToService(nodes, service),
  }))

  console.log('SERVICES', services)

  return (
    <Page
      title="Services"
      icon="services"
      // Actions={() => (
      //   <>
      //     <Link
      //       to="/services/create"
      //       className={buttonVariants({ variant: 'ghost' })}
      //     >
      //       <span className="mr-2">Add service</span>
      //       <Icon i="add" />
      //     </Link>
      //   </>
      // )}
    >
      <Card>
        <ServicesTable services={services} />
      </Card>
    </Page>
  )
}
