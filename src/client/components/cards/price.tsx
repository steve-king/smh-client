import { useEffect, useState } from 'react'
import { cn } from '@/client/lib/utils'
import Card from '../Card'
import Icon from '@/client/components/Icon'
import Chart from '@/client/components/Chart'
import { format } from 'date-fns'

interface PriceDataProps {
  usd: number
  usd_market_cap: number
  usd_24h_vol: number
  usd_24h_change: number
  last_updated_at: number
}

const PriceData = (props: PriceDataProps) => {
  const { usd, usd_24h_vol, usd_24h_change, usd_market_cap } = props
  const changeColour = usd_24h_change > 0 ? 'text-green-600' : 'text-red-600'
  const changeIcon = usd_24h_change > 0 ? 'chevronUp' : 'chevronDown'
  const changePercent = ((usd - usd_24h_change - usd) / usd).toFixed(2)
  const million = 1000000
  const volumeM = (usd_24h_vol / million).toFixed(2)
  const mCapM = (usd_market_cap / million).toFixed(2)
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className=" py-3 flex items-center">
          <span className="text-3xl font-medium">${usd.toFixed(2)}</span>
          <span className={cn(changeColour, 'text-sm flex items-center')}>
            <Icon
              i={changeIcon}
              size={16}
              className={cn('ml-4 mr-1')}
              strokeWidth={3}
            />
            {changePercent}%
          </span>
        </p>
        <div className="text-sm">
          <p>24h vol: ${volumeM}m</p>
          <p>Market cap: ${mCapM}m</p>
        </div>
      </div>
    </div>
  )
}

interface ChartDataProps {
  prices: [number, number][]
}
const ChartData = (props: ChartDataProps) => {
  const prices = props.prices.map((item) => ({
    date: format(new Date(item[0]), 'yyyy-MM-dd'),
    value: item[1],
  }))

  console.log(prices)
  return <Chart data={prices} />
}

export const PriceCard = () => {
  const [priceData, setPriceData] = useState<PriceDataProps | null>(null)
  useEffect(() => {
    const url = '/api/coingecko/spacemesh/price'
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPriceData(data.spacemesh))
  }, [])

  const [chartData, setChartData] = useState<ChartDataProps | null>(null)
  useEffect(() => {
    const url = '/api/coingecko/spacemesh/chart'
    fetch(url)
      .then((res) => res.json())
      .then((data) => setChartData(data))
  }, [])

  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">SMH market data</h3>
      </div>
      <hr />
      {priceData && <PriceData {...priceData} />}
      <div style={{ height: '300px' }}>
        {chartData && <ChartData {...chartData} />}
      </div>
      {/* <hr /> */}
      <p className="mt-3 text-xs font-light  text-muted-foreground">
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
