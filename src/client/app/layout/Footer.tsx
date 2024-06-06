import { useSocketContext } from '@/client/lib/socket'
// import { cn } from '@/client/lib/utils'
// import { useEffect, useState } from 'react'
// import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns'
// import { useStoreContext } from '@/client/lib/store'
// import Loader from '@/client/components/TextLoader'

// const seconds = 1 // update the UI every n seconds

// const UpdatedOn = () => {
//   const { isConnected } = useSocketContext()
//   const { updatedOn } = useStoreContext()
//   const [message, setMessage] = useState('')

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const when = formatDistanceToNowStrict(updatedOn, {
//         addSuffix: true,
//         unit: 'minute',
//         // includeSeconds: true,
//       })
//       setMessage(when), seconds * 1000
//     })
//     return () => clearInterval(interval)
//   }, [updatedOn, isConnected])

//   if (!updatedOn) {
//     return null
//   }

//   return (
//     <div className="mt-4 text-xs text-muted-foreground">
//       {isConnected ? (
//         <>
//           <Loader watch={updatedOn} />
//           <p>Server is connected</p>
//         </>
//       ) : (
//         <p>Disconnected from server.</p>
//       )}
//       <br />
//       Updated {message}
//     </div>
//   )
// }

// import * as Icon from '@/client/components/Icon'
import Icon from '@/client/components/Icon'
import { cn } from '@/client/lib/utils'

const ConnectionStatus = () => {
  const { isConnected } = useSocketContext()
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
