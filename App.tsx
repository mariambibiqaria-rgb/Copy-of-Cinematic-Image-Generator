import React, { useState, useCallback } from 'react';
import { ThemeSelector } from './components/ThemeSelector';
import { ImageDisplay } from './components/ImageDisplay';
import { generateImageFromPrompt } from './services/geminiService';
import { THEMES, ASPECT_RATIOS } from './constants';
import { Theme, AspectRatio, GeneratedImage } from './types';
import { SparklesIcon } from './components/icons';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { ColorSelector } from './components/ColorSelector';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<Theme>(THEMES[0]);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>('16:9');
  const [selectedColor, setSelectedColor] = useState<string>('None');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  const handleThemeSelect = useCallback((themeName: string) => {
    const theme = THEMES.find(t => t.name === themeName);
    if (theme) {
      setSelectedTheme(theme);
    }
  }, []);

  const handleAspectRatioSelect = useCallback((ratio: AspectRatio) => {
    setSelectedAspectRatio(ratio);
  }, []);

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      return;
    }
    
    // Split prompts by newline and filter empty ones
    const rawPrompts = prompt.split('\n').filter(p => p.trim() !== '');
    
    if (rawPrompts.length === 0) return;

    // Limit to 4 prompts as requested
    const promptsToProcess = rawPrompts.slice(0, 4);

    setIsGenerating(true);
    
    // Initialize placeholders so user sees cards immediately
    const initialImages: GeneratedImage[] = promptsToProcess.map((p, index) => ({
      id: `img-${Date.now()}-${index}`,
      prompt: p,
      base64: null,
      loading: true,
      error: null
    }));
    
    setGeneratedImages(initialImages);

    // Process sequentially to avoid 429 Rate Limit errors
    for (const imgItem of initialImages) {
      try {
        // Construct the prompt:
        // 1. If a color is selected, PREPEND it. e.g. "White. A cat with kittens..."
        // This forces the subject to take the color.
        const colorPrefix = selectedColor !== 'None' ? `${selectedColor} color scheme, ${selectedColor} colored subject. ` : '';
        
        // 2. Combine all parts.
        // Priority: COLOR -> USER PROMPT -> THEME -> STYLE KEYWORDS
        const fullPrompt = `${colorPrefix}${imgItem.prompt}, ${selectedTheme.prompt}, cinematic lighting, detailed background, natural shadows, smooth color grading, ultra-realistic, high-resolution, HD clarity, suitable for animation and video scenes.`;
        
        const base64 = await generateImageFromPrompt(fullPrompt, selectedAspectRatio);
        
        setGeneratedImages(prev => prev.map(item => 
          item.id === imgItem.id 
            ? { ...item, base64, loading: false }
            : item
        ));
      } catch (err) {
        setGeneratedImages(prev => prev.map(item => 
          item.id === imgItem.id 
            ? { ...item, error: err instanceof Error ? err.message : 'Generation failed', loading: false }
            : item
        ));
      }
      // Increased delay to 4 seconds to be extremely proactive against Rate Limits
      await new Promise(resolve => setTimeout(resolve, 4000));
    }

    setIsGenerating(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Control Panel */}
        <div className="lg:w-1/3 w-full flex flex-col gap-6 p-6 bg-gray-800/50 rounded-2xl border border-gray-700 backdrop-blur-sm h-fit sticky top-6">
          <header className="text-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
              Cinematic Generator
            </h1>
            <p className="mt-2 text-gray-400">
              Create up to 4 visuals at once.
            </p>
          </header>

          <div className="flex flex-col gap-2">
            <label htmlFor="prompt" className="font-semibold text-gray-300">
              1. Enter Prompts <span className="text-xs text-gray-500 font-normal">(One per line, max 4)</span>
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`A lion in the savannah\nA cyberpunk city street\nA peaceful mountain lake\n...`}
              className="w-full h-40 p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500 resize-none whitespace-pre font-mono text-sm"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-gray-300">2. Select a Theme</h2>
            <ThemeSelector
              themes={THEMES}
              selectedTheme={selectedTheme.name}
              onSelectTheme={handleThemeSelect}
            />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-gray-300">3. Select Main Color</h2>
            <p className="text-xs text-gray-500 -mt-2">Forces the subject (e.g. cat, car) to this color.</p>
            <ColorSelector
              selectedColor={selectedColor}
              onSelectColor={handleColorSelect}
            />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-gray-300">4. Choose Aspect Ratio</h2>
            <AspectRatioSelector
              aspectRatios={ASPECT_RATIOS}
              selectedAspectRatio={selectedAspectRatio}
              onSelectAspectRatio={handleAspectRatioSelect}
            />
          </div>
          
          <button
            onClick={handleGenerateImage}
            disabled={isGenerating || !prompt.trim()}
            className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <SparklesIcon />
                Generate Images
              </>
            )}
          </button>
        </div>

        {/* Image Display */}
        <div className="lg:w-2/3 w-full flex-grow">
           <ImageDisplay 
             generatedImages={generatedImages}
             aspectRatio={selectedAspectRatio}
            />
        </div>
      </main>
    </div>
  );
};

export default App;