import Page from '@/client/components/Page'
import Card from '@/client/components/Card'
import { StorageCard, MarketData } from '../components/cards'

export const DashboardPage = () => {
  return (
    <Page title="Dashboard" icon="dashboard">
      <div className="mb-6 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <MarketData />

        <Card icon="network">
          <p>Network</p> <p>Epoch: 23 Layer: 93972</p>
          <p className="text-xs font-light  text-muted-foreground">
            Progress bar
          </p>
        </Card>

        <StorageCard />

        <Card icon="layers">
          <p>Next layer</p>
          <p>14 hrs, 23 min</p>
          <p className="text-xs font-light  text-muted-foreground">
            Node: Homelab
          </p>
        </Card>
      </div>
    </Page>
  )
}

export default DashboardPage
