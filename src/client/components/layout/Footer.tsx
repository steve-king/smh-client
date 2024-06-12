import { useContext } from 'react'
import Icon from '@/client/components/Icon'
import { cn } from '@/client/lib/utils'

import { useSpacemesh } from '@/client/context/spacemesh'

const ConnectionStatus = () => {
  const { isConnected } = useSpacemesh()
  const statusString = isConnected ? 'Connected' : 'Disconnected'
  const statusColour = isConnected ? 'text-green-500' : 'text-red-700'
  return (
    <p className="text-xs p-1 text-muted-foreground relative flex items-center">
      <Icon i="dot" strokeWidth={2} className={statusColour} />
      {statusString}
    </p>
  )
}

export default function Footer() {
  return (
    <footer className="app-footer bg-card border-t">
      <ConnectionStatus />
    </footer>
  )
}
