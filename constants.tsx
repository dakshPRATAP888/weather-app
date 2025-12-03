import React from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Snowflake,
  LucideIcon
} from 'lucide-react';

export const WEATHER_CODES: Record<number, { label: string; icon: LucideIcon; color: string }> = {
  0: { label: 'Clear Sky', icon: Sun, color: 'text-yellow-400' },
  1: { label: 'Mainly Clear', icon: CloudSun, color: 'text-yellow-200' },
  2: { label: 'Partly Cloudy', icon: CloudSun, color: 'text-gray-200' },
  3: { label: 'Overcast', icon: Cloud, color: 'text-gray-400' },
  45: { label: 'Foggy', icon: CloudFog, color: 'text-gray-400' },
  48: { label: 'Depositing Rime Fog', icon: CloudFog, color: 'text-gray-400' },
  51: { label: 'Light Drizzle', icon: CloudDrizzle, color: 'text-blue-300' },
  53: { label: 'Moderate Drizzle', icon: CloudDrizzle, color: 'text-blue-400' },
  55: { label: 'Dense Drizzle', icon: CloudDrizzle, color: 'text-blue-500' },
  61: { label: 'Slight Rain', icon: CloudRain, color: 'text-blue-400' },
  63: { label: 'Moderate Rain', icon: CloudRain, color: 'text-blue-500' },
  65: { label: 'Heavy Rain', icon: CloudRain, color: 'text-blue-600' },
  71: { label: 'Slight Snow', icon: CloudSnow, color: 'text-white' },
  73: { label: 'Moderate Snow', icon: CloudSnow, color: 'text-white' },
  75: { label: 'Heavy Snow', icon: CloudSnow, color: 'text-white' },
  80: { label: 'Rain Showers', icon: CloudRain, color: 'text-blue-400' },
  81: { label: 'Moderate Rain Showers', icon: CloudRain, color: 'text-blue-500' },
  82: { label: 'Violent Rain Showers', icon: CloudRain, color: 'text-blue-700' },
  95: { label: 'Thunderstorm', icon: CloudLightning, color: 'text-yellow-500' },
  96: { label: 'Thunderstorm with Hail', icon: CloudLightning, color: 'text-red-500' },
  99: { label: 'Thunderstorm with Heavy Hail', icon: CloudLightning, color: 'text-red-600' },
};

export const getIconForCode = (code: number) => {
  return WEATHER_CODES[code] || { label: 'Unknown', icon: Sun, color: 'text-gray-500' };
};
