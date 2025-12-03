export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface DailyForecast {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  weathercode: number[];
}

export interface WeatherData {
  current_weather: CurrentWeather;
  daily: DailyForecast;
  hourly: HourlyForecast;
  current_units: {
    temperature: string;
    windspeed: string;
  };
}

export interface AIInsightResponse {
  summary: string;
  recommendation: string;
  hazards: string[];
}
