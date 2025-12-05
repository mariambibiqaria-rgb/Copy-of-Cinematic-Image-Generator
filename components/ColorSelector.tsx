import React from 'react';

export const COLORS = [
  { name: 'None', hex: 'transparent', border: 'gray' },
  { name: 'White', hex: '#FFFFFF', border: 'gray' },
  { name: 'Black', hex: '#000000', border: 'gray' },
  { name: 'Gray', hex: '#808080', border: 'transparent' },
  { name: 'Brown', hex: '#8B4513', border: 'transparent' },
  { name: 'Orange', hex: '#FFA500', border: 'transparent' },
  { name: 'Red', hex: '#EF4444', border: 'transparent' },
  { name: 'Blue', hex: '#3B82F6', border: 'transparent' },
  { name: 'Green', hex: '#22C55E', border: 'transparent' },
  { name: 'Yellow', hex: '#EAB308', border: 'transparent' },
  { name: 'Purple', hex: '#A855F7', border: 'transparent' },
  { name: 'Pink', hex: '#EC4899', border: 'transparent' },
  { name: 'Gold', hex: '#FFD700', border: 'transparent' },
  { name: 'Silver', hex: '#C0C0C0', border: 'transparent' },
];

interface ColorSelectorProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ selectedColor, onSelectColor }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
      {COLORS.map((color) => (
        <button
          key={color.name}
          onClick={() => onSelectColor(color.name)}
          className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 
            ${selectedColor === color.name 
              ? 'bg-indigo-500/20 border-indigo-500 text-white ring-1 ring-indigo-500' 
              : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-indigo-400 hover:text-white'
            }`}
        >
          <span 
            className="w-4 h-4 rounded-full border border-gray-500/50 shadow-sm"
            style={{ 
                backgroundColor: color.hex,
                border: color.name === 'None' || color.name === 'Black' ? '1px solid #4B5563' : 'none'
            }}
          />
          <span>{color.name}</span>
        </button>
      ))}
    </div>
  );
};
