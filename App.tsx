import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import ForecastChart from './components/ForecastChart';
import AIWeatherAssistant from './components/AIWeatherAssistant';
import { WeatherData, GeoLocation, AIInsightResponse } from './types';
import { getWeatherData } from './services/weatherService';
import { generateWeatherInsight } from './services/geminiService';
import { getIconForCode } from './constants';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<GeoLocation>({
    id: 0,
    name: 'Kota',
    latitude: 25.2138,
    longitude: 75.8648,
    country: 'India'
  });
  const [aiInsight, setAiInsight] = useState<AIInsightResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  const fetchData = async (loc: GeoLocation) => {
    setLoading(true);
    setAiLoading(true);
    setWeatherData(null);
    setAiInsight(null);
    
    // 1. Fetch Hard Data
    const data = await getWeatherData(loc.latitude, loc.longitude);
    setWeatherData(data);
    setLoading(false);

    // 2. Fetch AI Insight (Parallel or sequential based on data availability)
    if (data) {
      const insight = await generateWeatherInsight(loc.name, data);
      setAiInsight(insight);
    }
    setAiLoading(false);
  };

  useEffect(() => {
    fetchData(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.id]); // Trigger on location change

  const handleLocationSelect = (newLoc: GeoLocation) => {
    setLocation(newLoc);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 selection:bg-sky-500/30 pb-12">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-8 md:pt-12 max-w-6xl">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
              Weather
            </h1>
            <p className="text-slate-400 text-sm mt-1">Forecasting</p>
          </div>
          <div className="w-full md:w-auto">
            <SearchBar onLocationSelect={handleLocationSelect} />
          </div>
        </header>

        {loading ? (
           <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-sky-300 animate-pulse">Gathering atmospheric data...</p>
           </div>
        ) : weatherData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Top Row: Current Weather (Span 2) + AI Insight (Span 1) */}
            <div className="lg:col-span-2">
              <CurrentWeatherCard data={weatherData} locationName={location.name} />
            </div>
            <div className="lg:col-span-1">
              <AIWeatherAssistant insight={aiInsight} loading={aiLoading} />
            </div>

            {/* Middle Row: Charts */}
            <div className="lg:col-span-3">
              <ForecastChart data={weatherData} />
            </div>

            {/* Bottom Row: 5 Day Mini-Forecast Grid */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-5 gap-4">
              {weatherData.daily.time.slice(0, 5).map((t, i) => {
                const code = weatherData.daily.weathercode[i];
                const info = getIconForCode(code);
                const DailyIcon = info.icon;
                const date = new Date(t);
                
                return (
                  <div key={t} className="bg-slate-800/40 backdrop-blur-sm border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/5 transition-colors">
                    <p className="text-sm text-gray-400">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <DailyIcon className={`w-8 h-8 ${info.color} my-1`} />
                    <div className="text-sm font-semibold">
                      <span className="text-white">{Math.round(weatherData.daily.temperature_2m_max[i])}°</span>
                      <span className="text-gray-500 mx-1">/</span>
                      <span className="text-gray-400">{Math.round(weatherData.daily.temperature_2m_min[i])}°</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p>Unable to load weather data. Please try again.</p>
          </div>
        )}
        
        <footer className="mt-20 text-center text-xs text-gray-600">
           <p>Powered by Daksh pratap singh</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
