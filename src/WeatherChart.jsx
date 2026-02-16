import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function WeatherChart({ data, unit }) {
  if (!data || data.length === 0) return null;

  const symbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="chart-container">
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>24-Hour Temperature Trend</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis 
              dataKey="time" 
              stroke="white" 
              fontSize={12}
              tick={{fill: 'white'}}
            />
            <YAxis 
              stroke="white" 
              fontSize={12} 
              unit={symbol} 
              tick={{fill: 'white'}}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px', color: 'white' }}
              itemStyle={{ color: '#ff9a9e' }}
              formatter={(value) => [`${value}${symbol}`, 'Temperature']}
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#ff9a9e" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#ff9a9e' }} 
              activeDot={{ r: 8 }}
              
              /* Animation Props */
              isAnimationActive={true} // Enables animation
              animationBegin={0}        // Delay in milliseconds
              animationDuration={1500}  // Speed of the "growth"
              animationEasing="ease-in-out" // Smooth start and end
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeatherChart;