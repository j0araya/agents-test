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
      className="w-full text-left"
      style={{
        background: isHovered ? `${region.color}18` : 'rgba(17,29,53,0.4)',
        border: `1px solid ${isHovered ? region.color + '70' : 'rgba(200,169,110,0.12)'}`,
        borderRadius: '8px',
        padding: '14px 16px',
        cursor: 'pointer',
        outline: 'none',
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 6px 20px ${region.color}22, 0 2px 8px rgba(0,0,0,0.3)` : '0 1px 4px rgba(0,0,0,0.2)',
        transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={() => onHover(region.slug)}
      onMouseLeave={() => onHover(null)}
      onClick={() => navigate(`/region/${region.slug}`)}
    >
      <div className="flex items-center gap-3">
        {/* Color swatch + region number */}
        <div
          className="shrink-0 flex items-center justify-center font-bold rounded"
          style={{
            width: '40px',
            height: '40px',
            background: `${region.color}20`,
            border: `1px solid ${region.color}55`,
            color: region.color,
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.04em',
            borderRadius: '6px',
            transition: 'background 0.2s',
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
              fontFamily: 'var(--font-serif)',
              transition: 'color 0.2s',
            }}
          >
            {region.name}
          </div>
          <div
            className="text-xs mt-1 truncate"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}
          >
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
            transition: 'opacity 0.2s, transform 0.2s',
            transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
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
