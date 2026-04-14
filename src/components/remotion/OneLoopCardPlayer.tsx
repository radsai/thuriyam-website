import React from 'react';
import { Player } from '@remotion/player';
import { OneLoopCardComposition } from './OneLoopCardComposition';

const DURATION = 120;
const FPS = 30;
const WIDTH = 560;
const HEIGHT = 400;

/** Embedded Remotion Player for the Home v11 “One loop” hero card */
export const OneLoopCardPlayer: React.FC = () => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
      <Player
        component={OneLoopCardComposition}
        durationInFrames={DURATION}
        compositionWidth={WIDTH}
        compositionHeight={HEIGHT}
        fps={FPS}
        controls={false}
        loop
        autoPlay
        style={{ width: '100%', aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      />
    </div>
  );
};
