import React, { useState, useEffect, useCallback } from 'react';
import { Search, MapPin } from 'lucide-react';
import { searchLocation } from '../services/weatherService';
import { GeoLocation } from '../types';

interface SearchBarProps {
  onLocationSelect: (location: GeoLocation) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 2) {
        setIsSearching(true);
        const locations = await searchLocation(query);
        setResults(locations);
        setIsOpen(true);
        setIsSearching(false);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (loc: GeoLocation) => {
    onLocationSelect(loc);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-50">
      <div className="relative">
        <input
          type="text"
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-lg"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if(results.length > 0) setIsOpen(true); }}
        />
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
      </div>

      {isOpen && (results.length > 0 || isSearching) && (
        <div className="absolute w-full mt-2 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
          {isSearching ? (
             <div className="p-4 text-center text-gray-400 text-sm">Searching...</div>
          ) : (
            results.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleSelect(loc)}
                className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
              >
                <MapPin className="h-4 w-4 text-sky-400 shrink-0" />
                <div>
                  <div className="font-medium text-white">{loc.name}</div>
                  <div className="text-xs text-gray-400">
                    {[loc.admin1, loc.country].filter(Boolean).join(', ')}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
