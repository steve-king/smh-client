import { Page } from '@/client/app'
import { Separator } from '@/client/components/ui/separator'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/client/components/ui/table'

import * as Icon from '@/client/components/ui/icons'
import Stat from '@/client/components/Stat'

export const DashboardPage = () => {
  return (
    <Page title="Dashboard">
      <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={{ component: Icon.Price }}>
          <p>SMH Price</p>
          <p className="text-3xl">2.50</p>
          <p className="text-xs font-light  text-muted-foreground">
            Source: Coingecko
          </p>
        </Stat>

        <Stat icon={{ component: Icon.Connection }}>
          <p>Network</p> <p>Epoch: 23 Layer: 93972</p>
          <p className="text-xs font-light  text-muted-foreground">
            Progress bar
          </p>
        </Stat>

        <Stat icon={{ component: Icon.Service }}>
          <p>Storage</p>
          <p>120 SUs / 7.5 TiB</p>
          <p className="text-xs font-light  text-muted-foreground">
            Services: 4
          </p>
        </Stat>

        <Stat icon={{ component: Icon.Layers }}>
          <p>Next layer</p>
          <p>14 hrs, 23 min</p>
          <p className="text-xs font-light  text-muted-foreground">
            Node: Homelab
          </p>
        </Stat>
      </div>
      <Separator className="mb-6" />

      <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card>
          <CardHeader className="pt-4">
            <h2 className="text-bold text-center">Nodes</h2>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-green-500">
                    <Icon.Connection className="inline-block" />
                  </TableCell>
                  <TableCell className="font-medium">Homelab</TableCell>
                  <TableCell className="text-right">v1.5.7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-red-500">
                    <Icon.Connection className="inline-block" />
                  </TableCell>
                  <TableCell className="font-medium">Smapp</TableCell>
                  <TableCell className="text-right">v1.5.7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-500">
                    <Icon.Connection className="inline-block" />
                  </TableCell>
                  <TableCell className="font-medium">Homelab</TableCell>
                  <TableCell className="text-right">v1.5.7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-500">
                    <Icon.Connection className="inline-block" />
                  </TableCell>
                  <TableCell className="font-medium">Homelab</TableCell>
                  <TableCell className="text-right">v1.5.7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-500">
                    <Icon.Connection className="inline-block" />
                  </TableCell>
                  <TableCell className="font-medium">Homelab</TableCell>
                  <TableCell className="text-right">v1.5.7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-yellow-500">
                    <Icon.Connection className="inline-block" />
                  </TableCell>
                  <TableCell className="font-medium">Homelab</TableCell>
                  <TableCell className="text-right">v1.5.6</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-500">
                    <Icon.Connection className="inline-block" />
                  </TableCell>
                  <TableCell className="font-medium">Homelab</TableCell>
                  <TableCell className="text-right">v1.5.6</TableCell>
                </TableRow>
              </TableBody>
              <TableCaption className="text-xs pb-4 pt-0">
                All of your nodes are online.
              </TableCaption>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader className="pt-4">
            <h2 className="text-bold text-center">Homelab</h2>
          </CardHeader>
          <CardContent></CardContent>
        </Card> */}
      </div>
    </Page>
  )
}

export default DashboardPage
