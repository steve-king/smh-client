import { useStoreContext } from '@/client/lib/store'
import { Service as ServiceProps, Node as NodeProps } from '@/types'

import {
  getNodeByServiceName,
  nodePath,
  parseNode,
  suToBytes,
  suToTiB,
  cn,
} from '@/client/lib/utils'

import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/client/components/ui/table'
import { Progress as ProgressBar } from '@/client/components/ui/progress'

import { Link } from 'react-router-dom'
import { Page } from '@/client/app'
import Card from '../components/Card'
import Icon from '../components/Icon'

const NodeStatus = ({ data }: { data: NodeProps | undefined }) => {
  const node = data ? parseNode(data) : undefined

  let icon = 'disconnected'
  let text = 'Not found'
  let statusColour = 'text-red-700'
  let textColour = 'text-muted-foreground'

  if (node) {
    icon = 'connected'
    statusColour = node.statusColour
    text = node.name

    if (node.isOnline) {
      textColour = ''
    }
  }

  const RenderStatus = () => (
    <>
      <Icon i={icon} className={cn(statusColour, 'mr-2')} />
      <span className={textColour}>{text}</span>
    </>
  )

  if (node) {
    return (
      <Link to={nodePath(node.name)} className="flex items-center">
        <RenderStatus />
      </Link>
    )
  }

  return (
    <div className="flex items-center">
      <RenderStatus />
    </div>
  )
}

interface StatusProps {
  isProving: boolean
  text: string
  textClass: string
  icon: string
  colour: string
  percent: number
  nonces?: {
    start: number
    end: number
  }
}
const ServiceStatus = (props: StatusProps) => {
  let animateClass = ''
  if (props.isProving) {
    animateClass = 'animate-pulse'
  }
  return (
    <div className={cn('flex items-center', animateClass)}>
      <Icon i={props.icon} className={cn(props.colour, 'mr-2')} />
      <div className="grow">
        <p className="flex items-center justify-between">
          <span className={cn(props.textClass)}>{props.text}</span>
          {props.percent > 0 && (
            <span className="text-xs text-muted-foreground">
              {props.percent}%
            </span>
          )}
          {/* {props.isProving && props.percent === 0 && (
            <span className="text-xs text-muted-foreground">
              Nonces:{props.nonces?.end}
            </span>
          )} */}
        </p>
        {props.percent > 0 && (
          <ProgressBar value={props.percent} className="mt-1 h-[4px]" />
        )}
      </div>
    </div>
  )
}

interface RowProps extends ServiceProps {
  node: NodeProps | undefined
}

const Service = ({ name, host, port_operator, su, node, data }: RowProps) => {
  let isProving = false
  let statusText = ''
  let statusColour = ''
  let statusIcon = 'service'
  let percentRounded = 0
  let statusTextClass = ''

  if (data === 'Idle') {
    statusText = data
    statusTextClass = 'text-xs'
    if (node) {
      statusColour = 'text-green-700'
    } else {
      statusColour = 'text-red-700'
    }
  } else if (data.error) {
    statusText = 'Offline'
    statusTextClass = 'text-muted-foreground'
    statusColour = 'text-red-700'
  } else if (data.Proving) {
    isProving = true
    statusColour = 'text-yellow-600'
    statusTextClass = 'text-xs'

    const { nonces, position } = data.Proving

    if (position === 0) {
      statusIcon = 'cpu'
      statusText = 'K2PoW'
    } else {
      statusText = 'Reading PoST'
      const bytes = suToBytes(su)
      const percent = position / bytes
      percentRounded = Math.round(percent * 100)
    }
  }

  return (
    <TableRow>
      <TableCell>
        <NodeStatus data={node} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{host}</TableCell>
      <TableCell>:{port_operator}</TableCell>
      <TableCell>{su} SU</TableCell>
      <TableCell>{suToTiB(su)} TiB</TableCell>
      <TableCell>
        <ServiceStatus
          isProving={isProving}
          text={statusText}
          textClass={statusTextClass}
          icon={statusIcon}
          colour={statusColour}
          percent={percentRounded}
          nonces={data?.Proving?.nonces}
        />
      </TableCell>
    </TableRow>
  )
}

export default function Services() {
  const { state } = useStoreContext()

  return (
    <Page title="Services" icon="service">
      <Card>
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead>Node</TableHead>
              <TableHead>Service Name</TableHead>
              <TableHead className="max-w-[100px]">Host</TableHead>
              <TableHead>Port</TableHead>
              <TableHead>Size (SU)</TableHead>
              <TableHead>Size (TiB)</TableHead>
              <TableHead>Status</TableHead>
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
