import { Page } from '@/client/app'
import * as Icon from '@/client/components/Icon'
import Stat from '@/client/components/Stat'

export const DashboardPage = () => {
  return (
    <Page title="Dashboard" icon="dashboard">
      <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon="price">
          <p>SMH Price</p>
          <p className="text-3xl">2.50</p>
          <p className="text-xs font-light  text-muted-foreground">
            Source: Coingecko
          </p>
        </Stat>

        <Stat icon="connection">
          <p>Network</p> <p>Epoch: 23 Layer: 93972</p>
          <p className="text-xs font-light  text-muted-foreground">
            Progress bar
          </p>
        </Stat>

        <Stat icon="service">
          <p>Storage</p>
          <p>120 SUs / 7.5 TiB</p>
          <p className="text-xs font-light  text-muted-foreground">
            Services: 4
          </p>
        </Stat>

        <Stat icon="layers">
          <p>Next layer</p>
          <p>14 hrs, 23 min</p>
          <p className="text-xs font-light  text-muted-foreground">
            Node: Homelab
          </p>
        </Stat>
      </div>
    </Page>
  )
}

export default DashboardPage
