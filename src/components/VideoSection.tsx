import React from 'react';

interface VideoSectionProps {
  className?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ className = '' }) => {
  return (
    <section id="video" className={`py-16 sm:py-24 relative overflow-hidden ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-slate-100" />

      {/* Decorative blurred blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-cyan-300/30 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-orange-300/30 blur-3xl rounded-full" />

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-500 via-indigo-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Watch the Teaser
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Get a quick preview of what you'll learn in the free live webinar.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Glow behind card */}
          <div className="absolute inset-0 -inset-x-8 -inset-y-8 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-orange-400/20 blur-2xl rounded-[2rem]" />

          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl ring-1 ring-black/5 p-4 sm:p-8">
            {/* Video Container - 16:9 Aspect Ratio */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
              {/* Soft inner glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

              {/* Actual video embed */}
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/stRv-JuuR-k" 
                title="Webinar Teaser"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm font-light">
                Duration: 51 seconds • Preview of full 2-hour masterclass
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
