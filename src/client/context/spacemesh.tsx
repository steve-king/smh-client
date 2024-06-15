import { createContext, useContext } from 'react'
import { produce } from 'immer'

import { Node, Service } from '@/types'

export interface State {
  node: any
  service: any
}

export interface Action {
  type: 'reset' | 'update' | 'updates'
  payload?: any
}

export interface Payload {
  key: string
  value: any
}

export const defaultState: State = {
  node: {},
  service: {},
}

export const SpacemeshContext = createContext(undefined as any)
export const useSpacemesh = () => useContext(SpacemeshContext)

export const reducer = (state: State, action: Action): State => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'reset':
        draft = { ...defaultState }
        break

      case 'update':
        updateField(draft, action.payload)
        break

      case 'updates':
        action.payload.forEach((item: Payload) => updateField(draft, item))
        // console.log(state)
        break
    }

    return draft
  })
}

const updateField = (state: any, item: Payload) => {
  const keys = item.key.split(':')
  const namespace = keys[0]
  const id = keys[1]
  const fieldName = keys[2]

  if (state[namespace][id] === undefined) {
    state[namespace][id] = {}
  }

  state[namespace][id][fieldName] = item.value
}

/**
 *
 * @returns
 */
export const fetchData = (url: string) => {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => json)
    .catch((e) => console.log('Error fetching data: ', e))
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
