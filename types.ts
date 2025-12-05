import type { ReactElement } from 'react';

export interface Theme {
  name: string;
  prompt: string;
  icon: ReactElement;
}

export type AspectRatio = "16:9" | "1:1" | "9:16" | "4:3" | "3:4";

export interface AspectRatioOption {
  label: string;
  value: AspectRatio;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  base64: string | null;
  loading: boolean;
  error: string | null;
}