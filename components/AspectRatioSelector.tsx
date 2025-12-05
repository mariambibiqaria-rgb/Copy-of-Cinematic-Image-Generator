import React from 'react';
import { AspectRatioOption, AspectRatio } from '../types';

interface AspectRatioSelectorProps {
  aspectRatios: AspectRatioOption[];
  selectedAspectRatio: AspectRatio;
  onSelectAspectRatio: (aspectRatio: AspectRatio) => void;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ aspectRatios, selectedAspectRatio, onSelectAspectRatio }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {aspectRatios.map((ratio) => (
        <button
          key={ratio.value}
          onClick={() => onSelectAspectRatio(ratio.value)}
          className={`px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-all duration-200 
            ${selectedAspectRatio === ratio.value 
              ? 'bg-indigo-500/20 border-indigo-500 text-white' 
              : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-indigo-400 hover:text-white'
            }`}
        >
          {ratio.label}
        </button>
      ))}
    </div>
  );
};