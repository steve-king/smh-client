import { Service as ServiceProps } from '@/types'
import { cn, suToBytes } from '@/client/lib/utils'

import { Progress as ProgressBar } from '@/client/components/ui/progress'
import Icon from '@/client/components/Icon'

interface Props {
  service: ServiceProps
}

export const ServiceStatus = ({ service }: Props) => {
  const { isOnline, config, node, Status } = service

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

  let animateClass = ''
  if (isProving) {
    animateClass = 'animate-pulse'
  }

  return (
    <div className={cn('flex items-center', animateClass)}>
      <Icon i={statusIcon} className={cn(statusColour, 'mr-2')} />
      <div className="grow">
        <p className="flex items-center justify-between">
          <span className={cn(statusTextClass)}>{statusText}</span>
          {percentRounded > 0 && (
            <span className="text-xs text-muted-foreground">
              {percentRounded}%
            </span>
          )}
          {/* {props.isProving && props.percent === 0 && (
            <span className="text-xs text-muted-foreground">
              Nonces:{props.nonces?.end}
            </span>
          )} */}
        </p>
        {percentRounded > 0 && (
          <ProgressBar value={percentRounded} className="mt-1 h-[4px]" />
        )}
      </div>
    </div>
  )
}
