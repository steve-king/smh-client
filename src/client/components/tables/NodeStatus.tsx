import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/client/lib/utils'
import Icon from '../Icon'
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
      <Icon i={display.icon} className={cn(display.iconColour, 'mr-2')} />
      <span className={display.textColour}>
        {showName ? node.config.name : display.text}
      </span>
    </ConditionalWrapper>
  )
}

export const displayNodeStatus = (
  isOnline: boolean | undefined,
  status: NodeStatusProps | undefined
) => {
  const colours = {
    success: 'text-green-700',
    error: 'text-red-600',
    warning: 'text-yellow-600',
  }

  return {
    icon: 'node',
    iconColour:
      isOnline && status?.is_synced
        ? colours.success
        : isOnline
        ? colours.warning
        : colours.error,
    text:
      isOnline && status?.is_synced
        ? 'Online'
        : isOnline
        ? 'Syncing'
        : 'Offline',
    textColour: '',
  }
}
