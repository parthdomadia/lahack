"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
} from "recharts"

// Sample data for the glucose chart
const data = [
  { time: "11:00", glucose: 110 },
  { time: "12:00", glucose: 125 },
  { time: "13:00", glucose: 145 },
  { time: "14:00", glucose: 130 },
  { time: "15:00", glucose: 115 },
  { time: "16:00", glucose: 105 },
  { time: "17:00", glucose: 120 },
  { time: "18:00", glucose: 160 },
  { time: "19:00", glucose: 140 },
  { time: "20:00", glucose: 125 },
  { time: "21:00", glucose: 110 },
]

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value
    let status = "In Range"
    let color = "text-green-600"
    let bgColor = "bg-green-50"
    let borderColor = "border-green-200"

    if (value > 180) {
      status = "High"
      color = "text-red-600"
      bgColor = "bg-red-50"
      borderColor = "border-red-200"
    } else if (value < 70) {
      status = "Low"
      color = "text-orange-600"
      bgColor = "bg-orange-50"
      borderColor = "border-orange-200"
    }

    return (
      <div className={`rounded-lg border ${borderColor} ${bgColor} p-3 shadow-md`}>
        <p className="text-sm font-medium">{`${label}`}</p>
        <p className={`text-lg font-bold ${color}`}>{`${value} mg/dL`}</p>
        <p className={`text-xs ${color}`}>{status}</p>
      </div>
    )
  }

  return null
}

export function GlucoseChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
        <defs>
          <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="time" tick={{ fontSize: 12 }} />
        <YAxis domain={[40, 250]} tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={180} stroke="#ef4444" strokeDasharray="3 3" strokeWidth={2} />
        <ReferenceLine y={70} stroke="#f97316" strokeDasharray="3 3" strokeWidth={2} />
        <Area
          type="monotone"
          dataKey="glucose"
          stroke="#0d9488"
          strokeWidth={0}
          fillOpacity={1}
          fill="url(#colorGlucose)"
        />
        <Line
          type="monotone"
          dataKey="glucose"
          stroke="#0d9488"
          strokeWidth={3}
          dot={{ r: 6, fill: "#0d9488", strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 8, stroke: "#0d9488", strokeWidth: 2, fill: "#fff" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
