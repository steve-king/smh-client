import { Page } from '@/client/app'
import * as Icon from '@/client/components/ui/icons'
import Card from '../components/Stat'

import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'

import { Service as ServiceProps, Node as NodeProps } from '@/types'
import { useStoreContext } from '@/client/lib/store'
import { getNodeByServiceName, nodePath } from '../lib/utils'
import { Link } from 'react-router-dom'

interface RowProps extends ServiceProps {
  node: NodeProps | undefined
}

const Service = ({ name, host, port_operator, node }: RowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="font-medium">{host}</TableCell>
      <TableCell>:{port_operator}</TableCell>
      <TableCell>Status</TableCell>
      {/* <TableCell className={'text-' + node.statusColour + '-500'}>
        <div className="flex items-center">
        <Icon.Connection />
        <span className="ml-2">{node.statusText}</span>
        </div>
        </TableCell> */}
      <TableCell>
        {node && <Link to={nodePath(node.name)}>{node.name}</Link>}
      </TableCell>
    </TableRow>
  )
}

export default function Services() {
  const { state } = useStoreContext()

  return (
    <Page title="Services" Icon={Icon.Service}>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Port</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Node</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state?.services.map((service: ServiceProps) => (
              <Service
                key={service.name}
                {...service}
                node={getNodeByServiceName(service.name, state.nodes)}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    </Page>
  )
}
