import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateImageFromPrompt(prompt: string, aspectRatio: AspectRatio): Promise<string> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Retry configuration
    const maxRetries = 4;
    let attempt = 0;
    const baseDelay = 4000; 

    while (attempt <= maxRetries) {
        try {
            // Switching to gemini-2.5-flash-image (Nano Banana) as it has better availability
            // and is less likely to throw 'limit: 0' errors compared to Imagen 3.
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [{ text: prompt }]
                },
                config: {
                    imageConfig: {
                        aspectRatio: aspectRatio,
                    }
                },
            });

            // Iterate through parts to find the image
            let base64Image: string | null = null;
            
            if (response.candidates?.[0]?.content?.parts) {
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData && part.inlineData.data) {
                        base64Image = part.inlineData.data;
                        break;
                    }
                }
            }

            if (base64Image) {
                return base64Image;
            } else {
                // Sometimes the model returns text if safety filters trigger
                throw new Error("Model returned a response but no image data found. (Possibly blocked by safety filters)");
            }

        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            
            const isRateLimit = errorMessage.includes('429') || 
                                errorMessage.includes('Quota exceeded') || 
                                errorMessage.includes('RESOURCE_EXHAUSTED');
            
            const isServerOverload = errorMessage.includes('503') || errorMessage.includes('500');

            if ((isRateLimit || isServerOverload) && attempt < maxRetries) {
                const delay = (baseDelay * Math.pow(2, attempt)) + (Math.random() * 1000);
                console.warn(`API Limit hit. Retrying in ${Math.round(delay/1000)}s... (Attempt ${attempt + 1}/${maxRetries})`);
                await wait(delay);
                attempt++;
                continue; 
            }

            console.error("Gemini API Error:", error);
            if (error instanceof Error) {
               throw new Error(`Failed to generate image: ${error.message}`);
            }
            throw new Error("An unknown error occurred during image generation.");
        }
    }
    throw new Error("Failed to generate image after multiple retries due to rate limits.");
}