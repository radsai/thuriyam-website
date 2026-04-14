import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';

const CYCLE_FRAMES = 120;

type Pt = { x: number; y: number };

function dist(a: Pt, b: Pt): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/** Point at distance `s` along closed path A→W→I→A */
function pointOnTriangleLoop(s: number, A: Pt, W: Pt, I: Pt): Pt {
  const segs: [Pt, Pt][] = [
    [A, W],
    [W, I],
    [I, A],
  ];
  const lengths = segs.map(([p, q]) => dist(p, q));
  const total = lengths.reduce((a, b) => a + b, 0);
  let t = ((s % total) + total) % total;
  for (let i = 0; i < segs.length; i++) {
    const len = lengths[i];
    if (t < len - 1e-9) {
      const u = len < 1e-9 ? 0 : t / len;
      const [p, q] = segs[i];
      return { x: p.x + (q.x - p.x) * u, y: p.y + (q.y - p.y) * u };
    }
    t -= len;
  }
  return { ...A };
}

/** Which edge index 0..2 the distance `s` falls on */
function activeEdgeIndex(s: number, lengths: number[]): number {
  const total = lengths.reduce((a, b) => a + b, 0);
  let t = ((s % total) + total) % total;
  for (let i = 0; i < lengths.length; i++) {
    if (t < lengths[i]) return i;
    t -= lengths[i];
  }
  return 2;
}

/** Matches hero “One loop” — cyclical triangle: Agents → Workflow → IQA → Agents */
export const OneLoopCardComposition: React.FC = () => {
  const frame = useCurrentFrame();

  const labelOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const labelY = interpolate(frame, [0, 14], [8, 0], { extrapolateRight: 'clamp' });

  const diagramOpacity = interpolate(frame, [8, 28], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const descOpacity = interpolate(frame, [32, 52], [0, 1], { extrapolateRight: 'clamp' });
  const footOpacity = interpolate(frame, [54, 72], [0, 1], { extrapolateRight: 'clamp' });
  const sparkPulse = 1 + 0.06 * Math.sin(frame / 9);

  const { A, W, I, lengths, dot, edgeIdx } = useMemo(() => {
    const cx = 280;
    const cy = 108;
    const r = 92;
    const rad = (deg: number) => (deg * Math.PI) / 180;
    const pt = (deg: number): Pt => ({
      x: cx + r * Math.cos(rad(deg)),
      y: cy + r * Math.sin(rad(deg)),
    });
    const A = pt(-90);
    const W = pt(30);
    const I = pt(150);
    const lenAW = dist(A, W);
    const lenWI = dist(W, I);
    const lenIA = dist(I, A);
    const lengths = [lenAW, lenWI, lenIA];
    const totalLen = lenAW + lenWI + lenIA;
    const progress = (frame % CYCLE_FRAMES) / CYCLE_FRAMES;
    const s = progress * totalLen;
    const dot = pointOnTriangleLoop(s, A, W, I);
    const edgeIdx = activeEdgeIndex(s, lengths);
    return { A, W, I, lengths, dot, edgeIdx };
  }, [frame]);

  const edgeOpacity = (i: number) => (i === edgeIdx ? 0.95 : 0.28);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 520,
            padding: '22px 20px 18px',
            border: '1px solid #e2e8f0',
            borderRadius: 16,
            boxShadow: '0 10px 40px -12px rgba(15, 23, 42, 0.12)',
            boxSizing: 'border-box',
          }}
        >
          <p
            style={{
              textAlign: 'center',
              fontSize: 11,
              letterSpacing: '0.2em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#64748b',
              opacity: labelOpacity,
              transform: `translateY(${labelY}px)`,
            }}
          >
            ONE LOOP
          </p>

          <div style={{ opacity: diagramOpacity, marginTop: 8 }}>
            <svg
              width="100%"
              height={200}
              viewBox="0 0 560 200"
              style={{ display: 'block' }}
              aria-label="Cyclical flow: Agents, Workflow, IQA, back to Agents"
            >
              <defs>
                <marker id="loopArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                  <polygon points="0 0, 7 3.5, 0 7" fill="#64748b" />
                </marker>
                <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Edges — closed loop; active edge brighter */}
              <line
                x1={A.x}
                y1={A.y}
                x2={W.x}
                y2={W.y}
                stroke="#0ea5e9"
                strokeWidth={edgeIdx === 0 ? 3 : 2}
                strokeOpacity={edgeOpacity(0)}
                strokeLinecap="round"
                markerEnd="url(#loopArrow)"
              />
              <line
                x1={W.x}
                y1={W.y}
                x2={I.x}
                y2={I.y}
                stroke="#0ea5e9"
                strokeWidth={edgeIdx === 1 ? 3 : 2}
                strokeOpacity={edgeOpacity(1)}
                strokeLinecap="round"
                markerEnd="url(#loopArrow)"
              />
              <line
                x1={I.x}
                y1={I.y}
                x2={A.x}
                y2={A.y}
                stroke="#0ea5e9"
                strokeWidth={edgeIdx === 2 ? 3 : 2}
                strokeOpacity={edgeOpacity(2)}
                strokeLinecap="round"
                markerEnd="url(#loopArrow)"
              />

              {/* Node pills */}
              {[
                { c: A, label: 'Agents' },
                { c: W, label: 'Workflow' },
                { c: I, label: 'IQA' },
              ].map(({ c, label }) => (
                <g key={label} transform={`translate(${c.x}, ${c.y})`}>
                  <rect
                    x={-46}
                    y={-18}
                    width={92}
                    height={36}
                    rx={10}
                    fill="#0f172a"
                  />
                  <text
                    x={0}
                    y={5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={13}
                    fontWeight={700}
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                  >
                    {label}
                  </text>
                </g>
              ))}

              {/* Traveling pulse — on top so it reads as moving around the closed loop */}
              <circle cx={dot.x} cy={dot.y} r={9} fill="#38bdf8" opacity={0.35} filter="url(#dotGlow)" />
              <circle cx={dot.x} cy={dot.y} r={5} fill="#0ea5e9" stroke="#fff" strokeWidth={2} />
            </svg>
            <p
              style={{
                textAlign: 'center',
                marginTop: 4,
                fontSize: 11,
                color: '#94a3b8',
                letterSpacing: '0.02em',
              }}
            >
              Same path, repeating — measure → improve → run again
            </p>
          </div>

          <p
            style={{
              textAlign: 'center',
              marginTop: 12,
              fontSize: 14,
              lineHeight: 1.55,
              color: '#334155',
              maxWidth: 440,
              marginLeft: 'auto',
              marginRight: 'auto',
              opacity: descOpacity,
            }}
          >
            Studio → run → measure → improve. Proof from production, not guesswork.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginTop: 12,
              fontSize: 12,
              color: '#64748b',
              opacity: footOpacity,
            }}
          >
            <span style={{ transform: `scale(${sparkPulse})`, display: 'inline-block' }}>✨</span>
            <span>Grounded in your runs and your rules</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
