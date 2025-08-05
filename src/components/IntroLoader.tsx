import React, { useEffect, useRef } from 'react';
import introVideo from '../assets/intro-video.mp4';

interface IntroLoaderProps {
  onComplete: () => void;
  show: boolean;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete, show }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && show) {
      const video = videoRef.current;
      
      // Auto-play when component mounts
      video.play().catch(console.error);
      
      // Set up completion handler
      const handleEnded = () => {
        setTimeout(() => {
          onComplete();
        }, 300); // Small delay before calling onComplete
      };

      video.addEventListener('ended', handleEnded);
      
      return () => {
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [onComplete, show]);

  if (!show) return null;

  return (
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
        transition: 'opacity 0.3s ease-out',
      }}
    >
      <video
        ref={videoRef}
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
        }}
        muted
        playsInline
        preload="auto"
      >
        <source src={introVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};