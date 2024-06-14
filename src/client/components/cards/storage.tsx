import { useSpacemesh } from '@/client/context/spacemesh'
import Card from '../Card'
import { Service } from '@/types'
import { suToTiB } from '@/client/lib/utils'

export const StorageCard = () => {
  const { services } = useSpacemesh()

  const totalSu = services.reduce((total: number, service: Service) => {
    total += Number(service.config.su)
    return total
  }, 0)

  const totalTiB = suToTiB(totalSu)

  return (
    <Card icon="service">
      <p>Storage</p>
      <p>
        {totalSu} SUs / {totalTiB} TiB
      </p>
      <p className="text-xs font-light  text-muted-foreground">
        Services: {services.length}
      </p>
    </Card>
  )
}
