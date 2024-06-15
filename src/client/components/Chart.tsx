import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ChartProps {
  data: {
    date: Date
    value: number
  }[]
}
const Chart = ({ data }: ChartProps) => {
  console.log('CHART DATA', data)
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 0,
          right: 5,
          left: 0,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date" strokeWidth="1.5" />
        <YAxis width={20} strokeWidth="1.5" />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#fff"
          strokeWidth="1.5"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
