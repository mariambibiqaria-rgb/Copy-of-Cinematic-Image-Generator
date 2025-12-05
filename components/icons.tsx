
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const NatureIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 12v0a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2Z" />
    <path d="M18.8 9.5a2.5 2.5 0 1 1-2.1-4.2" />
    <path d="M15.4 12.3a2.5 2.5 0 1 0 2.1 4.2" />
    <path d="M6.8 16.5a2.5 2.5 0 1 1 2.1-4.2" />
    <path d="M10.2 9.7a2.5 2.5 0 1 0-2.1 4.2" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.9 4.9 1.4 1.4" />
    <path d="m17.7 17.7 1.4 1.4" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m4.9 19.1 1.4-1.4" />
    <path d="m17.7 6.3 1.4-1.4" />
  </svg>
);

export const AnimalIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12c-2 0-2 2-2 3s0 3 2 3 2-1 2-3-1-3-2-3Z" />
    <path d="M21 16V8a2 2 0 0 0-2-2h-3" />
    <path d="M21 16c0 1.1-.9 2-2 2h-1.5" />
    <path d="M3 16V8a2 2 0 0 1 2-2h3" />
    <path d="M3 16c0 1.1.9 2 2 2h1.5" />
    <path d="M7 8S5 3 12 3s7 5 7 5" />
    <path d="M17.5 16.5c0 .3.2.5.5.5s.5-.2.5-.5" />
    <path d="M6.5 16.5c0 .3.2.5.5.5s.5-.2.5-.5" />
  </svg>
);

export const FantasyIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 7.3a10.6 10.6 0 0 0-6-2.3 10.6 10.6 0 0 0-6 2.3" />
    <path d="M13.2 10.2 12 12l-1.2-1.8" />
    <path d="M12 12v3.8" />
    <path d="M15.2 13.8 12 16l-3.2-2.2" />
    <path d="M6 8.3c-1.3 2.1-2 4.6-2 7.2 0 2.5.7 4.9 2.1 6.8" />
    <path d="M18 8.3c1.3 2.1 2 4.6 2 7.2 0 2.5-.7 4.9-2.1 6.8" />
    <path d="M5.1 11.2a4.9 4.9 0 0 1 13.8 0" />
  </svg>
);

export const CarIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 16h-4l-1-4H4V8h16v4h-5z" />
    <circle cx="6.5" cy="16.5" r="2.5" />
    <circle cx="17.5" cy="16.5" r="2.5" />
  </svg>
);

export const HumanIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1" />
    <path d="M9 20c0-3.5 1.5-7 3-7s3 3.5 3 7" />
    <path d="M12 12a5 5 0 0 0-5 5c0 1.7.5 3.2 1.4 4.4" />
    <path d="M12 12a5 5 0 0 1 5 5c0 1.7-.5 3.2-1.4 4.4" />
  </svg>
);

export const AbstractIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" />
    <path d="M10 10c.2-2.8.2-4 0-6" />
    <path d="M14 14c-.2 2.8-.2 4 0 6" />
    <path d="M10 14c-2.8-.2-4-.2-6 0" />
    <path d="M14 10c2.8.2 4 .2 6 0" />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const ImagePlaceholderIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
    <circle cx="9" cy="9" r="2"/>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9 1.9 4.8 1.9-4.8 4.8-1.9-4.8-1.9L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
);
