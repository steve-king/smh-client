import { useEffect, useState, useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import io from 'socket.io-client'

import {
  defaultState,
  reducer,
  SpacemeshContext,
  fetchData,
  Payload,
  Action,
} from './context/spacemesh'

function App() {
  const api = '/api/state'
  const [isConnected, setIsConnected] = useState(false)
  const [state, dispatch] = useReducer(reducer, { ...defaultState })

  useEffect(() => {
    fetchState()
  }, [api])

  const fetchState = () => {
    dispatch({ type: 'reset' })
    fetchData(api).then((payload: Payload[]) => {
      dispatch({ type: 'updates', payload })
    })
  }

  useEffect(() => {
    const socket = io()
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))
    socket.onAny((event, data) => {
      const action = {
        type: 'update',
        payload: data,
      }
      dispatch(action as Action)
    })

    return () => {
      socket.close()
    }
  }, [])

  // console.debug('STATE', state)

  return (
    <SpacemeshContext.Provider
      value={{
        isConnected,
        nodes: Object.entries(state.node).map((entry) => entry[1]),
        services: Object.entries(state.service).map((entry) => entry[1]),
        fetchState,
      }}
    >
      <Outlet />
    </SpacemeshContext.Provider>
  )
}

export default App
