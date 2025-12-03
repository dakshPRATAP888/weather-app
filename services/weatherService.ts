import { GeoLocation, WeatherData } from '../types';

const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export const searchLocation = async (query: string): Promise<GeoLocation[]> => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(`${GEO_API_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching location:", error);
    return [];
  }
};

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData | null> => {
  try {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      current_weather: 'true',
      hourly: 'temperature_2m,relativehumidity_2m,weathercode',
      daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      timezone: 'auto'
    });

    const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
    if (!response.ok) throw new Error('Weather data fetch failed');
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
