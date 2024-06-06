import { Outlet } from 'react-router-dom'
import { useStore } from '@/client/lib/store'

function App() {
  useStore()

  return <Outlet />
}

export default App
