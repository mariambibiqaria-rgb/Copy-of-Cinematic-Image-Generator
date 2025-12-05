import React from 'react';
import { Theme, AspectRatioOption } from './types';
import { 
  NatureIcon, 
  AnimalIcon, 
  FantasyIcon, 
  CarIcon, 
  HumanIcon, 
  AbstractIcon 
} from './components/icons';

export const THEMES: Theme[] = [
  { 
    name: 'Nature', 
    prompt: 'breathtaking landscape, epic scale, serene environment, natural elements',
    icon: <NatureIcon />
  },
  { 
    name: 'Animals', 
    prompt: 'majestic wildlife, detailed fur and feathers, dynamic poses, in natural habitat',
    icon: <AnimalIcon />
  },
  { 
    name: 'Fantasy', 
    prompt: 'epic fantasy scene, mythical creatures, magical elements, dramatic lighting, otherworldly',
    icon: <FantasyIcon />
  },
  { 
    name: 'Cars', 
    prompt: 'sleek automotive design, dynamic motion blur, reflective surfaces, on an open road',
    icon: <CarIcon />
  },
  { 
    name: 'Humans', 
    prompt: 'hyperrealistic portrait, emotional expression, detailed skin texture, cinematic character',
    icon: <HumanIcon />
  },
  { 
    name: 'Abstract', 
    prompt: 'vibrant abstract art, complex patterns, fluid shapes, conceptual design, rich textures',
    icon: <AbstractIcon />
  },
];

export const ASPECT_RATIOS: AspectRatioOption[] = [
  { label: '16:9', value: '16:9' },
  { label: '1:1', value: '1:1' },
  { label: '9:16', value: '9:16' },
  { label: '4:3', value: '4:3' },
  { label: '3:4', value: '3:4' },
];