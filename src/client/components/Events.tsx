import { cn } from '../lib/utils'
import Card from './Card'
import { sortArrayByKey } from '@/utils'
import { format } from 'date-fns'
import { Separator } from '@radix-ui/react-separator'

interface Event {
  details: string
  help: string
  timestamp: string
  failure: boolean
  data: any
}

interface EventProps {
  event: Event
  className?: string
}
const Event = ({
  event: { details, help, timestamp, failure, data },
  className,
}: EventProps) => {
  return (
    <Card className={cn(className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{details}</h3>
        <p className="text-xs">{format(timestamp, 'MMMM dd yyy HH:MM')}</p>
      </div>
      <hr className="my-2" />
      {/* <p className="text-xs">Success: {failure ? 'false' : 'true'}</p>

      <p className="text-xs">Help:</p> */}
      <p className="text-xs">{help}</p>
      {data && (
        <>
          <hr className="my-2" />
          <p className="text-xs font-medium mb-1">Data:</p>
          <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </Card>
  )
}

interface EventsProps {
  events: Event[]
}
export const EventsStream = ({ events }: EventsProps) => {
  let theEvents = [...events]
  return (
    <Card>
      <h2 className="mb-4 font-bold">Events</h2>
      {theEvents
        .sort(sortArrayByKey('timestamp'))
        .reverse()
        .map((event, i) => (
          <Event key={event.timestamp + i} event={event} className="mb-4" />
        ))}
    </Card>
  )
}
