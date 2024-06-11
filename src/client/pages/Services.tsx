import { useContext } from 'react'

import { Service, Node } from '@/types'

import {
  nodePath,
  parseNodeStatus,
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
import Page from '@/client/components/Page'
import Card from '../components/Card'
import Icon from '../components/Icon'

import { buttonVariants } from '../components/ui/button'
import {
  SpacemeshContext,
  findNodeBelongsToService,
} from '../context/spacemesh'

import { NodeStatus } from '@/client/components/tables/NodeStatus'

// const NodeStatus = (props: Node | undefined) => {
//   const node = props ? parseNodeStatus(props) : undefined

//   let icon = 'disconnected'
//   let text = 'Not found'
//   let statusColour = 'text-red-600'
//   let textColour = 'text-muted-foreground'

//   if (node && node.isOnline) {
//     textColour = ''
//     icon = node.statusIcon
//     statusColour = node.statusColour
//     text = node.config.name
//   }

//   const RenderStatus = () => (
//     <>
//       <Icon i={icon} className={cn(statusColour, 'mr-2')} />
//       <span className={textColour}>{text}</span>
//     </>
//   )

//   if (node) {
//     return (
//       <Link to={nodePath(node.config.name)} className="flex items-center">
//         <RenderStatus />
//       </Link>
//     )
//   }

//   return (
//     <div className="flex items-center">
//       <RenderStatus />
//     </div>
//   )
// }

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

const ServiceRow = ({ isOnline, config, node, Status }: Service) => {
  let isProving = false
  let statusText = ''
  let statusColour = ''
  let statusIcon = 'service'
  let percentRounded = 0
  let statusTextClass = ''

  if (typeof Status === 'string') {
    statusText = Status
    if (node) {
      statusColour = 'text-green-700'
    } else {
      statusColour = 'text-red-600'
    }
  } else if (!isOnline) {
    statusText = 'Offline'
    statusTextClass = 'text-muted-foreground'
    statusColour = 'text-red-600'
  } else if (Status?.Proving) {
    isProving = true
    statusColour = 'text-yellow-600'
    statusTextClass = 'text-xs'

    const { nonces, position } = Status.Proving

    if (position === 0) {
      statusIcon = 'cpu'
      statusText = 'K2PoW'
    } else {
      statusText = 'Reading PoST'
      const bytes = suToBytes(config.su)
      const percent = position / bytes
      percentRounded = Math.round(percent * 100)
    }
  }

  return (
    <TableRow>
      <TableCell>{config.name}</TableCell>
      <TableCell>
        <NodeStatus {...(node as Node)} />
      </TableCell>
      <TableCell>{config.host}</TableCell>
      <TableCell>:{config.port_operator}</TableCell>
      <TableCell>{config.su} SU</TableCell>
      <TableCell>{suToTiB(config.su)} TiB</TableCell>
      <TableCell>
        <ServiceStatus
          isProving={isProving}
          text={statusText}
          textClass={statusTextClass}
          icon={statusIcon}
          colour={statusColour}
          percent={percentRounded}
          nonces={Status?.Proving?.nonces}
        />
      </TableCell>
    </TableRow>
  )
}

export default function Services() {
  const { getServices, getNodes } = useContext(SpacemeshContext)
  const nodes = getNodes()
  const services = getServices().map((service: Service) => ({
    ...service,
    node: findNodeBelongsToService(nodes, service),
  }))

  console.log('SERVICES', services)

  return (
    <Page
      title="Services"
      icon="services"
      // Actions={() => (
      //   <>
      //     <Link
      //       to="/services/create"
      //       className={buttonVariants({ variant: 'ghost' })}
      //     >
      //       <span className="mr-2">Add service</span>
      //       <Icon i="add" />
      //     </Link>
      //   </>
      // )}
    >
      <Card>
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
            {services.map((service: Service) => (
              <ServiceRow key={service.config.id} {...service} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </Page>
  )
}
