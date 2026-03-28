import { useNavigate } from 'react-router-dom';
import type { RegionSummary } from '../types/region';

interface RegionCardProps {
  region: RegionSummary;
  isHovered: boolean;
  onHover: (slug: string | null) => void;
}

export default function RegionCard({ region, isHovered, onHover }: RegionCardProps) {
  const navigate = useNavigate();

  return (
    <button
      className="w-full text-left transition-all duration-200"
      style={{
        background: isHovered ? `${region.color}18` : 'transparent',
        border: `1px solid ${isHovered ? region.color + '60' : 'rgba(200,169,110,0.1)'}`,
        borderRadius: '6px',
        padding: '10px 14px',
        cursor: 'pointer',
        outline: 'none',
      }}
      onMouseEnter={() => onHover(region.slug)}
      onMouseLeave={() => onHover(null)}
      onClick={() => navigate(`/region/${region.slug}`)}
    >
      <div className="flex items-center gap-3">
        {/* Color swatch + region number */}
        <div
          className="shrink-0 flex items-center justify-center text-xs font-bold rounded"
          style={{
            width: '36px',
            height: '36px',
            background: `${region.color}22`,
            border: `1px solid ${region.color}55`,
            color: region.color,
            fontFamily: 'monospace',
            fontSize: '10px',
          }}
        >
          {region.number}
        </div>

        {/* Name + capital */}
        <div className="flex-1 min-w-0">
          <div
            className="font-semibold text-sm leading-tight truncate"
            style={{
              color: isHovered ? region.color : 'var(--text-primary)',
              fontFamily: 'Georgia, serif',
              transition: 'color 0.2s',
            }}
          >
            {region.name}
          </div>
          <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-secondary)' }}>
            {region.capital}
          </div>
        </div>

        {/* Arrow */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{
            flexShrink: 0,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s',
            color: region.color,
          }}
        >
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
}
