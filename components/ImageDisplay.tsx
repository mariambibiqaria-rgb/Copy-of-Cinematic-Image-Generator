import React from 'react';
import { DownloadIcon, ImagePlaceholderIcon } from './icons';
import { AspectRatio, GeneratedImage } from '../types';

interface ImageDisplayProps {
  generatedImages: GeneratedImage[];
  aspectRatio: AspectRatio;
}

const getAspectRatioClass = (ratio: AspectRatio) => {
    switch (ratio) {
        case '1:1': return 'aspect-square';
        case '9:16': return 'aspect-[9/16]';
        case '4:3': return 'aspect-4/3';
        case '3:4': return 'aspect-[3/4]';
        case '16:9':
        default:
            return 'aspect-video';
    }
}

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] w-full gap-4 text-center p-8 bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-700">
        <ImagePlaceholderIcon className="w-24 h-24 text-gray-600" />
        <h3 className="text-2xl font-bold text-gray-400">Your Masterpieces Await</h3>
        <p className="text-gray-500 max-w-sm">
            Enter up to 4 prompts (one per line), choose a theme and aspect ratio, then click "Generate Images". 
            You will see them appear one by one.
        </p>
    </div>
);

const SingleImageLoader: React.FC = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-gray-400 p-4">
        <svg className="animate-spin h-10 w-10 text-indigo-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-sm font-medium animate-pulse">Creating...</span>
    </div>
);

const ErrorCard: React.FC<{ error: string }> = ({ error }) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800/80 border-2 border-red-500/30 text-red-400 p-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-bold">Generation Failed</span>
        <span className="text-xs mt-1 opacity-80">{error.includes('429') ? 'Quota Limit Reached' : 'Error Occurred'}</span>
    </div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ generatedImages, aspectRatio }) => {
    const handleDownload = (base64Image: string, index: number) => {
        const link = document.createElement('a');
        link.href = `data:image/jpeg;base64,${base64Image}`;
        link.download = `cinematic-image-${index + 1}-${new Date().getTime()}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const aspectRatioClass = getAspectRatioClass(aspectRatio);

    if (generatedImages.length === 0) return <Placeholder />;

    // Grid calculation
    const gridCols = generatedImages.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2';

    return (
        <div className={`grid ${gridCols} gap-4 w-full`}>
            {generatedImages.map((imgItem, index) => (
                <div 
                    key={imgItem.id} 
                    className={`relative w-full ${aspectRatioClass} bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl group`}
                >
                    {imgItem.loading ? (
                        <SingleImageLoader />
                    ) : imgItem.error ? (
                        <ErrorCard error={imgItem.error} />
                    ) : imgItem.base64 ? (
                        <>
                            <img
                                src={`data:image/jpeg;base64,${imgItem.base64}`}
                                alt={`Generated result for: ${imgItem.prompt}`}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                                <p className="text-white text-xs sm:text-sm text-center mb-4 line-clamp-3 px-2">
                                    "{imgItem.prompt}"
                                </p>
                                <button
                                    onClick={() => handleDownload(imgItem.base64!, index)}
                                    className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 border border-indigo-500 rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
                                >
                                    <DownloadIcon />
                                    Download
                                </button>
                            </div>
                            {/* Mobile/Always visible quick download */}
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDownload(imgItem.base64!, index); }}
                                className="absolute bottom-3 right-3 p-2 bg-gray-900/80 text-white rounded-full border border-gray-600 hover:bg-indigo-600 transition-colors md:hidden"
                                title="Download"
                            >
                                <DownloadIcon className="w-4 h-4" />
                            </button>
                        </>
                    ) : null}
                </div>
            ))}
        </div>
    );
};