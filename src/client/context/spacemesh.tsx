import { createContext } from 'react'
import { produce } from 'immer'

import { Node, Service } from '@/types'

export const defaultState: State = {
  node: {},
  service: {},
}

export interface State {
  node: any
  service: any
}

export interface Action {
  type: string
  payload: any
}

export const SpacemeshContext = createContext(undefined as any)

export const reducer = (state: State, actions: Action[]): State => {
  return produce(state, (draft: any): void => {
    actions?.forEach((action: Action) => {
      const keys = action.type.split(':')
      const namespace = keys[0]
      const id = keys[1]
      const fieldName = keys[2]

      if (draft[namespace][id] === undefined) {
        draft[namespace][id] = {}
      }

      draft[namespace][id][fieldName] = action.payload
    })
  })
}

/**
 *
 * @returns
 */
export const fetchFields = () => {
  return fetch('/api/state')
    .then((res) => res.json())
    .then((json) => json)
    .catch((e) => console.log('Error fetching state: ', e))
}

/**
 *
 * @param nodes
 * @param service
 * @returns Node
 */
export const findNodeBelongsToService = (
  nodes: Node[],
  service: Service
): Node | undefined => {
  const filename = service.config.name + '.key'
  const node = nodes.find((item) => {
    return (
      item.PostStates &&
      item.PostStates.find((service) => service.name === filename)
    )
  })

  return node
}
