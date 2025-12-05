
import React from 'react';
import { Theme } from '../types';

interface ThemeSelectorProps {
  themes: Theme[];
  selectedTheme: string;
  onSelectTheme: (themeName: string) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, selectedTheme, onSelectTheme }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {themes.map((theme) => (
        <button
          key={theme.name}
          onClick={() => onSelectTheme(theme.name)}
          className={`flex flex-col items-center justify-center gap-2 p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 
            ${selectedTheme === theme.name 
              ? 'bg-indigo-500/20 border-indigo-500 text-white' 
              : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-indigo-400 hover:text-white'
            }`}
        >
          {React.cloneElement(theme.icon, { className: 'w-6 h-6' })}
          <span>{theme.name}</span>
        </button>
      ))}
    </div>
  );
};
