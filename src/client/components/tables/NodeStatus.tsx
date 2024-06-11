import { Link } from 'react-router-dom'
import Icon from '../Icon'
import { cn, nodePath } from '@/client/lib/utils'
import { Node } from '@/types'

export const parseNodeStatus = (node: Node) => {
  // const config = {
  //   name: node.name,
  //   host: node.host,
  //   port_public: node.port_public,
  //   port_private: node.port_private,
  //   port_post: node.port_post,
  // }

  // if (node) {
  const { config, isOnline, Status } = node

  // console.log(config.name)

  // const config = node.config

  // const statusError = node.data.status?.error
  // const isOnline = !statusError
  const statusIcon = isOnline ? 'connected' : 'disconnected'
  const statusText = !isOnline
    ? 'Offline'
    : Status?.is_synced
    ? 'Online'
    : 'Syncing'
  const statusColour = isOnline
    ? 'text-green-700'
    : statusText === 'Syncing'
    ? 'text-yellow-600'
    : 'text-red-600'

  return {
    // path: nodePath(config.name),
    // ...config,
    // ...node,
    isOnline,
    statusText,
    statusIcon,
    statusColour,
    // statusError,
    // status: !statusError && { ...node.data.status },
    // version: !statusError ? node.data.version : '',
  }
  // }
  // return undefined
}

export const NodeStatus = (node: Node | undefined) => {
  const status = node ? parseNodeStatus(node) : undefined

  let icon = 'disconnected'
  let text = 'Not found'
  let statusColour = 'text-red-600'
  let textColour = 'text-muted-foreground'

  if (node && node.isOnline) {
    textColour = ''
    icon = status.statusIcon
    statusColour = status.statusColour
    text = node.config.name
  }

  const RenderStatus = () => (
    <>
      <Icon i={icon} className={cn(statusColour, 'mr-2')} />
      <span className={textColour}>{text}</span>
    </>
  )

  if (node) {
    return (
      <Link to={'/node/' + node.id} className="flex items-center">
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
