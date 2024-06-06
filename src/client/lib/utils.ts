import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Node as NodeProps } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slug(input: string) {
  return input.split(' ').join('-').toLowerCase()
}

export function nodePath(name: string) {
  return '/nodes/' + slug(name)
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

import colors from 'tailwindcss/colors'
const green = colors.green[500]
const yellow = colors.yellow[500]
const red = colors.red[500]

export function parseNode(node: NodeProps) {
  const config = {
    name: node.name,
    host: node.host,
    port_public: node.port_public,
    port_private: node.port_private,
    port_post: node.port_post,
  }

  const statusError = node.data.status?.error
  const isOnline = !statusError
  const statusText = node.data.status?.error
    ? 'Offline'
    : node.data.status?.is_synced
    ? 'Online'
    : 'Syncing'
  const statusColour =
    statusText === 'Online' ? green : statusText === 'Syncing' ? yellow : red

  return {
    path: nodePath(node.name),
    ...config,
    isOnline,
    statusText,
    statusColour,
    statusError,
    status: !statusError && { ...node.data.status },
    version: !statusError ? node.data.version : '',
  }
}

export function getNodeByServiceName(
  name: string,
  nodes: NodeProps[]
): NodeProps | undefined {
  const keyFilename = name + '.key'
  const node = nodes.find((item) => {
    const postInfo: {
      error?: boolean
      states: { name: string }[]
    } = item.data.postInfo

    if (!postInfo?.error) {
      return postInfo?.states.find((service) => service.name === keyFilename)
    }
    return false
  })

  return node
}
