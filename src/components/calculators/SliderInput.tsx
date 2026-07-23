'use client';

import React, { useState } from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  formatValue?: (value: number) => string;
}

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit = '',
  formatValue,
}: SliderInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const displayValue = formatValue ? formatValue(value) : value;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline mb-3">
        <label 
          className="text-sm font-medium"
          style={{ 
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {label}
        </label>
        <span 
          className="text-2xl font-bold tabular-nums"
          style={{ 
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {displayValue}
          <span className="text-base font-medium ml-1" style={{ color: 'var(--color-text-tertiary)' }}>
            {unit}
          </span>
        </span>
      </div>
      
      <div className="relative py-2">
        {/* Track Background */}
        <div 
          className="h-1.5 relative"
          style={{
            background: '#e5e7eb',
          }}
        >
          {/* Progress Fill */}
          <div
            className="absolute top-0 left-0 h-full transition-all duration-150"
            style={{
              width: `${percentage}%`,
              background: 'linear-gradient(90deg, #c2410c, #d97706)',
            }}
          />
        </div>
        
        {/* Invisible Native Slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 20 }}
        />
        
        {/* Custom Thumb */}
        <div
          className="absolute top-1/2 pointer-events-none transition-all duration-150"
          style={{
            left: `${percentage}%`,
            transform: `translate(-50%, -50%) scale(${isDragging ? 1.2 : 1})`,
            zIndex: 10,
          }}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{
              background: 'white',
              boxShadow: isDragging
                ? '0 0 0 4px rgba(194, 65, 12, 0.2), 0 2px 8px rgba(0, 0, 0, 0.25)'
                : '0 0 0 2px white, 0 0 0 3px #c2410c, 0 2px 4px rgba(0, 0, 0, 0.15)',
            }}
          />
        </div>
      </div>
      
      <div 
        className="flex justify-between text-xs mt-1"
        style={{ 
          color: 'var(--color-text-tertiary)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <span>{formatValue ? formatValue(min) : min}{unit && ` ${unit}`}</span>
        <span>{formatValue ? formatValue(max) : max}{unit && ` ${unit}`}</span>
      </div>
    </div>
  );
}
