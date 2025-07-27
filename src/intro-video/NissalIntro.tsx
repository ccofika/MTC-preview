import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from 'remotion';

interface NissalIntroProps {
  brandName: string;
  tagline: string;
}

export const NissalIntro: React.FC<NissalIntroProps> = ({ brandName, tagline }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Enhanced animation phases with precise timing
  const particleSystemStart = 0;
  const technicalLinesStart = 15;
  const brandRevealStart = 45;
  const typographyAnimationStart = 60;
  const taglinesLaserStart = 75;
  const techIndicatorsStart = 90;
  const finalTransitionStart = 120;
  const fadeOutStart = 140;

  // Particle system animation with modern physics
  const particleIntensity = spring({
    frame: frame - particleSystemStart,
    fps,
    config: {
      damping: 12,
      stiffness: 200,
      mass: 0.8,
    },
  });

  // Technical blueprint lines animation
  const technicalLinesProgress = spring({
    frame: frame - technicalLinesStart,
    fps,
    config: {
      damping: 20,
      stiffness: 150,
      mass: 1.2,
    },
  });

  // Brand reveal with glow effect
  const brandReveal = spring({
    frame: frame - brandRevealStart,
    fps,
    config: {
      damping: 18,
      stiffness: 200,
      mass: 0.8,
    },
  });

  // Brand glow pulsing effect
  const brandGlow = interpolate(
    Math.sin((frame - brandRevealStart) * 0.15),
    [-1, 1],
    [0.7, 1.2],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Typography reveal animation
  const typographyReveal = spring({
    frame: frame - typographyAnimationStart,
    fps,
    config: {
      damping: 20,
      stiffness: 180,
      mass: 1,
    },
  });

  // Laser drawing effect for tagline
  const laserDrawing = interpolate(
    frame,
    [taglinesLaserStart, taglinesLaserStart + 30],
    [0, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Tech indicators bounce effect
  const techIndicatorsReveal = spring({
    frame: frame - techIndicatorsStart,
    fps,
    config: {
      damping: 12,
      stiffness: 300,
      mass: 0.6,
    },
  });

  // Final transition with cinematic zoom and fade
  const cinematicScale = interpolate(
    frame,
    [finalTransitionStart, finalTransitionStart + 20],
    [1, 1.08],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Automatic transition to homepage
  const homepageTransition = interpolate(
    frame,
    [finalTransitionStart + 15, durationInFrames],
    [0, 1],
    {
      easing: Easing.in(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Global fade out
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

  // Dynamic particle system - 2025 style floating elements
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2 + frame * 0.02;
    const radiusBase = Math.min(width, height) * 0.12;
    const radius = radiusBase + Math.sin(frame * 0.03 + i) * (radiusBase * 0.3);
    const particleLife = Math.max(0, Math.min(1, (frame - particleSystemStart - i * 3) / 30));
    
    return {
      x: Math.cos(angle) * radius * particleIntensity,
      y: Math.sin(angle) * radius * particleIntensity,
      scale: 0.6 + Math.sin(frame * 0.04 + i) * 0.3,
      opacity: particleLife * (1 - particleLife) * 2.5,
      rotation: frame * 2 + i * 15,
      color: `hsl(${210 + Math.sin(frame * 0.02 + i) * 20}, 60%, ${50 + Math.sin(frame * 0.03 + i) * 15}%)`,
    };
  });

  // Technical blueprint lines - drawing from center outward
  const technicalLines = Array.from({ length: 12 }, (_, i) => {
    const lineDelay = i * 0.08;
    const lineProgress = Math.max(0, Math.min(1, (technicalLinesProgress - lineDelay) * 2));
    const angle = (i / 12) * Math.PI * 2;
    const startRadius = width * 0.08; // Keep lines away from center text area
    const endRadius = width * 0.28;
    
    return {
      startX: width / 2 + Math.cos(angle) * startRadius,
      startY: height / 2 + Math.sin(angle) * startRadius,
      endX: width / 2 + Math.cos(angle) * (startRadius + (endRadius - startRadius) * lineProgress),
      endY: height / 2 + Math.sin(angle) * (startRadius + (endRadius - startRadius) * lineProgress),
      opacity: lineProgress,
      strokeWidth: 1.5 + Math.sin(frame * 0.1 + i) * 0.3,
    };
  });

  // Tech indicators data with individual bounce delays
  const techIndicators = [
    { text: 'INNOVATION', delay: 0 },
    { text: 'PRECISION', delay: 0.15 },
    { text: 'QUALITY', delay: 0.3 },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: 'relative',
        opacity: globalOpacity,
        transform: `scale(${cinematicScale})`,
        overflow: 'hidden',
      }}
    >
      {/* Modern gradient background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 25% 25%, rgba(255, 107, 53, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(29, 78, 216, 0.04) 0%, transparent 50%),
            linear-gradient(135deg, rgba(15, 23, 42, 0.2) 0%, transparent 50%, rgba(15, 23, 42, 0.2) 100%)
          `,
          opacity: particleIntensity * 0.8,
        }}
      />

      {/* Animated grid pattern - subtle tech aesthetic */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 107, 53, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 53, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: `${width * 0.05}px ${height * 0.05}px`,
          transform: `translate(${Math.sin(frame * 0.01) * 15}px, ${Math.cos(frame * 0.015) * 10}px)`,
          opacity: technicalLinesProgress * 0.4,
        }}
      />

      {/* Dynamic particle system */}
      {particles.map((particle, i) => (
        <div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: `${6 + particle.scale * 3}px`,
            height: `${6 + particle.scale * 3}px`,
            backgroundColor: particle.color,
            borderRadius: '50%',
            transform: `
              translate(-50%, -50%)
              translate(${particle.x}px, ${particle.y}px)
              rotate(${particle.rotation}deg)
              scale(${particle.scale})
            `,
            opacity: particle.opacity,
            filter: `blur(${(1 - particle.opacity) * 1.5}px)`,
            boxShadow: `0 0 ${particle.scale * 15}px ${particle.color}`,
            willChange: 'transform, opacity',
            zIndex: 1,
          }}
        />
      ))}

      {/* Technical blueprint lines - drawing from center */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <defs>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {technicalLines.map((line, i) => (
          <line
            key={`tech-line-${i}`}
            x1={line.startX}
            y1={line.startY}
            x2={line.endX}
            y2={line.endY}
            stroke="rgba(255, 107, 53, 0.6)"
            strokeWidth={line.strokeWidth}
            opacity={line.opacity}
            filter="url(#lineGlow)"
          />
        ))}
      </svg>

      {/* Central logo formation - positioned higher to avoid line conflicts */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${brandReveal})`,
          opacity: brandReveal,
          zIndex: 10,
        }}
      >
        <svg
          width={width * 0.18}
          height={height * 0.1}
          viewBox="0 0 320 80"
          style={{
            filter: `drop-shadow(0 ${height * 0.008}px ${height * 0.03}px rgba(255, 107, 53, 0.4))`,
          }}
        >
          <defs>
            <linearGradient id="aluminumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="30%" stopColor="#e2e8f0" />
              <stop offset="70%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="50%" stopColor="#ff8f65" />
              <stop offset="100%" stopColor="#ffa726" />
            </linearGradient>
            <filter id="logoGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Compact aluminum framework */}
          <rect x="30" y="25" width={260 * brandReveal} height="5" fill="url(#aluminumGradient)" rx="2.5" />
          <rect x="40" y="35" width={240 * brandReveal} height="4" fill="url(#aluminumGradient)" rx="2" />
          <rect x="50" y="43" width={220 * brandReveal} height="3" fill="url(#aluminumGradient)" rx="1.5" />
          
          {/* Accent elements */}
          <rect x="20" y="18" width={280 * brandReveal} height="3" fill="url(#accentGradient)" rx="1.5" />
          <rect x="60" y="50" width={200 * brandReveal} height="2" fill="url(#accentGradient)" rx="1" />

          {/* Connection nodes */}
          <circle cx="30" cy="27" r="2.5" fill="url(#aluminumGradient)" opacity={brandReveal} filter="url(#logoGlow)" />
          <circle cx="290" cy="27" r="2.5" fill="url(#aluminumGradient)" opacity={brandReveal} filter="url(#logoGlow)" />
          <circle cx="40" cy="37" r="2" fill="url(#accentGradient)" opacity={brandReveal} filter="url(#logoGlow)" />
          <circle cx="280" cy="37" r="2" fill="url(#accentGradient)" opacity={brandReveal} filter="url(#logoGlow)" />
        </svg>
      </div>

      {/* Main brand typography - perfectly centered */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${typographyReveal})`,
          opacity: typographyReveal,
          textAlign: 'center',
          zIndex: 20,
        }}
      >
        {/* NISSAL text with glow and pulsing */}
        <h1
          style={{
            fontSize: `${Math.min(width * 0.12, height * 0.2)}px`,
            fontWeight: '900',
            margin: '0',
            background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: `${-width * 0.006}px`,
            lineHeight: '0.9',
            filter: `drop-shadow(0 0 ${height * 0.025 * brandGlow}px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 ${height * 0.05 * brandGlow}px rgba(255, 107, 53, 0.4))`,
            transform: `perspective(1000px) rotateX(${(1-typographyReveal) * 15}deg) scale(${brandGlow})`,
            transformOrigin: 'center center',
            willChange: 'transform, filter',
          }}
        >
          {brandName}
        </h1>

        {/* Laser-drawn tagline */}
        <p
          style={{
            fontSize: `${Math.min(width * 0.025, height * 0.04)}px`,
            fontWeight: '400',
            color: '#ff6b35',
            margin: `${height * 0.04}px 0 0 0`,
            letterSpacing: `${width * 0.003}px`,
            textTransform: 'uppercase',
            opacity: laserDrawing,
            transform: `translateY(${(1-laserDrawing) * height * 0.02}px)`,
            textShadow: `0 0 ${height * 0.012}px rgba(255, 107, 53, 0.8), 0 0 ${height * 0.025}px rgba(255, 107, 53, 0.4)`,
            willChange: 'transform, opacity',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ display: 'inline-block', clipPath: `inset(0 ${100 - (laserDrawing * 100)}% 0 0)` }}>
            {tagline}
          </span>
        </p>
      </div>

      {/* Tech indicators with bounce effect */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: `${width * 0.03}px`,
          zIndex: 15,
        }}
      >
        {techIndicators.map(({ text, delay }, i) => {
          const indicatorProgress = Math.max(0, Math.min(1, (techIndicatorsReveal - delay) * 1.5));
          const bounceScale = indicatorProgress > 0.8 ? 1 + Math.sin((frame - techIndicatorsStart - delay * fps) * 0.5) * 0.04 : 1;
          
          return (
            <div
              key={text}
              style={{
                padding: `${height * 0.012}px ${width * 0.018}px`,
                background: 'rgba(255, 107, 53, 0.1)',
                border: '2px solid rgba(255, 107, 53, 0.4)',
                borderRadius: `${height * 0.025}px`,
                fontSize: `${Math.min(width * 0.012, height * 0.018)}px`,
                fontWeight: '700',
                color: '#ff6b35',
                letterSpacing: `${width * 0.001}px`,
                transform: `translateY(${(1-indicatorProgress) * height * 0.08}px) scale(${indicatorProgress * bounceScale})`,
                opacity: indicatorProgress,
                backdropFilter: 'blur(10px)',
                boxShadow: `0 ${height * 0.008}px ${height * 0.02}px rgba(255, 107, 53, 0.3), 0 0 ${height * 0.015}px rgba(255, 107, 53, 0.2)`,
                willChange: 'transform, opacity',
              }}
            >
              {text}
            </div>
          );
        })}
      </div>

      {/* Final cinematic glow and homepage transition */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at center, rgba(255, 107, 53, ${homepageTransition * 0.2}) 0%, rgba(10, 10, 10, ${homepageTransition}) 70%)`,
          opacity: homepageTransition,
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />
      
      {cinematicScale > 1.01 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${width * 0.7}px`,
            height: `${height * 0.5}px`,
            background: 'radial-gradient(ellipse, rgba(255, 107, 53, 0.12) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            opacity: Math.min(1, (cinematicScale - 1) * 12),
            pointerEvents: 'none',
            willChange: 'opacity',
            zIndex: 5,
          }}
        />
      )}

      {/* Corner tech elements with subtle rotation */}
      <div
        style={{
          position: 'absolute',
          top: `${height * 0.03}px`,
          right: `${width * 0.03}px`,
          width: `${Math.min(width * 0.025, height * 0.04)}px`,
          height: `${Math.min(width * 0.025, height * 0.04)}px`,
          border: `${Math.max(1, width * 0.001)}px solid rgba(255, 107, 53, 0.4)`,
          borderRadius: `${width * 0.002}px`,
          opacity: technicalLinesProgress * 0.7,
          transform: `rotate(${frame * 0.3}deg)`,
          zIndex: 3,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: `${height * 0.03}px`,
          left: `${width * 0.03}px`,
          width: `${Math.min(width * 0.025, height * 0.04)}px`,
          height: `${Math.min(width * 0.025, height * 0.04)}px`,
          border: `${Math.max(1, width * 0.001)}px solid rgba(255, 107, 53, 0.4)`,
          borderRadius: `${width * 0.002}px`,
          opacity: technicalLinesProgress * 0.7,
          transform: `rotate(${-frame * 0.2}deg)`,
          zIndex: 3,
        }}
      />
    </div>
  );
};