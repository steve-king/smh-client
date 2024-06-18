import { useEffect, useState } from 'react'
import Icon from '@/client/components/Icon'
import { cn } from '@/client/lib/utils'

interface CoinGeckoPriceData {
  usd: number
  usd_market_cap: number
  usd_24h_vol: number
  usd_24h_change: number
  last_updated_at: number
}

export const PriceData = () => {
  const [priceData, setPriceData] = useState<CoinGeckoPriceData | null>(null)
  useEffect(() => {
    const url = '/api/coingecko/spacemesh/price'
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPriceData(data.spacemesh))
  }, [])

  if (priceData) {
    const { usd, usd_24h_vol, usd_24h_change, usd_market_cap } = priceData
    const changeColour = usd_24h_change > 0 ? 'text-green-600' : 'text-red-600'
    const changeIcon = usd_24h_change > 0 ? 'chevronUp' : 'chevronDown'
    const changePercent = ((usd - usd_24h_change - usd) / usd).toFixed(2)
    const million = 1000000
    const volumeM = (usd_24h_vol / million).toFixed(2)
    const mCapM = (usd_market_cap / million).toFixed(2)
    return (
      <div>
        <div className="flex items-center justify-between">
          <p className=" py-3 flex items-center mr-4">
            <span className="text-4xl font-medium">${usd.toFixed(2)}</span>
            <span className={cn(changeColour, ' flex items-center')}>
              <Icon
                i={changeIcon}
                size={20}
                className={cn('ml-4 mr-1')}
                strokeWidth={3}
              />
              {changePercent}%
            </span>
          </p>
          <div className="text-xs">
            <p>24h vol: ${volumeM}m</p>
            <p>Market cap: ${mCapM}m</p>
          </div>
        </div>
      </div>
    )
  }
}
