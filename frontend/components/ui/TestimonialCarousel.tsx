"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoRotate?: boolean;
  interval?: number;
}

export function TestimonialCarousel({
  testimonials,
  autoRotate = true,
  interval = 6000,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!autoRotate || shouldReduceMotion) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoRotate, interval, testimonials.length, shouldReduceMotion]);

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  if (testimonials.length === 0) return null;

  return (
    <div className="relative">
      {/* Testimonial Content */}
      <div className="relative min-h-[300px] overflow-hidden rounded-2xl border bg-card p-8 md:p-12">
        <Quote className="absolute left-8 top-8 h-12 w-12 text-primary/20" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.5 }}
            className="relative z-10"
          >
            <blockquote className="mb-6 text-lg leading-relaxed text-foreground md:text-xl">
              {testimonials[current].quote}
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                {testimonials[current].author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonials[current].author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[current].role} · {testimonials[current].company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {testimonials.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {testimonials.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === current
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
