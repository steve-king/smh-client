import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import {
  Node,
  Node as NodeProps,
  Service,
  Service as ServiceProps,
} from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slug(input: string) {
  return input.split(' ').join('-').toLowerCase()
}

export function nodePath(name: string) {
  return '/node/' + slug(name)
}

export function findItemBy(
  propKey: string | undefined,
  propVal: string | undefined,
  collection: any[] | undefined
) {
  if (propKey && propVal) {
    const item = collection?.find(
      (item) => slug(item[propKey]) === slug(propVal)
    )
    return item
  }
  return undefined
}

// export function parseNodeStatus(node: NodeProps) {
//   // const config = {
//   //   name: node.name,
//   //   host: node.host,
//   //   port_public: node.port_public,
//   //   port_private: node.port_private,
//   //   port_post: node.port_post,
//   // }

//   if (node) {
//     const { config, isOnline, status } = node

//     console.log(config.name)

//     // const config = node.config

//     // const statusError = node.data.status?.error
//     // const isOnline = !statusError
//     const statusIcon = isOnline ? 'connected' : 'disconnected'
//     const statusText = !isOnline
//       ? 'Offline'
//       : status?.is_synced
//       ? 'Online'
//       : 'Syncing'
//     const statusColour = isOnline
//       ? 'text-green-700'
//       : statusText === 'Syncing'
//       ? 'text-yellow-600'
//       : 'text-red-600'

//     return {
//       path: nodePath(config.name),
//       // ...config,
//       ...node,
//       isOnline,
//       statusText,
//       statusIcon,
//       statusColour,
//       // statusError,
//       // status: !statusError && { ...node.data.status },
//       // version: !statusError ? node.data.version : '',
//     }
//   }
//   return undefined
// }

export const suToTiB = (su: number): number => su / 16

export const suToBytes = (su: number): number => {
  const TiB = suToTiB(su)
  const bytesPerTiB = 1024 * 1024 * 1024 * 1024
  const bytes = TiB * bytesPerTiB
  return bytes
}
