import React from 'react';
import { WeatherData } from '../types';
import { getIconForCode } from '../constants';
import { Wind, Droplets } from 'lucide-react';

interface CurrentWeatherCardProps {
  data: WeatherData;
  locationName: string;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ data, locationName }) => {
  const { current_weather, daily } = data;
  const weatherInfo = getIconForCode(current_weather.weathercode);
  const Icon = weatherInfo.icon;
  const tempMax = daily.temperature_2m_max[0];
  const tempMin = daily.temperature_2m_min[0];

  return (
    <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl group-hover:bg-sky-500/30 transition-all duration-700"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center md:justify-between gap-6">
        
        {/* Main Info */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight mb-1">{locationName}</h2>
          <p className="text-lg text-gray-300 font-light tracking-wide">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          
          <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
            <span className="text-7xl md:text-8xl font-bold tracking-tighter">
              {Math.round(current_weather.temperature)}°
            </span>
            <div className="flex flex-col items-center md:items-start space-y-1">
              <span className={`text-xl font-medium ${weatherInfo.color}`}>
                {weatherInfo.label}
              </span>
              <span className="text-sm text-gray-400">
                H: {Math.round(tempMax)}°  L: {Math.round(tempMin)}°
              </span>
            </div>
          </div>
        </div>

        {/* Icon & Details */}
        <div className="flex flex-col items-center gap-6">
          <Icon size={80} className={`${weatherInfo.color} drop-shadow-lg animate-pulse-slow`} />
          
          <div className="grid grid-cols-2 gap-4 w-full bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="flex flex-col items-center gap-1">
              <Wind className="w-5 h-5 text-gray-400" />
              <span className="font-semibold">{current_weather.windspeed} <span className="text-xs font-normal text-gray-400">km/h</span></span>
            </div>
            {/* Note: Humidity is not in current_weather by default in some OpenMeteo calls without extra params, using hourly[0] as proxy if needed, or removing */}
             <div className="flex flex-col items-center gap-1">
              <Droplets className="w-5 h-5 text-gray-400" />
              {/* Using first hourly humidity as approximation for current */}
              <span className="font-semibold">{data.hourly.relativehumidity_2m[0]}<span className="text-xs font-normal text-gray-400">%</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
