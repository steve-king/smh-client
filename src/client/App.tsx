import { useEffect, useState, useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import io from 'socket.io-client'

import {
  defaultState,
  Action,
  reducer,
  SpacemeshContext,
  fetchFields,
} from './context/spacemesh'

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

  console.log('STATE:', state)

  return (
    <SpacemeshContext.Provider value={{ state, isConnected }}>
      {/* <p>{isConnected ? 'connected' : 'disconnected'}</p>
      <pre className="text-xs">{JSON.stringify(state, null, 2)}</pre> */}
      <Outlet />
    </SpacemeshContext.Provider>
  )
}

export default App
