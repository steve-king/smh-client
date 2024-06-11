import { useEffect, useState, createContext, useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import { produce } from 'immer'
import io from 'socket.io-client'

import { fetchFields, mergeField } from './smh-client'

interface State {
  node: any
  service: any
}

interface Action {
  type: string
  payload: any
}

const defaultState: State = {
  node: {},
  service: {},
}

type Reducer = (state: State, actions: Action[]) => State

const reducer: Reducer = (state: State, actions: Action[]): State => {
  console.debug('actions', actions)
  return produce(state, (draft) => {
    actions?.forEach((action: Action) => {
      mergeField(draft, {
        key: action.type,
        value: action.payload,
      })
    })
  })
}

const SmhContext = createContext(undefined as any)

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    fetchFields().then((actions: Action[]) => {
      dispatch(actions)
    })
  }, [])

  useEffect(() => {
    const socket = io()
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))
    socket.onAny((type, payload) => {
      dispatch([{ type, payload }])
    })

    return () => {
      socket.close()
    }
  }, [])

  // console.log('STATE:', state)

  return (
    <SmhContext.Provider value={{ state, isConnected }}>
      {/* <Outlet /> */}
      <p>{isConnected ? 'connected' : 'disconnected'}</p>
      <pre className="text-xs">{JSON.stringify(state, null, 2)}</pre>
    </SmhContext.Provider>
  )
}

export default App
