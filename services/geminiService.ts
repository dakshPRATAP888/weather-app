import { GoogleGenAI, Type } from "@google/genai";
import { WeatherData, AIInsightResponse } from '../types';

// Safe initialization
const apiKey = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateWeatherInsight = async (
  city: string,
  data: WeatherData
): Promise<AIInsightResponse | null> => {
  if (!ai) {
    console.warn("Gemini API Key missing");
    return {
      summary: "Services are unavailable .",
      recommendation: "Please check standard forecasts.",
      hazards: []
    };
  }

  try {
    // Extract relevant data to keep context small
    const contextData = {
      city,
      current: {
        temp: data.current_weather.temperature,
        wind: data.current_weather.windspeed,
        code: data.current_weather.weathercode,
        is_day: data.current_weather.is_day
      },
      forecast: data.daily.time.slice(0, 3).map((t, i) => ({
        date: t,
        max: data.daily.temperature_2m_max[i],
        min: data.daily.temperature_2m_min[i],
        rain_prob: data.daily.precipitation_probability_max[i]
      }))
    };

    const prompt = `
      Analyze this weather data for ${city}.
      Data: ${JSON.stringify(contextData)}
      
      Provide a response in JSON format with:
      1. 'summary': A witty, 1-sentence summary of the current vibe.
      2. 'recommendation': Specific advice on what to wear or do.
      3. 'hazards': Array of strings listing any potential annoyances (e.g., "High UV", "Strong Winds", "Rain likely").
      
      Keep it short and helpful.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendation: { type: Type.STRING },
            hazards: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIInsightResponse;
    }
    return null;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      summary: "Failed to connect to Weather .",
      recommendation: "Check back later.",
      hazards: []
    };
  }
};
