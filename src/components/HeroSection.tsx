'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronRight, Calendar, Clock, Users } from 'lucide-react';
import { useScroll, motion } from 'motion/react';

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  const scrollToRegistration = React.useCallback(() => {
    const registrationElement = document.getElementById('registration');
    if (registrationElement) {
      registrationElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <HeroHeader />
      <main className="overflow-x-hidden">
        <section className="bg-black">
          <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72">
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                {/* Grant/Badge Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
                    <span className="text-white text-sm font-medium">Free Live Webinar</span>
                  </div>
                </motion.div>

                <h1 className="mt-8 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl text-white">
                  Crack Your Dream Job with{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-orange-500 bg-clip-text text-transparent">
                    PrimoBoost AI
                  </span>
                </h1>
                <p className="mt-8 max-w-2xl text-balance text-lg text-gray-300">
                Join us on September 7 to learn resume building, job application strategies, and AI-driven tools to get hired faster.
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button
                    onClick={scrollToRegistration}
                    size="lg"
                    className="h-12 rounded-full pl-5 pr-3 text-base bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 text-black font-semibold">
                    <span className="text-nowrap">Reserve Free Seat</span>
                    <ChevronRight className="ml-1" />
                  </Button>
                  
                </div>

                {/* Event Details */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
                  <div className="text-center lg:text-left space-y-2">
                    <Calendar className="w-6 h-6 text-cyan-400 mx-auto lg:mx-0" />
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="font-semibold text-white">Sep 7, 2025</p>
                  </div>
                  
                  <div className="text-center lg:text-left space-y-2">
                    <Clock className="w-6 h-6 text-cyan-400 mx-auto lg:mx-0" />
                    <p className="text-gray-400 text-sm">Time</p>
                    <p className="font-semibold text-white">6:00 PM IST</p>
                  </div>
                  
                  <div className="text-center lg:text-left space-y-2">
                    <Users className="w-6 h-6 text-orange-400 mx-auto lg:mx-0" />
                    <p className="text-gray-400 text-sm">Seats</p>
                    <p className="font-semibold text-white">Limited</p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center lg:text-left space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mx-auto lg:mx-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg"></div>
                    </div>
                    <h4 className="text-xl font-semibold text-white">Resume Building</h4>
                    <p className="text-gray-400 text-sm">AI-powered resume optimization for maximum ATS compatibility.</p>
                  </div>
                  
                  <div className="text-center lg:text-left space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto lg:mx-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg"></div>
                    </div>
                    <h4 className="text-xl font-semibold text-white">Job Application Strategies</h4>
                    <p className="text-gray-400 text-sm">Proven tactics to stand out in competitive job markets.</p>
                  </div>
                  
                  <div className="text-center lg:text-left space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-2xl flex items-center justify-center mx-auto lg:mx-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg"></div>
                    </div>
                    <h4 className="text-xl font-semibold text-white">AI-Driven Tools</h4>
                    <p className="text-gray-400 text-sm">Cutting-edge AI tools to automate your job search process.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-white/10 sm:aspect-video lg:rounded-[3rem]">
              <video
                autoPlay
                loop
                muted
                className="size-full object-cover opacity-30">
                <source src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
        <section className="bg-black pb-2">
          <div className="group relative m-auto max-w-7xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:border-white/20 md:pr-6">
                  
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider
                  duration={40}
                  gap={112}>
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit invert"
                      src="https://html.tailus.io/blocks/customers/nvidia.svg"
                      alt="Nvidia Logo"
                      height="20"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-4 w-fit invert"
                      src="https://html.tailus.io/blocks/customers/column.svg"
                      alt="Column Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-4 w-fit invert"
                      src="https://html.tailus.io/blocks/customers/github.svg"
                      alt="GitHub Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit invert"
                      src="https://html.tailus.io/blocks/customers/nike.svg"
                      alt="Nike Logo"
                      height="20"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit invert"
                      src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                      alt="Lemon Squeezy Logo"
                      height="20"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-4 w-fit invert"
                      src="https://html.tailus.io/blocks/customers/laravel.svg"
                      alt="Laravel Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-7 w-fit invert"
                      src="https://html.tailus.io/blocks/customers/lilly.svg"
                      alt="Lilly Logo"
                      height="28"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-6 w-fit invert"
                      src="https://html.tailus.io/blocks/customers/openai.svg"
                      alt="OpenAI Logo"
                      height="24"
                      width="auto"
                    />
                  </div>
                </InfiniteSlider>

                <div className="bg-gradient-to-r from-black absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-gradient-to-l from-black absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const menuItems = [
  { name: 'Features', href: '#features' },
  { name: 'Speaker', href: '#speaker' },
  { name: 'Register', href: '#registration' },
  { name: 'About', href: '#about' },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="group fixed z-20 w-full pt-2">
        <div className={cn('mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12', scrolled && 'bg-black/80 backdrop-blur-2xl border border-white/10')}>
          <motion.div
            key={1}
            className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6', scrolled && 'lg:py-4')}>
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2">
                <PrimoBoostLogo />
              </Link>

              {/* Webinar Date & Time - Desktop Only */}
              <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Sep 7, 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>6:00 PM IST</span>
                </div>
              </div>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200 text-white" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 text-white" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-gray-400 hover:text-white block duration-150">
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-black/90 group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/20 p-6 shadow-2xl shadow-black/50 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-gray-400 hover:text-white block duration-150">
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                
                {/* Mobile Date & Time */}
                <div className="mt-6 pt-6 border-t border-white/20 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Sep 7, 2025</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>6:00 PM IST</span>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  onClick={() => {
                    const registrationElement = document.getElementById('registration');
                    if (registrationElement) {
                      registrationElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 text-black font-semibold">
                  <span>Register Free</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};

const PrimoBoostLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-lg flex items-center justify-center">
        <span className="text-black font-bold text-sm">P</span>
      </div>
      <span className="text-xl font-bold text-white">PrimoBoost AI</span>
    </div>
  );
};