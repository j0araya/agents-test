'use client';

/**
 * ChileSilhouette — decorative inline SVG outline of Chile.
 *
 * Uses the same coordinate space as ChileMap (viewBox 0 0 200 640).
 * Renders all 16 region paths as a unified stroke silhouette — not interactive.
 * Stroke color responds to the active theme via var(--color-accent).
 * Fades in on mount via a CSS animation defined inline.
 */

const REGION_PATHS = [
  // Arica y Parinacota
  'M 68,0 L 136,0 L 143,11 L 145,24 L 142,35 L 121,37 L 100,39 L 82,37 L 66,34 L 62,22 Z',
  // Tarapacá
  'M 66,34 L 82,37 L 100,39 L 121,37 L 142,35 L 147,50 L 148,64 L 146,78 L 121,80 L 100,82 L 80,80 L 62,77 L 60,62 Z',
  // Antofagasta
  'M 62,77 L 80,80 L 100,82 L 121,80 L 146,78 L 152,96 L 153,116 L 151,137 L 145,151 L 122,153 L 100,155 L 80,153 L 62,149 L 56,136 L 55,115 Z',
  // Atacama
  'M 62,149 L 80,153 L 100,155 L 122,153 L 145,151 L 149,165 L 150,178 L 148,193 L 126,196 L 100,198 L 76,195 L 60,191 L 56,177 Z',
  // Coquimbo
  'M 60,191 L 76,195 L 100,198 L 126,196 L 148,193 L 153,206 L 155,221 L 152,236 L 127,239 L 100,242 L 72,239 L 56,235 L 51,220 Z',
  // Valparaíso
  'M 56,235 L 72,239 L 100,242 L 127,239 L 152,236 L 154,247 L 152,259 L 129,262 L 100,265 L 70,261 L 54,258 L 52,246 Z',
  // Metropolitana
  'M 54,258 L 70,261 L 100,265 L 129,262 L 152,259 L 154,269 L 152,280 L 127,283 L 100,286 L 72,282 L 52,278 L 50,268 Z',
  // O'Higgins
  'M 52,278 L 72,282 L 100,286 L 127,283 L 152,280 L 154,292 L 151,304 L 125,307 L 100,310 L 73,306 L 49,302 L 47,290 Z',
  // Maule
  'M 49,302 L 73,306 L 100,310 L 125,307 L 151,304 L 154,319 L 151,332 L 123,336 L 100,339 L 75,335 L 47,330 L 44,316 Z',
  // Ñuble
  'M 47,330 L 75,335 L 100,339 L 123,336 L 151,332 L 154,345 L 151,356 L 121,360 L 100,363 L 77,359 L 45,354 L 42,342 Z',
  // Biobío
  'M 45,354 L 77,359 L 100,363 L 121,360 L 151,356 L 156,370 L 155,384 L 126,387 L 100,391 L 73,387 L 42,382 L 39,368 Z',
  // Araucanía
  'M 42,382 L 73,387 L 100,391 L 126,387 L 155,384 L 158,398 L 155,412 L 123,416 L 100,420 L 75,416 L 38,410 L 35,396 Z',
  // Los Ríos
  'M 38,410 L 75,416 L 100,420 L 123,416 L 155,412 L 158,426 L 155,437 L 121,441 L 100,445 L 77,441 L 36,435 L 33,423 Z',
  // Los Lagos
  'M 36,435 L 77,441 L 100,445 L 121,441 L 155,437 L 160,454 L 158,470 L 149,482 L 126,487 L 100,491 L 72,486 L 48,481 L 34,469 L 31,452 Z',
  // Aysén
  'M 34,469 L 48,481 L 72,486 L 100,491 L 126,487 L 149,482 L 158,498 L 156,517 L 149,536 L 135,551 L 111,558 L 89,558 L 62,551 L 41,536 L 30,518 L 26,497 Z',
  // Magallanes
  'M 26,497 L 30,518 L 41,536 L 62,551 L 89,558 L 111,558 L 135,551 L 149,536 L 156,517 L 166,536 L 169,563 L 164,588 L 150,611 L 130,627 L 100,637 L 68,626 L 47,610 L 34,587 L 28,562 L 24,536 Z',
];

interface ChileSilhouetteProps {
  className?: string;
}

export default function ChileSilhouette({ className = '' }: ChileSilhouetteProps) {
  return (
    <>
      <style>{`
        @keyframes silhouette-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chile-silhouette {
          animation: silhouette-fade-in 600ms ease forwards;
        }
      `}</style>
      <svg
        viewBox="0 0 200 640"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Silueta de Chile"
        role="img"
        className={`chile-silhouette ${className}`}
        style={{ display: 'block', overflow: 'visible' }}
      >
        {REGION_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="var(--color-accent)"
            fillOpacity={0.08}
            stroke="var(--color-accent)"
            strokeWidth={1.2}
            strokeOpacity={0.6}
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </>
  );
}
