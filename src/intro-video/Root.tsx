import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { NissalIntro } from './NissalIntro';
import { SimpleLoadingScreen } from './SimpleLoadingScreen';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SimpleLoadingScreen"
        component={SimpleLoadingScreen}
        durationInFrames={120} // 4 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          brandName: 'NISSAL',
          tagline: 'Aluminijumski sistemi'
        }}
      />
      <Composition
        id="NissalIntro"
        component={NissalIntro}
        durationInFrames={150} // 5 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          brandName: 'NISSAL',
          tagline: 'Aluminijumski sistemi'
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);