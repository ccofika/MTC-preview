import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';

interface SimpleLoadingScreenProps {
  brandName: string;
  tagline: string;
}

export const SimpleLoadingScreen: React.FC<SimpleLoadingScreenProps> = ({ 
  brandName, 
  tagline 
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // Animation timing - simple and elegant
  const logoAppearStart = 15;
  const textAppearStart = 45;
  const zoomStart = 75;
  const fadeOutStart = 105;

  // Logo scale animation with ease-in-out
  const logoScale = interpolate(
    frame,
    [logoAppearStart, logoAppearStart + 25],
    [0.8, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Logo opacity with gentle fade-in
  const logoOpacity = interpolate(
    frame,
    [logoAppearStart, logoAppearStart + 20],
    [0, 1],
    {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Text appearance with slight delay
  const textOpacity = interpolate(
    frame,
    [textAppearStart, textAppearStart + 20],
    [0, 1],
    {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const textTranslateY = interpolate(
    frame,
    [textAppearStart, textAppearStart + 20],
    [20, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Subtle zoom effect before transition
  const globalScale = interpolate(
    frame,
    [zoomStart, zoomStart + 25],
    [1, 1.05],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Final fade out
  const globalOpacity = interpolate(
    frame,
    [fadeOutStart, durationInFrames],
    [1, 0],
    {
      easing: Easing.in(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Subtle breathing effect for logo
  const breathingScale = 1 + Math.sin(frame * 0.05) * 0.01;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif',
        position: 'relative',
        opacity: globalOpacity,
        transform: `scale(${globalScale})`,
      }}
    >
      {/* Subtle gradient background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
        }}
      />

      {/* Company logo/icon */}
      <div
        style={{
          marginBottom: `${height * 0.04}px`,
          opacity: logoOpacity,
          transform: `scale(${logoScale * breathingScale})`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Modern minimalist logo design */}
        <svg
          width={Math.min(width * 0.08, height * 0.12)}
          height={Math.min(width * 0.08, height * 0.12)}
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#da5913" />
              <stop offset="100%" stopColor="#ff7a3d" />
            </linearGradient>
          </defs>
          
          {/* Clean geometric logo representing aluminum systems */}
          <rect 
            x="20" 
            y="30" 
            width="60" 
            height="8" 
            rx="4" 
            fill="url(#logoGradient)"
          />
          <rect 
            x="15" 
            y="45" 
            width="70" 
            height="6" 
            rx="3" 
            fill="url(#logoGradient)"
            opacity="0.8"
          />
          <rect 
            x="25" 
            y="58" 
            width="50" 
            height="4" 
            rx="2" 
            fill="url(#logoGradient)"
            opacity="0.6"
          />
          
          {/* Connection points */}
          <circle cx="20" cy="34" r="3" fill="#da5913" />
          <circle cx="80" cy="34" r="3" fill="#da5913" />
          <circle cx="15" cy="48" r="2.5" fill="#da5913" opacity="0.8" />
          <circle cx="85" cy="48" r="2.5" fill="#da5913" opacity="0.8" />
        </svg>
      </div>

      {/* Brand name */}
      <h1
        style={{
          fontSize: `${Math.min(width * 0.04, height * 0.08)}px`,
          fontWeight: '700',
          color: '#1e293b',
          margin: '0',
          letterSpacing: `${width * 0.002}px`,
          opacity: textOpacity,
          transform: `translateY(${textTranslateY}px)`,
        }}
      >
        {brandName}
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontSize: `${Math.min(width * 0.015, height * 0.025)}px`,
          fontWeight: '400',
          color: '#64748b',
          margin: `${height * 0.015}px 0 0 0`,
          letterSpacing: `${width * 0.001}px`,
          opacity: textOpacity * 0.8,
          transform: `translateY(${textTranslateY}px)`,
        }}
      >
        {tagline}
      </p>

      {/* Loading indicator - subtle animated line */}
      <div
        style={{
          position: 'absolute',
          bottom: `${height * 0.12}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${width * 0.2}px`,
          height: '2px',
          backgroundColor: '#e2e8f0',
          borderRadius: '1px',
          overflow: 'hidden',
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            width: '30%',
            height: '100%',
            backgroundColor: '#da5913',
            borderRadius: '1px',
            transform: `translateX(${interpolate(
              frame % 60,
              [0, 60],
              [-100, 250],
              {
                easing: Easing.inOut(Easing.cubic),
              }
            )}%)`,
          }}
        />
      </div>
    </div>
  );
};