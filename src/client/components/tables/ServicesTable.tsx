import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/client/components/ui/table'
import Icon from '@/client/components/Icon'
import { NodeStatus } from '@/client/components/tables/cells/NodeStatus'

import { suToTiB } from '@/client/lib/utils'
import { Service as ServiceProps, Node as NodeProps } from '@/types'

import { ServiceStatus } from '@/client/components/tables/cells/ServiceStatus'

const ServiceRow = ({ service }: { service: ServiceProps }) => {
  return (
    <TableRow>
      <TableCell>{service.config.name}</TableCell>
      <TableCell>
        {service.node ? (
          <NodeStatus
            node={service.node as NodeProps}
            to={'/node/' + service.node?.config.id}
            showName
          />
        ) : (
          ''
        )}
      </TableCell>
      <TableCell>{service.config.host}</TableCell>
      <TableCell>:{service.config.port_operator}</TableCell>
      <TableCell>{service.config.su} SU</TableCell>
      <TableCell>{suToTiB(service.config.su)} TiB</TableCell>
      <TableCell>
        <ServiceStatus service={service} />
        {/* <ServiceStatus
          isProving={isProving}
          text={statusText}
          textClass={statusTextClass}
          icon={statusIcon}
          colour={statusColour}
          percent={percentRounded}
          nonces={Status?.Proving?.nonces}
        /> */}
      </TableCell>
    </TableRow>
  )
}

interface Props {
  services: ServiceProps[]
}
export default function ServicesTable({ services }: Props) {
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="flex items-center">
              <Icon i="name" className="mr-2" /> Name
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center">
              <Icon i="node" className="mr-2" /> Node
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center">
              <Icon i="host" className="mr-2" /> Host
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center">
              <Icon i="port" className="mr-2" /> Port
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center">
              <Icon i="service" className="mr-2" /> Size (SU)
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center">
              <Icon i="service" className="mr-2" /> Size (TiB)
            </div>
          </TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service: ServiceProps) => (
          <ServiceRow key={service.config.id} service={service} />
        ))}
      </TableBody>
    </Table>
  )
}
