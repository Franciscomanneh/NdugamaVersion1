'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Store, Truck, ShoppingBag, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Onboarding: React.FC = () => {
  const [show, setShow] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('dugama_onboarding_seen');
    if (!hasSeenOnboarding) {
      setShow(true);
    }
  }, []);

  const slides = [
    {
      title: "Welcome to Dugama",
      text: "Fresh market shopping made easy in your community.",
      icon: <Store size={80} className="text-primary" />,
      color: "bg-green-50"
    },
    {
      title: "Support Local Women & Gardeners",
      text: "Buy from local markets and support women-led community delivery.",
      icon: <Sparkles size={80} className="text-orange-500" />,
      color: "bg-orange-50"
    },
    {
      title: "Order From Anywhere",
      text: "Browse products, bundles, and track deliveries directly from your phone.",
      icon: <Truck size={80} className="text-blue-500" />,
      color: "bg-blue-50"
    }
  ];

  const handleFinish = () => {
    localStorage.setItem('dugama_onboarding_seen', 'true');
    setShow(false);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleFinish();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center"
          >
            <div className={cn("w-64 h-64 rounded-full flex items-center justify-center mb-12", slides[currentSlide].color)}>
              {slides[currentSlide].icon}
            </div>
            <h2 className="text-3xl font-black text-gray-800 mb-4 leading-tight">
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xs">
              {slides[currentSlide].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-10 flex flex-col gap-6">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === currentSlide ? "w-8 bg-primary" : "w-2 bg-gray-200"
              )}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleNext}
            className="w-full py-5 bg-primary text-white rounded-3xl font-black shadow-xl shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Continue"}
            <ChevronRight size={20} />
          </button>

          <button
            onClick={handleFinish}
            className="w-full py-4 text-gray-400 font-bold active:scale-95 transition-transform"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};
