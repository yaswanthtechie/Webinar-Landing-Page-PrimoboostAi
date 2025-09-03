"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface LearningItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  expandedContent?: string;
}

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  expandedContent?: string;
}

const learningItems: LearningItem[] = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Build an ATS-Friendly Resume",
    description: "Master the art of creating AI-powered resumes that pass through applicant tracking systems and capture recruiter attention..",
    expandedContent: "Learn proven frameworks to craft ATS-friendly resumes, optimize keyword usage, and structure content that passes automated screenings and reaches recruiters effectively."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Land Interviews Faster",
    description: "Discover proven techniques and strategic approaches to significantly increase your interview callback rate.",
    expandedContent: "Master strategies to tailor your applications, optimize your resume, and leverage AI-driven insights that significantly increase your chances of landing interviews quickly."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Optimize Your LinkedIn Profile",
    description: "Transform your LinkedIn presence to attract top recruiters and unlock hidden opportunities.",
    expandedContent: "Make your LinkedIn profile recruiter-ready and impactful."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
      </svg>
    ),
    title: "Master Top Company Applications",
    description: "Get insider knowledge on how to tailor your applications for leading firms and stand out from the competition.",
    expandedContent: "Learn strategies to apply smartly, stand out, and secure interviews at leading companies."
  }
];

const featureItems: FeatureItem[] = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "JD Resume Optimizer",
    description: "AI-powered tool that tailors your resume to specific job descriptions.",
    expandedContent: "Our JD Resume Optimizer tailors your resume to match specific job descriptions, enhancing keyword alignment, improving ATS compatibility, and boosting your chances of shortlisting."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "ATS Checker",
    description: "Comprehensive analysis to ensure your resume passes applicant tracking systems.",
    expandedContent: "Our ATS Checker provides real-time recommendations by analyzing your resume against applicant tracking systems, ensuring keyword alignment, formatting compliance."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    title: "Guided Builder",
    description: "Step-by-step resume creation with professional templates and suggestions.",
    expandedContent: "Our Guided Builder uses AI-driven insights to walk you step by step through resume creation, helping you structure content, highlight strengths, and align with recruiter expectations."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "LinkedIn Generator",
    description: "Automated profile optimization to enhance your professional online presence.",
    expandedContent: "Creates optimized, recruiter-ready LinkedIn profiles by highlighting your skills, experience, and achievements to boost visibility and professional credibility."
  }
];

export default function LearningAndFeatures() {
  const [expandedLearning, setExpandedLearning] = useState<number | null>(null);
  const [expandedFeatures, setExpandedFeatures] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLearningExpansion = (index: number) => {
    setExpandedLearning(expandedLearning === index ? null : index);
  };

  const toggleFeaturesExpansion = (index: number) => {
    setExpandedFeatures(expandedFeatures === index ? null : index);
  };

  return (
    <div
      className="w-full py-16 px-4 relative overflow-hidden"
      style={{
        backgroundImage: "url(/learn-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Soft overlay to maintain text readability */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-white/60" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* What You'll Learn Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              What You'll Learn
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive curriculum designed to transform your job search with essential skills and strategies..
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {learningItems.map((item, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-card/40 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                tabIndex={0}
                role="button"
                aria-expanded={expandedLearning === index}
                aria-describedby={`learning-description-${index}`}
                onClick={() => toggleLearningExpansion(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleLearningExpansion(index);
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-accent/20 text-accent-foreground group-hover:bg-accent/30 transition-colors duration-300">
                      {isLoading ? (
                        <div className="w-6 h-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        item.icon
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-accent-foreground transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p id={`learning-description-${index}`} className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      
                      {expandedLearning === index && item.expandedContent && (
                        <div className="mt-4 pt-4 border-t border-white/10 animate-accordion-down">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.expandedContent}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0 ml-2">
                      {expandedLearning === index ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* PrimoBoost AI Features Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold bg-gradient-to-r from-cyan-400 to-orange-500 bg-clip-text text-transparent">
              PrimoBoost AI Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful AI-driven tools to accelerate your job search and career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {featureItems.map((item, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-card/40 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  index === 1 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                tabIndex={0}
                role="button"
                aria-expanded={expandedFeatures === index}
                aria-describedby={`features-description-${index}`}
                onClick={() => toggleFeaturesExpansion(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFeaturesExpansion(index);
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-chart-3/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-chart-3/20 text-foreground group-hover:bg-chart-3/30 transition-colors duration-300">
                      {isLoading ? (
                        <div className="w-6 h-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        item.icon
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-foreground transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p id={`features-description-${index}`} className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      
                      {expandedFeatures === index && item.expandedContent && (
                        <div className="mt-4 pt-4 border-t border-white/10 animate-accordion-down">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.expandedContent}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0 ml-2">
                      {expandedFeatures === index ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-chart-3/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}