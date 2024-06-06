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

const Nodes = () => {
  return (
    <Page title="Nodes" Icon={NodeIcon}>
      <Card>
        {/* <CardHeader>
          <CardTitle>My Nodes</CardTitle>
        </CardHeader> */}
        <CardContent>
          <Table>
            <TableHeader>
              <TableHead>Name</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <Link to={'nodes/Homelab'}>Homelab</Link>
                </TableCell>
                <TableCell className="font-medium">192.168.1.2</TableCell>
                <TableCell>v1.5.7</TableCell>
                <TableCell className="text-green-500">
                  <ConnectionIcon className="inline-block" /> Online
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Homelab</TableCell>
                <TableCell className="font-medium">192.168.1.2</TableCell>
                <TableCell>v1.5.7</TableCell>
                <TableCell className="text-green-500">
                  <ConnectionIcon className="inline-block" /> Online
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Homelab</TableCell>
                <TableCell className="font-medium">192.168.1.2</TableCell>
                <TableCell>v1.5.7</TableCell>
                <TableCell className="text-green-500">
                  <ConnectionIcon className="inline-block" /> Online
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Page>
  )
}

export default Nodes
