import Card from './Card'
import { cn } from '../lib/utils'
interface Peer {
  id: string
  ip4: string
  uptime: {
    nanos: string
    seconds: string
  }
  tags: string[]
  outbound: boolean
}

interface PeerProps {
  peer: Peer
  className?: string
}
const Peer = ({
  peer: { ip4, uptime, tags, outbound },
  className,
}: PeerProps) => {
  return (
    <>
      <hr className="my-1" />
      <p className="text-xs">IP: {ip4}</p>
    </>
  )
}

interface PeersProps {
  peers: Peer[]
}
export const PeersStream = ({ peers }: PeersProps) => {
  if (peers) {
    let thePeers = [...peers]
    return (
      <Card>
        <h2 className="mb-4 font-bold">Peers</h2>
        {thePeers.map((peer) => (
          <Peer key={peer.id} peer={peer} className="mb-4" />
        ))}
      </Card>
    )
  }
  return null
}
