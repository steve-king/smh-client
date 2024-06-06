import { useStoreContext } from '@/client/lib/store'
import { Service as ServiceProps } from '@/types'

import {
  getNodeByServiceName,
  nodePath,
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
import Card from '../components/Stat'
import Icon from '../components/RenderIcon'

interface StatusProps {
  isProving: boolean
  text: string
  icon: string
  colour: string
  percent: number
  nonces?: {
    start: number
    end: number
  }
}

const ServiceStatus = (props: StatusProps) => {
  let textClass = 'text-muted-foreground'
  let animateClass = ''
  if (props.isProving) {
    animateClass = 'animate-pulse'
    textClass = ''
  }
  return (
    <div className={cn('flex items-center', animateClass)}>
      <Icon i={props.icon} className={cn('text-' + props.colour, 'mr-2')} />
      <div className="grow">
        <p className="flex items-end justify-between">
          <span className={cn(textClass)}>{props.text}</span>
          {props.isProving && props.percent > 0 && (
            <span className="text-xs text-muted-foreground">
              {props.percent}%
            </span>
          )}
        </p>
        {props.isProving && (
          <>
            {props.percent === 0 ? (
              <p className="text-xs text-muted-foreground">
                Nonces:{props.nonces?.end}
              </p>
            ) : (
              <ProgressBar
                value={props.percent}
                className="mt-1 h-[4px] mb-[8px]"
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

interface RowProps extends ServiceProps {
  node: any
}

const Service = ({ name, host, port_operator, su, node, data }: RowProps) => {
  let isProving = false
  let statusText = ''
  let statusColour = ''
  let statusIcon = 'service'
  let percentRounded = 0

  if (data === 'IDLE') {
    statusText = 'Idle'
    statusColour = 'green-500'
  } else if (data.error) {
    statusText = 'Offline'
    statusColour = 'red-500'
  } else if (data.Proving) {
    isProving = true
    statusColour = 'yellow-500'
    const {
      nonces,
      // position
    } = data.Proving

    // dev
    let position = 0
    position = 635416084480

    const bytes = suToBytes(su)
    const percent = position / bytes
    percentRounded = Math.round(percent * 100)
    statusText = 'Reading PoST'

    if (position === 0) {
      statusIcon = 'cpu'
      statusText = 'K2PoW'
    }
  }

  return (
    <TableRow>
      <TableCell>
        {node && <Link to={nodePath(node.name)}>{node.name}</Link>}
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
