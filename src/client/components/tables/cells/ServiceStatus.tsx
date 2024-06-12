import { Service as ServiceProps, ProvingStatus } from '@/types'
import { cn, suToBytes } from '@/client/lib/utils'

import { Progress as ProgressBar } from '@/client/components/ui/progress'
import Icon from '@/client/components/Icon'

interface Props {
  service: ServiceProps
}

/**
 * DEV
 */

const devStatus = {
  post: {
    Proving: {
      nonces: { start: 0, end: 128 },
      position: 317708042240,
      // position: 0,
    },
  },
  cpu: {
    Proving: {
      nonces: { start: 0, end: 128 },
      // position: 317708042240,
      position: 0,
    },
  },
}

/**
 * END DEV
 */

interface DisplayProps {
  isProving: boolean
  text: string
  textClass: string
  animation: string
  icon: string
  iconColour: string
  progress: number
}

const displayServiceStatus = ({
  isOnline,
  config,
  Status,
  node,
}: ServiceProps): DisplayProps => {
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
      const bytes = suToBytes(config.su)
      const percent = Status?.Proving.position / bytes
      display.progress = Math.round(percent * 100)
    }
  }

  return display as DisplayProps
}

export const ServiceStatus = ({ service }: Props) => {
  // service.Status = devStatus.cpu
  const display = displayServiceStatus(service)

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
          <ProgressBar value={display.progress} className="mt-1 h-[4px]" />
        )}
      </div>
    </div>
  )
}
