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
import Icon from '../components/Icon'

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
  // let textClass = 'text-muted-foreground'
  let animateClass = ''
  if (props.isProving) {
    animateClass = 'animate-pulse'
    // textClass = ''
  }
  return (
    <div className={cn('flex items-center', animateClass)}>
      <Icon
        i={props.icon}
        className={cn(props.colour, 'mr-2')}
        strokeWidth={1.5}
        // size={32}
      />
      <div className="grow">
        <p className="flex items-end justify-between">
          <span className={cn(props.textClass)}>{props.text}</span>
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
  let statusTextClass = ''

  if (data === 'Idle') {
    statusText = data
    statusColour = 'text-green-700'
    statusTextClass = ''
  } else if (data.error) {
    statusText = 'Offline'
    statusTextClass = 'text-muted-foreground'
    statusColour = 'text-red-700'
  } else if (data.Proving) {
    isProving = true
    statusColour = 'text-yellow-600'
    statusTextClass = 'text-xs'

    const {
      nonces,
      // position
    } = data.Proving

    // dev
    let position = 0
    // position = 635416084480

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
