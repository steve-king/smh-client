import {
  Service as ServiceProps,
  ProvingStatus,
  Node as NodeProps,
} from '@/types'
import { cn, suToBytes } from '@/client/lib/utils'

import { Progress as ProgressBar } from '@/client/components/ui/progress'
import Icon from '@/client/components/Icon'

/**
 * DEV
 */
const devStatus = {
  post: {
    Proving: {
      nonces: { start: 0, end: 128 },
      position: 317708042240,
    },
  },
  cpu: {
    Proving: {
      nonces: { start: 0, end: 128 },
      position: 0,
    },
  },
}

interface DisplayProps {
  isProving: boolean
  text: string
  textClass: string
  animation: string
  icon: string
  iconColour: string
  progress: number
}

const displayServiceStatus = (
  service: ServiceProps,
  node: NodeProps
): DisplayProps => {
  const { Status, isOnline, config } = service
  // let Status = devStatus.post

  const display: any = {
    animateClass: '',
    textClass: '',
    icon: 'service',
    progress: 0,
  }

  const colours = {
    success: 'text-green-700',
    error: 'text-red-600',
    warning: 'text-yellow-600',
  }

  if (!isOnline) {
    display.isProving = false
    display.text = 'Offline'
    display.iconColour = colours.error
  } else if (typeof Status === 'string') {
    display.isProving = false
    display.text = Status
    display.iconColour = isOnline && !!node ? colours.success : colours.error
  } else if (Status?.Proving !== undefined) {
    display.isProving = true
    display.animation = 'animate-pulse'
    display.textClass = 'text-xs'
    display.iconColour = colours.warning

    if (Status?.Proving.position === 0) {
      display.text = 'K2PoW'
      display.icon = 'cpu'
    } else {
      display.text = 'Reading PoST'
      const bytes = suToBytes(Number(config.su))
      const percent = Status?.Proving.position / bytes
      display.progress = Math.round(percent * 100)
    }
  }

  return display as DisplayProps
}

interface Props {
  service: ServiceProps
  node: NodeProps
}
export const ServiceStatus = ({ service, node }: Props) => {
  const display = displayServiceStatus(service, node)

  return (
    <div className={cn('flex items-center', display.animation)}>
      <Icon i={display.icon} className={cn(display.iconColour, 'mr-2')} />
      <div className="grow">
        <p className="flex items-center justify-between">
          <span className={cn(display.textClass)}>{display.text}</span>
          {display.progress > 0 && (
            <span className="text-xs text-muted-foreground">
              {display.progress}%
            </span>
          )}
          {/* {props.isProving && props.percent === 0 && (
            <span className="text-xs text-muted-foreground">
              Nonces:{props.nonces?.end}
            </span>
          )} */}
        </p>
        {display.progress > 0 && (
          <ProgressBar
            value={display.progress}
            className="mt-1 h-[4px]"
            indicatorColor="bg-yellow-600"
          />
        )}
      </div>
    </div>
  )
}
