import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import io from 'socket.io-client'

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

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Express + socket.io + HMR</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App