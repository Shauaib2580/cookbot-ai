'use client';

import React, { useRef, useEffect, useState } from 'react';

const LetterAnimate = ({
  index,
  containerRef,
  mousePosition,
  isHovering,
  letter,
}) => {
  const letterRef = useRef(null);
  const [letterPos, setLetterPos] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (letterRef.current) {
      const rect = letterRef.current.getBoundingClientRect();
      const containerRect = containerRef?.current?.getBoundingClientRect() || {
        left: 0,
        top: 0,
      };
      setLetterPos({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [letterRef, containerRef]);

  const dx = mousePosition.x - letterPos.x;
  const dy = mousePosition.y - letterPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const maxDistance = 150;
  const intensity = isHovering ? Math.max(0, 1 - distance / maxDistance) : 0;
  const hue = (index * 30) % 360;

  return (
    <div key={index} ref={letterRef} className="relative">
      {isHovering && (
        <div
          className="absolute blur-md rounded-full transition-all duration-200"
          style={{
            background: `radial-gradient(circle, hsla(${hue}, 100%, 60%, ${intensity}) 0%, hsla(${hue}, 100%, 60%, 0) 70%)`,
            width: `${letterPos.width * 2}px`,
            height: `${letterPos.height * 2}px`,
            left: `${-letterPos.width / 2}px`,
            top: `${-letterPos.height / 2}px`,
            opacity: intensity,
            transform: `scale(${1 + intensity * 0.5})`,
          }}
        ></div>
      )}
      <span
        className={`text-6xl md:text-8xl font-bold tracking-tighter transition-all duration-200 ${
          isHovering ? 'text-white' : 'text-gray-200'
        }`}
        style={{
          textShadow: isHovering
            ? `0 0 5px hsla(${hue}, 100%, 60%, ${intensity}), 
                           0 0 10px hsla(${hue}, 100%, 60%, ${intensity}), 
                           0 0 15px hsla(${hue}, 100%, 60%, ${intensity * 0.8})`
            : 'none',
          color: isHovering
            ? `hsla(${hue}, 100%, ${80 + intensity * 20}%, 1)`
            : undefined,
        }}
      >
        {letter}
      </span>
    </div>
  );
};

export default LetterAnimate;
