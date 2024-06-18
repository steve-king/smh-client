import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import Card from '@/client/components/Card'
import Icon from '@/client/components/Icon'

import { PriceData } from './PriceData'
import { ChartData } from './ChartData'

export const MarketData = () => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">SMH market data</h3>
      </div>
      <hr />
      <PriceData />
      <AspectRatio ratio={16 / 9}>
        <ChartData />
      </AspectRatio>
      {/* <hr /> */}
      <p className="mt-3 text-xs text-right font-light text-muted-foreground">
        Source:{' '}
        <a
          href="https://www.coingecko.com/en/coins/spacemesh"
          target="_blank"
          className="inline-flex items-center text-foreground hover:underline"
        >
          <span>Coingecko</span>
          <Icon i="externalLink" size={12} className="ml-1" />
        </a>
      </p>
    </Card>
  )
}
