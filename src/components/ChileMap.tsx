'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { RegionSummary } from '@/src/types/region';
import { REGION_PATHS } from '@/src/data/regionSvgPaths';

interface ChileMapProps {
  regions: RegionSummary[];
  hoveredSlug: string | null;
  onHover: (slug: string | null) => void;
}

const ATTRACTION_ICONS: Record<string, string> = {
  natural: '⛰',
  cultural: '🏛',
  historical: '🏰',
  adventure: '🧗',
};

export default function ChileMap({ regions, hoveredSlug, onHover }: ChileMapProps) {
  const router = useRouter();
  const [tooltipRegion, setTooltipRegion] = useState<RegionSummary | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const regionBySlug = Object.fromEntries(regions.map((r) => [r.slug, r]));

  function handleMouseMove(e: React.MouseEvent<SVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  function handleRegionEnter(slug: string) {
    onHover(slug);
    setTooltipRegion(regionBySlug[slug] ?? null);
  }

  function handleRegionLeave() {
    onHover(null);
    setTooltipRegion(null);
  }

  function handleRegionClick(slug: string) {
    router.push(`/region/${slug}`);
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Tooltip */}
      {tooltipRegion && (
        <div
          className="pointer-events-none absolute z-20 px-3 py-2 rounded text-sm max-w-[180px]"
          style={{
            left: tooltipPos.x + 14,
            top: tooltipPos.y - 10,
            background: 'rgba(11,20,38,0.96)',
            border: '1px solid rgba(200,169,110,0.4)',
            color: 'var(--text-primary)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}
        >
          <div
            className="font-bold text-xs leading-tight mb-0.5"
            style={{ color: tooltipRegion.color }}
          >
            Región {tooltipRegion.number}
          </div>
          <div className="font-semibold text-sm leading-tight">{tooltipRegion.name}</div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {tooltipRegion.capital}
          </div>
        </div>
      )}

      <svg
        viewBox="0 0 200 640"
        className="w-full h-full"
        style={{ maxWidth: '240px', filter: 'drop-shadow(0 0 24px rgba(0,0,0,0.6))' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleRegionLeave}
      >
        {/* Ocean / background texture */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(200,169,110,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Grid background */}
        <rect width="200" height="640" fill="url(#grid)" />

        {/* Longitude lines */}
        {[60, 80, 100, 120, 140, 160].map((x) => (
          <line
            key={x}
            x1={x}
            y1="0"
            x2={x}
            y2="640"
            stroke="rgba(200,169,110,0.05)"
            strokeWidth="0.5"
            strokeDasharray="2,4"
          />
        ))}

        {/* Latitude lines */}
        {[80, 160, 240, 320, 400, 480, 560].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="200"
            y2={y}
            stroke="rgba(200,169,110,0.05)"
            strokeWidth="0.5"
            strokeDasharray="2,4"
          />
        ))}

        {/* Regions */}
        {Object.entries(REGION_PATHS).map(([slug, path]) => {
          const region = regionBySlug[slug];
          if (!region) return null;
          const isHovered = hoveredSlug === slug;
          return (
            <g key={slug}>
              <path
                d={path}
                fill={isHovered ? region.color : `${region.color}88`}
                stroke={isHovered ? region.color : 'rgba(200,169,110,0.3)'}
                strokeWidth={isHovered ? 1.5 : 0.8}
                style={{
                  cursor: 'pointer',
                  transition: 'fill 0.2s ease, stroke 0.2s ease, filter 0.2s ease',
                  filter: isHovered ? `url(#glow) drop-shadow(0 0 6px ${region.color})` : 'none',
                }}
                onMouseEnter={() => handleRegionEnter(slug)}
                onClick={() => handleRegionClick(slug)}
              />
              {/* Region number label — only on hover */}
              {isHovered && (() => {
                const nums = path.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
                const xs = nums.filter((_, i) => i % 2 === 0);
                const ys = nums.filter((_, i) => i % 2 === 1);
                const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
                const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
                return (
                  <text
                    x={cx}
                    y={cy + 4}
                    textAnchor="middle"
                    fontSize="7"
                    fontWeight="bold"
                    fill="rgba(255,255,255,0.9)"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {region.number}
                  </text>
                );
              })()}
            </g>
          );
        })}

        {/* Atlantic/Pacific coast line overlay */}
        <path
          d="M 55,0 L 52,22 L 58,34 L 56,76 L 58,148 L 54,190 L 48,232 L 46,256 L 44,276 L 42,300 L 40,328 L 36,352 L 34,380 L 32,408 L 30,434 L 28,466 L 22,494 L 24,534 L 28,560 L 35,586 L 48,608 L 68,624 L 100,634"
          fill="none"
          stroke="rgba(200,169,110,0.2)"
          strokeWidth="1"
        />
        <path
          d="M 145,0 L 148,10 L 150,22 L 148,34 L 152,48 L 156,94 L 156,134 L 150,148 L 154,162 L 158,204 L 158,232 L 158,256 L 158,276 L 158,300 L 158,328 L 162,366 L 162,380 L 164,394 L 164,422 L 165,450 L 164,466 L 155,478 L 162,514 L 168,534 L 165,586 L 152,608 L 132,624 L 100,634"
          fill="none"
          stroke="rgba(200,169,110,0.2)"
          strokeWidth="1"
        />

        {/* Compass rose */}
        <g transform="translate(178, 24)">
          <circle r="8" fill="rgba(11,20,38,0.8)" stroke="rgba(200,169,110,0.3)" strokeWidth="0.5" />
          <text textAnchor="middle" y="-10" fontSize="5" fill="rgba(200,169,110,0.7)" fontFamily="serif">N</text>
          <text textAnchor="middle" y="14" fontSize="5" fill="rgba(200,169,110,0.4)" fontFamily="serif">S</text>
          <text x="12" textAnchor="start" y="2.5" fontSize="4" fill="rgba(200,169,110,0.4)" fontFamily="serif">E</text>
          <text x="-12" textAnchor="end" y="2.5" fontSize="4" fill="rgba(200,169,110,0.4)" fontFamily="serif">O</text>
          <line x1="0" y1="-6" x2="0" y2="6" stroke="rgba(200,169,110,0.5)" strokeWidth="0.5" />
          <line x1="-6" y1="0" x2="6" y2="0" stroke="rgba(200,169,110,0.5)" strokeWidth="0.5" />
          <polygon points="0,-6 1.5,-1 0,0 -1.5,-1" fill="rgba(200,169,110,0.8)" />
        </g>
      </svg>

      {/* Attraction type legend */}
      <div
        className="absolute bottom-2 left-2 text-xs flex flex-col gap-0.5"
        style={{ color: 'var(--text-muted)' }}
      >
        {Object.entries(ATTRACTION_ICONS).map(([type, icon]) => (
          <span key={type}>
            {icon} <span className="capitalize">{type}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
