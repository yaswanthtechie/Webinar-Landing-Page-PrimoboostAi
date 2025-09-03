"use client";

import { cn } from "@/lib/utils";
import { useMotionValue, animate, motion } from "framer-motion";
import { useState, useEffect } from "react";
import useMeasure from "react-use-measure";

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
}

export const InfiniteSlider = ({
  children,
  gap = 16,
  duration = 25,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) => {
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  const isHorizontal = direction === "horizontal";
  const size = isHorizontal ? width : height;
  const directionSign = reverse ? -1 : 1;

  useEffect(() => {
    const finalPosition = directionSign * -size / 2;

    if (size > 0) {
      setIsTransitioning(true);
      const controls = animate(translation, [translation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - (translation.get() / finalPosition)),
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onComplete: () => {
          setIsTransitioning(false);
        },
      });

      return controls.stop;
    }
  }, [size, translation, duration, directionSign]);

  const handleHoverStart = () => {
    if (isTransitioning) {
      translation.stop();
    }
  };

  const handleHoverEnd = () => {
    if (!isTransitioning) {
      const finalPosition = directionSign * -size / 2;
      const controls = animate(translation, finalPosition, {
        ease: "linear",
        duration: duration * (1 - (translation.get() / finalPosition)),
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });

      return controls.stop;
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        isHorizontal ? "w-full" : "h-full",
        className
      )}
    >
      <motion.div
        key={key}
        ref={ref}
        style={{
          ...(isHorizontal ? { x: translation } : { y: translation }),
          gap,
        }}
        className={cn(
          "flex",
          isHorizontal
            ? "flex-row items-center"
            : "flex-col justify-center"
        )}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};