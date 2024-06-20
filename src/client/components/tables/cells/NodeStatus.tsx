import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/client/lib/utils'
import Icon from '../../Icon'
import { Node as NodeProps, NodeStatus as NodeStatusProps } from '@/types'

interface Props {
  node: NodeProps
  showName?: boolean
  to?: string
}

interface ConditionalWrapperProps {
  condition: boolean
  children: ReactNode
  ifTrue: (children: ReactNode) => ReactNode
  ifFalse: (children: ReactNode) => ReactNode
}

const ConditionalWrapper = ({
  condition,
  ifTrue,
  ifFalse,
  children,
}: ConditionalWrapperProps) => {
  return condition ? ifTrue(children) : ifFalse(children)
}

export const NodeStatus = ({ node, showName = false, to }: Props) => {
  const display = displayNodeStatus(node?.isOnline, node?.Status)

  return (
    <ConditionalWrapper
      condition={node && to !== undefined}
      ifTrue={(children) => (
        <Link to={to as string} className="flex items-center">
          {children}
        </Link>
      )}
      ifFalse={(children) => (
        <div className="flex items-center">{children}</div>
      )}
    >
      <Icon i={display.icon} className={cn(display.textColour, 'mr-2')} />
      <span>{showName ? node.config.name : display.text}</span>
    </ConditionalWrapper>
  )
}

export const displayNodeStatus = (
  isOnline: boolean | undefined,
  status: NodeStatusProps | undefined
) => {
  const colours = {
    text: {
      success: 'text-green-700',
      error: 'text-red-600',
      warning: 'text-yellow-600',
    },
    bg: {
      success: 'bg-green-700',
      error: 'bg-red-600',
      warning: 'bg-yellow-600',
    },
  }

  return {
    icon: 'node',
    text:
      isOnline && status?.is_synced
        ? 'Online'
        : isOnline
        ? 'Syncing'
        : 'Offline',
    textColour:
      isOnline && status?.is_synced
        ? colours.text.success
        : isOnline
        ? colours.text.warning
        : colours.text.error,
    bgColour:
      isOnline && status?.is_synced
        ? colours.bg.success
        : isOnline
        ? colours.bg.warning
        : colours.bg.error,
    syncProgress: status
      ? (1 - (status?.top_layer - status?.synced_layer) / 16) * 100
      : 0,
  }
}
