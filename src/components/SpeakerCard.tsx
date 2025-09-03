"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Expand, Minimize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SpeakerCardProps {
  className?: string;
}

export default function SpeakerCard({ className }: SpeakerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-2xl bg-card/70 backdrop-blur-md border border-white/20 shadow-xl ${className}`}
    >
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Area - Speaker Info */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Portrait */}
            <div className="relative mb-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-muted border-4 border-white/20 shadow-lg">
                {!imageError ? (
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
                    alt="Yadali Rishitha - Career Coach & AI Resume Strategist"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-orange-100 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-semibold text-primary">YR</span>
                  </div>
                )}
              </div>
            </div>

            {/* Name & Title */}
            <div className="mb-4">
              <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-1">
                Yadali Rishitha
              </h3>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                Career Coach & AI Resume Strategist
              </p>
            </div>

            {/* Credential Badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <Badge variant="secondary" className="text-xs font-medium">
                2000+ Clients Coached
              </Badge>
              <Badge variant="secondary" className="text-xs font-medium">
                95% Success Rate
              </Badge>
            </div>
          </div>

          {/* Right Area - Bio */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                Meet Your Speaker
              </h4>
              
              <div className="relative">
                <motion.div
                  animate={{ height: isExpanded ? "auto" : "auto" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className={`text-sm md:text-base text-foreground/80 leading-relaxed ${
                    !isExpanded ? "line-clamp-2 md:line-clamp-none" : ""
                  }`}>
                    In career coaching and AI technology, Yadali Rishitha has helped 2,000+ professionals land their dream jobs at top companies including Google, Microsoft, and Amazon.As a former recruiter and current AI specialist, brings unique insights into what employers really want and how to leverage technology for job search success.
                  </p>
                  
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: isExpanded ? 1 : 0, 
                      height: isExpanded ? "auto" : 0 
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm md:text-base text-foreground/80 leading-relaxed mt-4">
                      Her unique approach combines traditional career coaching principles with modern AI technologies, 
                      helping clients achieve a 95% interview callback rate. During this exclusive webinar, she'll 
                      share her proven methodologies and insider secrets that have helped professionals land positions 
                      at top-tier companies worldwide.
                    </p>
                  </motion.div>
                </motion.div>

                {/* Read More Button - Only show on mobile */}
                <button
                  onClick={toggleExpanded}
                  className="md:hidden mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? "Show less about the speaker" : "Read more about the speaker"}
                >
                  <span>{isExpanded ? "Show Less" : "Read More"}</span>
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Expand className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glassmorphism overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 pointer-events-none rounded-2xl" />
    </motion.div>
  );
}