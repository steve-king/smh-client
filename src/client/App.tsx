import { useEffect, useState, useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import io from 'socket.io-client'

import {
  defaultState,
  Action,
  reducer,
  SpacemeshContext,
  fetchAll,
  Update,
} from './context/spacemesh'

function App({ api }: { api: string }) {
  const [isConnected, setIsConnected] = useState(false)
  const [state, dispatch] = useReducer(reducer, { ...defaultState })

  const fetchState = () => {
    dispatch({ type: 'reset' })
    fetchAll(api).then((payload: Update[]) => {
      dispatch({ type: 'updates', payload })
    })
  }

  const getNodes = () => {
    return Object.entries(state.node).map((entry) => entry[1])
  }
  const getServices = () => {
    return Object.entries(state.service).map((entry) => entry[1])
  }

  useEffect(() => {
    fetchState()
  }, [api])

  useEffect(() => {
    const socket = io()
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))
    socket.onAny((event, payload) => {
      const action = {
        type: event,
        payload,
      }
      dispatch(action)
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
        state,
        dispatch,
        fetchState: () => {
          fetchState()
        },
        getNodes,
        getServices,
      }}
    >
      <Outlet />
    </SpacemeshContext.Provider>
  )
}

export default App
