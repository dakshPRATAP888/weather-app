import React from 'react';
import { Sparkles, AlertTriangle, Shirt } from 'lucide-react';
import { AIInsightResponse } from '../types';

interface AIWeatherAssistantProps {
  insight: AIInsightResponse | null;
  loading: boolean;
}

const AIWeatherAssistant: React.FC<AIWeatherAssistantProps> = ({ insight, loading }) => {
  if (loading) {
    return (
      <div className="h-full min-h-[200px] bg-indigo-900/20 backdrop-blur-md border border-indigo-500/30 rounded-3xl p-6 shadow-xl flex items-center justify-center">
        <div className="flex items-center gap-3 text-indigo-300 animate-pulse">
          <Sparkles className="w-5 h-5" />
          <span>Consulting ...</span>
        </div>
      </div>
    );
  }

  if (!insight) return null;

  return (
    <div className="h-full bg-gradient-to-br from-indigo-900/40 to-violet-900/40 backdrop-blur-md border border-indigo-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={120} />
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-2 text-indigo-300 mb-2">
          <Sparkles className="w-5 h-5" />
          <h3 className="text-sm font-bold uppercase tracking-wider">Forecast Insight</h3>
        </div>

        <div>
          <h4 className="text-xl font-medium text-white leading-relaxed mb-4">
            "{insight.summary}"
          </h4>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex gap-3 items-start">
            <Shirt className="w-5 h-5 text-sky-300 mt-1 shrink-0" />
            <div>
              <p className="text-sm text-gray-400 uppercase font-bold mb-1">Recommendation</p>
              <p className="text-indigo-100">{insight.recommendation}</p>
            </div>
          </div>
        </div>

        {insight.hazards.length > 0 && (
          <div className="flex flex-wrap gap-2">
             {insight.hazards.map((hazard, i) => (
               <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/20 text-red-200 text-xs font-semibold border border-red-500/30">
                 <AlertTriangle className="w-3 h-3" />
                 {hazard}
               </span>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIWeatherAssistant;
