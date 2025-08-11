import React, { useEffect, useState } from 'react';
import logoMtc from '../assets/logo-mtc.png';

interface IntroLoaderProps {
  onComplete: () => void;
  show: boolean;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete, show }) => {
  const [animationStage, setAnimationStage] = useState<'fadeIn' | 'zoom' | 'fadeOut' | 'complete'>('fadeIn');

  useEffect(() => {
    if (!show) return;

    const timeline = setTimeout(() => {
      setAnimationStage('zoom');
      
      setTimeout(() => {
        setAnimationStage('fadeOut');
        
        setTimeout(() => {
          setAnimationStage('complete');
          onComplete();
        }, 800); // fade out duration
      }, 1200); // zoom duration - increased for smoother transition
    }, 1000); // fade in duration - slightly increased

    return () => clearTimeout(timeline);
  }, [onComplete, show]);

  if (!show || animationStage === 'complete') return null;

  const getLogoStyle = () => {
    const baseStyle = {
      maxWidth: '400px',
      maxHeight: '200px',
      width: 'auto',
      height: 'auto',
      transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };

    switch (animationStage) {
      case 'fadeIn':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'scale(0.8)',
          animation: 'fadeInScale 1s ease-out forwards',
        };
      case 'zoom':
        return {
          ...baseStyle,
          opacity: 1,
          transform: 'scale(1.08)',
        };
      case 'fadeOut':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'scale(1.08)',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            100% {
              opacity: 1;
              transform: scale(1.0);
            }
          }
        `}
      </style>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <img
          src={logoMtc}
          alt="MTC Konstrukcije Logo"
          style={getLogoStyle()}
        />
      </div>
    </>
  );
};