'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js navigation
import { ChefHat, Utensils, Pizza, Coffee, Soup } from 'lucide-react';
import LetterAnimate from '@/components/LetterAnimate/LetterAnimate';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const [activeIcon, setActiveIcon] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); // Next.js router

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cookingIcons = [
    <ChefHat key="chef-hat" className="w-12 h-12 text-white" />,
    <Utensils key="utensils" className="w-12 h-12 text-white" />,
    <Pizza key="pizza" className="w-12 h-12 text-white" />,
    <Coffee key="coffee" className="w-12 h-12 text-white" />,
    <Soup key="soup" className="w-12 h-12 text-white" />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon(prev => (prev + 1) % cookingIcons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = e => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => setIsHovering(true));
      container.addEventListener('mouseleave', () => setIsHovering(false));
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', () => setIsHovering(true));
        container.removeEventListener('mouseleave', () => setIsHovering(false));
      }
    };
  }, []);

  const text = 'CookbotAI';
  const letters = text.split('');

  const generateRandomDots = () => {
    if (!isClient) return [];

    return Array.from({ length: 100 }).map((_, i) => {
      const width = Math.random() * 3 + 1;
      const height = Math.random() * 3 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.1;
      const duration = Math.random() * 5 + 5;

      return (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            top: `${top}%`,
            left: `${left}%`,
            opacity: opacity,
            animation: `twinkle ${duration}s infinite`,
          }}
        />
      );
    });
  };

  // Navigate to prompt page on button click
  const handleGetStartedClick = () => {
    router.push('/prompt');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 opacity-30">{generateRandomDots()}</div>

      <div className="z-10 text-center">
        <div className="flex items-center justify-center mb-6 relative h-16">
          {cookingIcons.map((icon, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-500 transform ${
                index === activeIcon
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-75'
              }`}
              style={{
                animation:
                  index === activeIcon
                    ? 'float 3s ease-in-out infinite'
                    : 'none',
              }}
            >
              {icon}
            </div>
          ))}
        </div>

        <div
          ref={containerRef}
          className="relative cursor-default select-none px-4 py-8"
        >
          <div className="flex justify-center items-center">
            {letters?.map((letter, index) => (
              <LetterAnimate
                key={index}
                index={index}
                letter={letter}
                isHovering={isHovering}
                mousePosition={mousePosition}
                containerRef={containerRef}
              />
            ))}
          </div>
        </div>

        <p className="text-gray-400 mt-6 max-w-md mx-auto text-lg">
          Your intelligent cooking assistant powered by artificial intelligence
        </p>

        <div className="mt-10">
          <button
            onClick={handleGetStartedClick}
            className="px-8 py-3 bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 relative group overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
