"use client";

import { useState, useEffect, useRef } from 'react';
import { Pause, LoaderCircle } from 'lucide-react';

interface CompanyLogo {
  name: string;
  logo: string;
  alt: string;
}

const companies: CompanyLogo[] = [
  { name: 'Accenture', logo: '/logos/accenture.png', alt: 'Accenture logo' },
  { name: 'Capgemini', logo: '/logos/capgemini.png', alt: 'Capgemini logo' },
  { name: 'Deloitte', logo: '/logos/deloitte.png', alt: 'Deloitte logo' },
  { name: 'HCLTech', logo: '/logos/hcltech.png', alt: 'HCLTech logo' },
  { name: 'Microsoft', logo: '/logos/microsoft.png', alt: 'Microsoft logo' },
  { name: 'TCS', logo: '/logos/tcs.png', alt: 'TCS logo' },
  { name: 'Amazon', logo: '/logos/amazon.png', alt: 'Amazon logo' },
  { name: 'Cognizant', logo: '/logos/cognizant.png', alt: 'Cognizant logo' },
  { name: 'IBM', logo: '/logos/ibm.png', alt: 'IBM logo' },
  { name: 'Infosys', logo: '/logos/infosys.png', alt: 'Infosys logo' },
  { name: 'Wipro', logo: '/logos/wipro.png', alt: 'Wipro logo' },
  { name: 'Tech Mahindra', logo: '/logos/tech-mahindra.png', alt: 'Tech Mahindra logo' },
];

export default function SocialProofMarquee() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      // Simulate loading time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
        clearTimeout(timer);
      };
    }
  }, []);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handleFocus = () => setIsPaused(true);
  const handleBlur = () => setIsPaused(false);

  // Duplicate logos for infinite effect
  const duplicatedLogos = [...companies, ...companies];

  if (isLoading) {
    return (
      <section className="py-16 bg-card">
        <div className="container max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4 bg-gradient-to-r from-cyan-400 to-orange-500 bg-clip-text text-transparent">
              Trusted by Candidates Hired At
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of professionals who've landed their dream jobs
            </p>
          </div>
          
          {/* Loading skeleton */}
          <div className="flex items-center justify-center space-x-8 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center w-32 h-16 bg-muted animate-pulse rounded-lg"
              >
                <LoaderCircle className="w-6 h-6 text-muted-foreground animate-spin" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (prefersReducedMotion) {
    return (
      <section className="py-16 bg-card">
        <div className="container max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              Trusted by Candidates Hired At
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of professionals who've landed their dream jobs
            </p>
          </div>
          
          {/* Static grid for reduced motion */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {companies.slice(0, 10).map((company, index) => (
              <div
                key={company.name}
                className="flex items-center justify-center w-32 h-16 transition-all duration-300 opacity-100"
              >
                <img
                  src={company.logo}
                  alt={company.alt}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-card">
      <div className="container max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-4 bg-gradient-to-r from-cyan-400 to-orange-500 bg-clip-text text-transparent">
            Trusted by Candidates Hired At
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of professionals who've landed their dream jobs
          </p>
        </div>
        
        {/* Marquee container */}
        <div className="relative overflow-hidden">
          <div
            ref={marqueeRef}
            className={`flex space-x-12 ${
              isPaused ? 'animation-play-state-paused' : ''
            }`}
            style={{
              animation: 'scroll 30s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={0}
            role="region"
            aria-label="Company logos marquee"
            aria-live="polite"
          >
            {duplicatedLogos.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex items-center justify-center w-32 h-16 flex-shrink-0 transition-all duration-300 opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
                tabIndex={0}
                role="img"
                aria-label={company.alt}
              >
                <img
                  src={company.logo}
                  alt={company.alt}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          
          {/* Pause indicator */}
          {isPaused && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <Pause className="w-6 h-6 text-foreground" />
            </div>
          )}
          
          {/* Gradient masks */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-card to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-card to-transparent pointer-events-none" />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none !important;
          }
        }
        
        @supports not (animation: scroll) {
          .marquee-fallback {
            overflow-x: auto;
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </section>
  );
}