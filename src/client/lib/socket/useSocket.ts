import { useEffect } from 'react'
import io from 'socket.io-client'
import { useSocketContext } from '@/client/lib/socket'
import { useStoreContext, mergeField } from '../store'

const useSocket = (url: string = '') => {
  const { setSocket, setIsConnected } = useSocketContext()
  const { state, setState } = useStoreContext()

  useEffect(() => {
    const socket = io(url)

    socket.on('connect', () => {
      console.log('Socket connected')
      setIsConnected(true)
    })

    socket.on('connect_error', (err: any) => {
      console.log('Socket error')
      console.log(err.message) // the reason of the error, for example "xhr poll error"
      console.log(err.description) // some additional description, for example the status code of the initial HTTP response
      console.log(err.context) // some additional context, for example the XMLHttpRequest object
      console.log('END Socket error')
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
      setIsConnected(false)
    })

    socket.onAny((key: string, value: any) => {
      const updatedState = mergeField(state, key, value)
      setState(updatedState as any)
      console.log('NEW STATE: ', updatedState)
    })

    setSocket(socket)

    return () => {
      socket.close()
    }
  }, [url, setIsConnected, setSocket])
}

export default useSocket
