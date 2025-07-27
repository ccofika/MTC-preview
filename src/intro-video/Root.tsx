import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { NissalIntro } from './NissalIntro';

export const RemotionRoot: React.FC = () => {
  return (
    <>
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