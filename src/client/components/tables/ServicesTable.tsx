import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/client/components/ui/table'
import Icon from '@/client/components/Icon'
import { suToTiB } from '@/client/lib/utils'
import { NodeStatus } from '@/client/components/tables/cells/NodeStatus'
import { ServiceStatus } from '@/client/components/tables/cells/ServiceStatus'
import { Actions } from '@/client/components/tables/cells'
import { Service as ServiceProps, Node as NodeProps } from '@/types'
import { ServiceForm } from '../forms'
import {
  findNodeBelongsToService,
  useSpacemesh,
} from '@/client/context/spacemesh'

const ServiceRow = ({ service }: { service: ServiceProps }) => {
  const { getNodes } = useSpacemesh()
  const node = findNodeBelongsToService(getNodes(), service)
  return (
    <TableRow>
      <TableCell>{service.config.name}</TableCell>
      <TableCell>
        {node ? (
          <NodeStatus node={node} to={'/node/' + node?.config.id} showName />
        ) : (
          ''
        )}
      </TableCell>
      <TableCell>{service.config.host}</TableCell>
      <TableCell>:{service.config.port_operator}</TableCell>
      <TableCell>{service.config.su} SU</TableCell>
      <TableCell>{suToTiB(Number(service.config.su))} TiB</TableCell>
      <TableCell>
        <ServiceStatus service={service} node={node as NodeProps} />
      </TableCell>
      <TableCell>
        <Actions
          namespace="service"
          config={service.config}
          Form={ServiceForm}
        />
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
          <TableHead>&nbsp;</TableHead>
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
