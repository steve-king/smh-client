import { Page } from '@/client/app'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/client/components/ui/card'

import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '../components/ui/table'

import { Button } from '../components/ui/button'

import { Link } from 'react-router-dom'

import {
  Node as NodeIcon,
  Connection as ConnectionIcon,
} from '../components/ui/icons'
import { useStoreContext } from '@/client/lib/store'

import { Node as NodeProps } from '@/types'
import { slug } from '@/client/lib/utils'

const Node = ({
  name,
  host,
  port_public,
  port_private,
  port_post,
  smeshing,
  data,
}: NodeProps) => {
  let status = 'Offline'
  let colour = 'red'
  let version
  const isOnline = !data.status.error

  if (isOnline) {
    status = data.status.is_synced ? 'Online' : 'Syncing'
    colour = data.status.is_synced ? 'green' : 'yellow'
  }

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          <Link to={`/nodes/${slug(name)}`}>{name}</Link>
        </TableCell>
        <TableCell className="font-medium">{host}</TableCell>
        <TableCell>
          :{port_public} :{port_private} :{port_post}
        </TableCell>
        <TableCell>{version}</TableCell>
        <TableCell className={'text-' + colour + '-500'}>
          <div className="flex items-center">
            <ConnectionIcon className="inline-block" />{' '}
            <span className="ml-2">{status}</span>
          </div>
        </TableCell>
      </TableRow>
    </>
  )
}

const Nodes = () => {
  const { state } = useStoreContext()
  return (
    <Page title="Nodes" Icon={NodeIcon}>
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Host</TableHead>
                <TableHead>Ports</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state?.nodes.map((node) => (
                <Node key={node.name} {...node} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Page>
  )
}

export default Nodes
