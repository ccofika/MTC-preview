import React, { useEffect, useState } from 'react';
import { Player } from '@remotion/player';
import { NissalIntro } from '../intro-video/components/NissalIntro';

interface IntroLoaderProps {
  onComplete: () => void;
  show: boolean;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete, show }) => {
  const [playerRef, setPlayerRef] = useState<any>(null);

  useEffect(() => {
    if (playerRef && show) {
      // Auto-play when component mounts
      playerRef.play();
      
      // Set up completion handler
      const handleEnded = () => {
        setTimeout(() => {
          onComplete();
        }, 300); // Small delay before calling onComplete
      };

      playerRef.addEventListener('ended', handleEnded);
      
      return () => {
        playerRef.removeEventListener('ended', handleEnded);
      };
    }
  }, [playerRef, onComplete, show]);

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
      <Player
        ref={setPlayerRef}
        component={NissalIntro}
        durationInFrames={150}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        style={{
          width: '100vw',
          height: '100vh',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
        inputProps={{
          title: 'NISSAL',
          subtitle: 'Aluminijumski sistemi'
        }}
        controls={false}
        autoPlay={true}
        loop={false}
        showVolumeControls={false}
        allowFullscreen={false}
        spaceKeyToPlayOrPause={false}
      />
    </div>
  );
};