import { Page } from '@/client/app'

import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  // CardTitle,
} from '@/client/components/ui/card'
import { Separator } from '@/client/components/ui/separator'
import { ReactNode } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/client/components/ui/table'

import { DollarSign, Globe, HardDrive, Layers3 } from 'lucide-react'

import * as Icon from '@/client/components/ui/icons'

const CardTemplate = ({
  title,
  Icon,
  children,
}: {
  title: string
  Icon: React.ElementType
  children?: ReactNode
}) => {
  return (
    <Card className="flex items-center">
      {Icon && (
        <div className="pl-4">
          <Icon
            className="relative"
            style={{ top: '1px' }}
            size={48}
            strokeWidth={1}
          />
        </div>
      )}
      <div>
        <CardHeader className="pb-0">
          <h2 className="font-light">{title}</h2>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </div>
    </Card>
  )
}

export const DashboardPage = () => {
  return (
    <Page title="Dashboard">
      <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <CardTemplate title="SMH Price" Icon={DollarSign}>
          <p className="text-3xl">2.50</p>
          <p className="text-xs font-light  text-muted-foreground">
            Source: Coingecko
          </p>
        </CardTemplate>

        <CardTemplate title="Network" Icon={Globe}>
          <p>Epoch: 23 Layer: 93972</p>
          <p className="text-xs font-light  text-muted-foreground">
            Progress bar
          </p>
        </CardTemplate>

        <CardTemplate title="Storage" Icon={HardDrive}>
          <p>120 SUs / 7.5 TiB</p>
          <p className="text-xs font-light  text-muted-foreground">
            Services: 4
          </p>
        </CardTemplate>

        <CardTemplate title="Next layer" Icon={Layers3}>
          <p>14 hrs, 23 min</p>
          <p className="text-xs font-light  text-muted-foreground">
            Node: Homelab
          </p>
        </CardTemplate>
      </div>
      <Separator className="mb-6" />

      <div className="mb-6 grid gap-4 sm-max:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pt-4">
            <h2 className="text-bold text-center">Nodes</h2>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-green-500">
                    <Globe className="inline-block" />
                  </TableCell>
                  <TableCell className="font-medium">Homelab</TableCell>
                  <TableCell className="text-right">v1.5.7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-red-500">
                    <Globe className="inline-block" />
                  </TableCell>
                  <TableCell className="font-medium">Smapp</TableCell>
                  <TableCell className="text-right">v1.5.7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-500">
                    <Globe className="inline-block" />
                  </TableCell>
                  <TableCell className="font-medium">Homelab</TableCell>
                  <TableCell className="text-right">v1.5.7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-500">
                    <Globe className="inline-block" />
                  </TableCell>
                  <TableCell className="font-medium">Homelab</TableCell>
                  <TableCell className="text-right">v1.5.7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-500">
                    <Globe className="inline-block" />
                  </TableCell>
                  <TableCell className="font-medium">Homelab</TableCell>
                  <TableCell className="text-right">v1.5.7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-yellow-500">
                    <Globe className="inline-block" />
                  </TableCell>
                  <TableCell className="font-medium">Homelab</TableCell>
                  <TableCell className="text-right">v1.5.6</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-500">
                    <Globe className="inline-block" />
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
        </Card>
      </div>
    </Page>
  )
}

export default DashboardPage
