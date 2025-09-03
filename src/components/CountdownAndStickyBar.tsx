"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock2, Timer, Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const TARGET_DATE = new Date("September 7, 2025 18:00:00 GMT+0530");

export default function CountdownAndStickyBar() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date().getTime();
    const targetTime = TARGET_DATE.getTime();
    const difference = targetTime - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        total: difference,
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }, []);

  const scrollToRegistration = () => {
    if (typeof window !== "undefined") {
      const element = document.getElementById("registration");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Initialize component
  useEffect(() => {
    setMounted(true);
    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);
  }, [calculateTimeLeft]);

  // Timer effect and scroll listener
  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    // Scroll listener to show the bar
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mounted, calculateTimeLeft]);

  if (!mounted) {
    return null;
  }

  const isExpired = timeLeft.total <= 0;

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="relative">
      {/* Main Countdown Section */}
      <section className="py-8 md:py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-6 md:mb-12"
          >
            <h2 className="text-xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-4">
              {isExpired ? "Registration Closed" : "Limited Seats – Register Before It's Too Late!"}
            </h2>
            <p className="text-sm md:text-xl text-gray-600 max-w-2xl mx-auto">
              {isExpired 
                ? "We're sorry, but registration for this webinar has ended."
                : "Don't miss out on this exclusive opportunity. Secure your free seat now!"
              }
            </p>
          </motion.div>

          {!isExpired && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 md:p-10 shadow-lg"
            >
              <div 
                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8"
                role="timer"
                aria-live="polite"
                aria-label={`Time remaining: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
              >
                <CountdownUnit
                  value={timeLeft.days}
                  label="Days"
                  icon={Calendar}
                />
                <CountdownUnit
                  value={timeLeft.hours}
                  label="Hours"
                  icon={Clock2}
                />
                <CountdownUnit
                  value={timeLeft.minutes}
                  label="Minutes"
                  icon={Timer}
                />
                <CountdownUnit
                  value={timeLeft.seconds}
                  label="Seconds"
                  icon={Timer}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-4 md:mt-8 text-center"
              >
                <button
                  onClick={scrollToRegistration}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-orange-500 text-white px-5 py-2.5 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  Reserve Free Seat
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Sticky Bottom Bar - Scroll-based visibility */}
      {isVisible && !isExpired && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-full duration-500">
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg rounded-t-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between gap-4">
                {/* Left Side: Countdown Timer */}
                <div className="flex items-center gap-4 text-gray-900">
                  <div className="hidden sm:flex items-center gap-2">
                    <Clock className="w-5 h-5 text-cyan-500" />
                    <span className="font-light text-sm text-gray-600">Webinar starts in:</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono tracking-wider">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-semibold text-gray-900">{formatTime(timeLeft.days)}</span>
                      <span className="text-[10px] font-light text-gray-500">DD</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-400 -translate-y-1.5">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-semibold text-gray-900">{formatTime(timeLeft.hours)}</span>
                      <span className="text-[10px] font-light text-gray-500">HH</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-400 -translate-y-1.5">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-semibold text-gray-900">{formatTime(timeLeft.minutes)}</span>
                      <span className="text-[10px] font-light text-gray-500">MM</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-400 -translate-y-1.5">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-semibold text-gray-900">{formatTime(timeLeft.seconds)}</span>
                      <span className="text-[10px] font-light text-gray-500">SS</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: CTA Button */}
                <div>
                  <button
                    onClick={scrollToRegistration}
                    className="bg-gradient-to-r from-cyan-500 to-orange-500 text-white font-medium py-2.5 px-5 sm:py-3 sm:px-6 rounded-full text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:from-cyan-600 hover:to-orange-600 focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
                  >
                    Reserve Free Seat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface CountdownUnitProps {
  value: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

function CountdownUnit({ value, label, icon: Icon }: CountdownUnitProps) {
  return (
    <div className="text-center">
      <motion.div
        key={value}
        initial={{ scale: 1.05, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="relative mb-2 md:mb-3"
      >
        <div className="bg-gradient-to-br from-cyan-50 to-orange-50 border border-gray-200 rounded-xl p-3 md:p-6">
          <div className="flex items-center justify-center mb-1 md:mb-2">
            <Icon className="w-4 h-4 md:w-6 md:h-6 text-cyan-500" />
          </div>
          <div className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-orange-600 bg-clip-text text-transparent">
            {value.toString().padStart(2, "0")}
          </div>
        </div>
      </motion.div>
      <div className="text-xs md:text-base font-medium text-gray-600 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}