"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Logo from './Logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform scroll position to header height for shrinking effect
  const headerHeight = useTransform(scrollY, [0, 100], ['80px', '64px']);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm"
      style={{ height: headerHeight }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo Section */}
        <motion.button
          onClick={scrollToTop}
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg p-1"
          style={{ scale: logoScale }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="PrimoBoostAI - Go to top"
        >
          <div className="flex items-center gap-3">
            <Image
              src="https://res.cloudinary.com/dlkovvlud/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1751536902/a-modern-logo-design-featuring-primoboos_XhhkS8E_Q5iOwxbAXB4CqQ_HnpCsJn4S1yrhb826jmMDw_nmycqj.jpg"
              alt="PrimoBoostAI Logo"
              width={32}
              height={32}
              priority
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-heading font-bold text-lg text-foreground">
              PrimoBoostAI
            </span>
          </div>
        </motion.button>

        {/* Desktop Event Info */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span 
              className="text-sm font-medium text-foreground"
              aria-label="Webinar date September 7, 2025"
            >
              Sep 7, 2025
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span 
              className="text-sm font-medium text-foreground"
              aria-label="Webinar time 6:00 PM Indian Standard Time"
            >
              6:00 PM IST
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      onClick={() => scrollToSection('features')}
                    >
                      <div className="text-sm font-medium leading-none">Learning Outcomes</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Discover what you'll learn in this comprehensive webinar
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      onClick={() => scrollToSection('video')}
                    >
                      <div className="text-sm font-medium leading-none">Video Preview</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Watch the teaser to see what's in store
                      </p>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => scrollToSection('speaker')}
                >
                  Speaker
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => scrollToSection('registration')}
                >
                  Register
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Event Info */}
        <div className="md:hidden flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1.5">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-foreground leading-tight">
                Sep 7
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                6 PM IST
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9 rounded-full hover:bg-white/60"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Open menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('features')}
                className="text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('speaker')}
                className="text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Speaker
              </button>
              <button
                onClick={() => scrollToSection('registration')}
                className="text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Register
              </button>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-white/20">
                <span className="text-muted-foreground">Event Details:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Sep 7, 2025 • 6:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
