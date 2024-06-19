import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'

import useTailwind from '@/client/context/tailwind'

interface CoingeckoChartData {
  prices: [number, number][]
}

const formatDate = (date: number) => {
  return format(new Date(date), 'dd MMM')
}

const formatLongDate = (date: number) => {
  return format(new Date(date), 'dd MMMM yyyy')
}

const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="border bg-popover p-2 rounded">
        <p className="text-xs text-muted-foreground">{formatLongDate(label)}</p>
        <p>{formatPrice(payload[0].value as number)}</p>
      </div>
    )
  }

  return null
}

export const ChartData = () => {
  const { theme } = useTailwind()
  console.log(theme)
  const [chartData, setChartData] = useState<CoingeckoChartData | null>(null)
  useEffect(() => {
    const url = '/api/coingecko/spacemesh/chart'
    fetch(url)
      .then((res) => res.json())
      .then((data) => setChartData(data))
  }, [])

  if (chartData) {
    const prices = chartData.prices.map((item: any) => ({
      date: item[0], //format(new Date(item[0]), 'dd MMM'),
      value: item[1],
    }))

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={prices}
          margin={{
            top: 0,
            right: 5,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="1 3" />
          <YAxis
            width={48}
            orientation="right"
            strokeWidth="1"
            fontSize={12}
            tickFormatter={formatPrice}
            padding={{ top: 10 }}
            tickMargin={5}
          />
          <XAxis
            dataKey="date"
            strokeWidth="1"
            tickFormatter={formatDate}
            fontSize={12}
            interval={30}
            tickMargin={10}
          />
          <Tooltip
            content={<CustomTooltip />}
            formatter={(value: number) => [formatPrice(value), '']}
            labelFormatter={(date) => formatLongDate(date)}
            contentStyle={{ fontSize: '12px' }}
          />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#000"
            strokeWidth="1.5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }
  return null
}
