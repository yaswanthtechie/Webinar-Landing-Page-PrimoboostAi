import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} bg-gradient-to-br from-cyan-500 to-orange-500 rounded-lg flex items-center justify-center`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-1"
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="documentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle cx="24" cy="24" r="22" fill="url(#bgGradient)" />

        {/* Document icon (top left) */}
        <rect x="8" y="8" width="8" height="10" rx="1" fill="url(#documentGradient)" />
        <rect x="10" y="10" width="4" height="1" rx="0.5" fill="white" />
        <rect x="10" y="12" width="4" height="1" rx="0.5" fill="white" />
        <rect x="10" y="14" width="3" height="1" rx="0.5" fill="white" />

        {/* Brain with circuit pattern */}
        <path
          d="M24 16c-3 0-5.5 2.5-5.5 5.5 0 2.5 1.5 4.5 3.5 5.5-1 1-2 2.5-2 4 0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5c0-1.5-1-3-2-4 2-1 3.5-3 3.5-5.5C29.5 18.5 27 16 24 16z"
          fill="url(#brainGradient)"
        />
        
        {/* Circuit lines on brain */}
        <path d="M20 20h8" stroke="white" strokeWidth="0.5" opacity="0.8" />
        <path d="M20 22h6" stroke="white" strokeWidth="0.5" opacity="0.8" />
        <path d="M20 24h8" stroke="white" strokeWidth="0.5" opacity="0.8" />
        <path d="M22 26h4" stroke="white" strokeWidth="0.5" opacity="0.8" />
        
        {/* Circuit dots */}
        <circle cx="20" cy="20" r="0.5" fill="white" opacity="0.9" />
        <circle cx="28" cy="20" r="0.5" fill="white" opacity="0.9" />
        <circle cx="20" cy="22" r="0.5" fill="white" opacity="0.9" />
        <circle cx="26" cy="22" r="0.5" fill="white" opacity="0.9" />
        <circle cx="20" cy="24" r="0.5" fill="white" opacity="0.9" />
        <circle cx="28" cy="24" r="0.5" fill="white" opacity="0.9" />
        <circle cx="22" cy="26" r="0.5" fill="white" opacity="0.9" />
        <circle cx="26" cy="26" r="0.5" fill="white" opacity="0.9" />

        {/* Growth arrow (curved from bottom left to top right) */}
        <path
          d="M16 32 Q20 28 24 26 Q28 24 32 20"
          stroke="url(#arrowGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Arrowhead */}
        <path
          d="M30 22 L32 20 L30 18"
          stroke="url(#arrowGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
