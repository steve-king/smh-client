import Icon from '@/client/components/Icon'
import { cn } from '@/client/lib/utils'

const ConnectionStatus = () => {
  // const { isConnected } = useSocketContext()
  const isConnected = false
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
