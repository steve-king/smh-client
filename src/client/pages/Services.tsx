import { Link } from 'react-router-dom'
import { Page } from '@/client/app'
import * as Icon from '@/client/components/Icon'
import Card from '../components/Stat'

import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/client/components/ui/table'
import { Progress } from '@/client/components/ui/progress'

import { useStoreContext } from '@/client/lib/store'
import { getNodeByServiceName, nodePath, suToBytes } from '@/client/lib/utils'
import { Service as ServiceProps, Node as NodeProps } from '@/types'

interface ProvingProps {
  Proving: {
    nonces: {
      start: number
      end: number
    }
    position: number
  }
  su: number
}

const ProvingStatus = (props: ProvingProps) => {
  if (props.Proving) {
    const { nonces } = props.Proving
    const position = 635416084480
    // const position = 0
    const bytes = suToBytes(props.su)
    const percent = position / bytes
    const percentRounded = Math.round(percent * 100)

    let PostIcon = Icon.Cpu
    let postText = 'K2PoW'
    let showNonces = true
    let showProgress = false
    let showPercentage = false

    if (position > 0) {
      PostIcon = Icon.Service
      postText = `Reading PoST`
      showNonces = false
      showProgress = true
      showPercentage = true
    }

    return (
      <>
        <TableCell>
          <div className="flex items-center animate-pulse">
            <div className="text-yellow-500">
              <PostIcon
                size={24}
                strokeWidth={1}
                absoluteStrokeWidth
                className="mr-2"
              />
            </div>
            <div className="grow text-left">
              <p className="text-xs flex items-center justify-between">
                {postText}
                {showPercentage && (
                  <span className="text-muted-foreground">
                    {percentRounded}%
                  </span>
                )}
              </p>
              {showProgress && (
                <Progress
                  value={percentRounded}
                  className="mt-1 h-[4px] mb-[8px]"
                />
              )}
              {showNonces && (
                <p className="text-xs text-muted-foreground">
                  Nonces: {nonces.start}-{nonces.end}
                </p>
              )}
            </div>
          </div>
        </TableCell>
      </>
    )
  }
  return null
}

interface RowProps extends ServiceProps {
  node: NodeProps | undefined
}

const Service = ({ name, host, port_operator, su, node, data }: RowProps) => {
  let status
  if (typeof data === 'string') {
    status = data
  } else if (typeof data === 'object') {
    status = <ProvingStatus {...data} su={su} />
  }

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{host}</TableCell>
      <TableCell>:{port_operator}</TableCell>
      <TableCell>
        {node && <Link to={nodePath(node.name)}>{node.name}</Link>}
      </TableCell>
      {status}
    </TableRow>
  )
}

export default function Services() {
  const { state } = useStoreContext()

  return (
    <Page title="Services" Icon={Icon.Service}>
      <Card>
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="max-w-[100px]">Host</TableHead>
              <TableHead>Port</TableHead>
              <TableHead>Node</TableHead>
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
