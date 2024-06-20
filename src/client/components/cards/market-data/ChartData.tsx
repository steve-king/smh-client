import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'

import useTailwind from '@/client/context/tailwind'

interface CoingeckoChartData {
  prices: [number, number][]
  total_volumes: [number, number][]
}

const formatDate = (date: number) => format(new Date(date), 'dd MMM')
const formatLongDate = (date: number) => format(new Date(date), 'dd MMMM yyyy')
const formatPrice = (price: number) => `$${price.toFixed(2)}`
const formatMillions = (vol: number) => `$${(vol / 1000000).toFixed(2)}m`

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="border bg-popover p-2 rounded">
        <p className="text-xs text-muted-foreground">{formatLongDate(label)}</p>
        <p>Price: {formatPrice(payload[1].value as number)}</p>
        <p className="text-xs">
          Volume: {formatMillions(payload[0].value as number)}
        </p>
      </div>
    )
  }

  return null
}

interface ParsedChartData {
  date: number
  price: number
  volume: number
}

const parseChartData = (chartData: CoingeckoChartData): ParsedChartData[] => {
  return chartData.prices.map((item: any, i: number) => ({
    date: item[0] as number,
    price: item[1] as number,
    volume: chartData.total_volumes[i][1] as number,
  }))
}

export const ChartData = () => {
  const { theme } = useTailwind()
  const foreground = theme.colors.foreground
  const mutedForeground = theme.colors.muted.foreground
  const muted = theme.colors.muted.DEFAULT

  const [chartData, setChartData] = useState<ParsedChartData[] | null>(null)
  useEffect(() => {
    const url = '/api/coingecko/spacemesh/chart'
    fetch(url)
      .then((res) => res.json())
      .then((data) => setChartData(parseChartData(data)))
  }, [])

  const [scalePadding, setScalePadding] = useState(0)
  const onResize = (width: number, height: number) => {
    setScalePadding(height / 2)
  }

  if (chartData) {
    return (
      <ResponsiveContainer width="100%" height="100%" onResize={onResize}>
        <ComposedChart
          data={chartData}
          margin={{
            top: 0,
            right: 5,
            left: 0,
            bottom: 0,
          }}
        >
          <YAxis
            yAxisId="volume"
            dataKey="volume"
            width={0}
            padding={{ top: scalePadding }}
          />
          <Bar
            dataKey="volume"
            type="number"
            barSize={1}
            fill="#413ea0"
            maxBarSize={1}
            yAxisId="volume"
            strokeWidth={0}
            style={{ stroke: muted, fill: muted }}
          />
          <YAxis
            yAxisId="price"
            dataKey="price"
            width={48}
            orientation="right"
            strokeWidth="1"
            fontSize={10}
            fontWeight={100}
            tickFormatter={formatPrice}
            padding={{ top: 10 }}
            tickMargin={5}
            style={{ stroke: mutedForeground }}
          />
          <XAxis
            dataKey="date"
            strokeWidth="1"
            tickFormatter={formatDate}
            fontSize={10}
            fontWeight={100}
            interval={30}
            tickMargin={10}
            style={{ stroke: mutedForeground }}
          />
          <Tooltip
            content={<CustomTooltip />}
            formatter={(value: number) => [formatPrice(value), '']}
            labelFormatter={(date) => formatLongDate(date)}
            contentStyle={{ fontSize: '12px' }}
          />
          <Line
            type="monotone"
            dataKey="price"
            yAxisId="price"
            stroke="#000"
            strokeWidth="1.5"
            dot={false}
            style={{
              stroke: foreground,
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    )
  }
  return null
}
