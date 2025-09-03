"use client";

import Link from "next/link";
import { Linkedin, Facebook } from "lucide-react";
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-card/70 backdrop-blur-md border-t border-border/50 shadow-lg">
      {/* Subtle top accent border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />
      
      <div className="container max-w-6xl mx-auto px-6 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left: Brand and tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <Logo size="md" />
              <h3 className="text-xl font-heading font-bold text-foreground">
                PrimoBoostAI 
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
              Transforming knowledge into actionable insights through experts
            </p>
          </div>

          {/* Center: Navigation links */}
          <nav className="text-center" aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6 text-sm">
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/schedule" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right: Social media icons */}
          <div className="flex justify-center md:justify-end gap-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Follow us on Twitter"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Connect with us on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Follow us on Instagram"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348V9.362c0-1.297 1.051-2.348 2.348-2.348h7.102c1.297 0 2.348 1.051 2.348 2.348v5.277c0 1.297-1.051 2.348-2.348 2.348H8.449z" />
                <path fillRule="evenodd" d="M12 16c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm0-6c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2z" />
                <circle cx="16.5" cy="7.5" r="1" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom row: Copyright and legal links */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()} WebinarPro. All rights reserved.
            </p>
            
            <div className="flex gap-4">
              <Link 
                href="/terms" 
                className="hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1"
              >
                Terms of Service
              </Link>
              <span className="text-border">•</span>
              <Link 
                href="/cookies" 
                className="hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}