import { useEffect, useState } from 'react'
import './App.css'

import io from 'socket.io-client'

import { Layout } from '@/client/app/Layout'

const fetchStore = (setState: Function, setUpdatedOn: Function) => {
  fetch('/api/state')
    .then((res) => res.json())
    .then((json) => {
      // setState(json)
      const updatedOn = new Date()
      // setUpdatedOn(updatedOn)
      console.log(updatedOn.toISOString(), json)
    })
    .catch((e) => console.log('Error fetching state: ', e))
}

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('/api')
      .then((res) => res.text())
      .then((text) => console.log(text))
  })

  useEffect(() => {
    const socket = io('')
    socket.on('connect', () => console.log('Socket connected'))
    socket.on('disconnect', () => console.log('Socket disconnected'))
    socket.on('update', fetchStore)
    return () => {
      socket.close()
    }
  })

  return <Layout />
}

export default App
