import Page from '@/client/components/Page'
import Card from '@/client/components/Card'

export const DashboardPage = () => {
  return (
    <Page title="Dashboard" icon="dashboard">
      <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card icon="price">
          <p>SMH Price</p>
          <p className="text-2xl">2.50</p>
          <p className="text-xs font-light  text-muted-foreground">
            Source: Coingecko
          </p>
        </Card>

        <Card icon="network">
          <p>Network</p> <p>Epoch: 23 Layer: 93972</p>
          <p className="text-xs font-light  text-muted-foreground">
            Progress bar
          </p>
        </Card>

        <Card icon="service">
          <p>Storage</p>
          <p>120 SUs / 7.5 TiB</p>
          <p className="text-xs font-light  text-muted-foreground">
            Services: 4
          </p>
        </Card>

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
