import HeroSection from '@/components/HeroSection';
import VideoSection from '@/components/VideoSection';
import LearningAndFeatures from '@/components/LearningAndFeatures';
import SpeakerCard from '@/components/SpeakerCard';
import RegistrationForm from '@/components/RegistrationForm';
import SocialProofMarquee from '@/components/SocialProofMarquee';
import CountdownAndStickyBar from '@/components/CountdownAndStickyBar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Main Content Flow */}
      <main className="relative">
        {/* Hero Section - Full viewport height without header padding */}
        <div className="pt-0">
          <HeroSection className="bg-gradient-to-br from-slate-900 to-slate-800" />
        </div>
        
        {/* Content Sections - Consistent max-width and spacing */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Video Teaser Section */}
          <VideoSection className="py-16" />
          
          {/* Learning & Features Combined Block */}
          <section id="features" className="py-16">
            <LearningAndFeatures />
          </section>
          
          {/* Speaker Introduction */}
          <section id="speaker" className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold bg-gradient-to-r from-cyan-400 to-orange-500 bg-clip-text text-transparent mb-4">
                Meet Your Expert
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn from an industry leader with proven success in career transformation.
              </p>
            </div>
            <SpeakerCard />
          </section>
          
          {/* Countdown Section with Sticky Bar - Above Registration Form */}
          <CountdownAndStickyBar />
          
          {/* Registration Form - Anchor target */}
          <section id="registration">
            <RegistrationForm />
          </section>
          
          {/* Social Proof */}
          <SocialProofMarquee />
        </div>
        
        {/* Footer */}
        <Footer />
      </main>
      
      
    </div>
  );
}