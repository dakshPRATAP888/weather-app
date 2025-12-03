import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { WeatherData } from '../types';

interface ForecastChartProps {
  data: WeatherData;
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  // Take next 24 hours
  const chartData = data.hourly.time.slice(0, 24).map((time, index) => {
    const date = new Date(time);
    return {
      time: date.toLocaleTimeString([], { hour: '2-digit', hour12: true }),
      temp: data.hourly.temperature_2m[index],
      rain: data.hourly.relativehumidity_2m[index] // Visualizing humidity/rain chance correlation roughly
    };
  });

  return (
    <div className="w-full bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl">
      <h3 className="text-xl font-semibold text-white mb-6 pl-2 border-l-4 border-sky-500">24-Hour Trend</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
            <XAxis 
              dataKey="time" 
              tick={{fill: '#94a3b8', fontSize: 12}} 
              axisLine={false} 
              tickLine={false}
              interval={3}
            />
            <YAxis 
              tick={{fill: '#94a3b8', fontSize: 12}} 
              axisLine={false} 
              tickLine={false}
              unit="°"
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '12px' }}
              itemStyle={{ color: '#38bdf8' }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="#0ea5e9" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTemp)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;
