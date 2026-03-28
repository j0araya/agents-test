import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRegion } from '../services/api';
import type { Region } from '../types/region';

const ATTRACTION_COLORS: Record<string, string> = {
  natural: '#4a9e6e',
  cultural: '#9e6e4a',
  historical: '#6e4a9e',
  adventure: '#4a6e9e',
};

const ATTRACTION_LABELS: Record<string, string> = {
  natural: 'Natural',
  cultural: 'Cultural',
  historical: 'Histórico',
  adventure: 'Aventura',
};

export default function RegionPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    getRegion(slug)
      .then(setRegion)
      .catch(() => setError('Región no encontrada.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--navy)' }}
      >
        <div
          className="text-sm tracking-widest uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Cargando región…
        </div>
      </div>
    );
  }

  if (error || !region) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: 'var(--navy)', gap: 'var(--space-5)' }}
      >
        <div className="text-3xl" style={{ color: 'var(--accent)' }}>⚠</div>
        <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)' }}>
          {error ?? 'Región no encontrada.'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="text-sm transition-colors"
          style={{
            border: '1px solid var(--border)',
            color: 'var(--accent)',
            background: 'transparent',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            padding: 'var(--space-3) var(--space-5)',
            borderRadius: '6px',
          }}
        >
          ← Volver al mapa
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--navy)', color: 'var(--text-primary)' }}>

      {/* Hero band */}
      <div
        style={{
          position: 'relative',
          padding: 'var(--space-12) var(--space-10) var(--space-16)',
          paddingLeft: 'clamp(var(--space-10), 5vw, var(--space-16))',
          paddingRight: 'clamp(var(--space-10), 5vw, var(--space-16))',
          background: `linear-gradient(135deg, ${region.color}22 0%, var(--navy) 60%)`,
          borderBottom: `1px solid ${region.color}28`,
        }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center transition-opacity hover:opacity-100"
          style={{
            color: 'var(--text-secondary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.7,
            padding: 0,
            fontSize: '0.75rem',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-10)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M12 7H2M6 11L2 7l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Volver al Atlas
        </button>

        <div className="flex flex-wrap items-start justify-between" style={{ gap: 'var(--space-10)' }}>
          <div className="flex-1 min-w-0">
            <div
              className="text-xs tracking-[0.35em] uppercase"
              style={{
                color: region.color,
                fontFamily: 'var(--font-mono)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Región {region.number} · {region.capital}
            </div>
            <h1
              className="text-3xl md:text-5xl font-normal leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em',
                maxWidth: '600px',
                marginBottom: 'var(--space-5)',
              }}
            >
              {region.name}
            </h1>
            <p
              className="text-base leading-relaxed"
              style={{
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-serif)',
                maxWidth: '560px',
                lineHeight: '1.75',
              }}
            >
              {region.description}
            </p>
          </div>

          {/* Key stats */}
          <div
            className="grid grid-cols-2 shrink-0 pt-1"
            style={{
              gap: 'var(--space-6) var(--space-12)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {[
              { label: 'Población', value: region.population.toLocaleString('es-CL') },
              { label: 'Superficie', value: `${region.area.toLocaleString('es-CL')} km²` },
              { label: 'Capital', value: region.capital },
              { label: 'Clima', value: region.climate },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
                <div
                  className="text-xs uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {label}
                </div>
                <div
                  className="text-sm"
                  style={{ color: 'var(--text-primary)', fontWeight: 500 }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: 'var(--space-12) clamp(var(--space-10), 5vw, var(--space-16))',
          maxWidth: '1200px',
        }}
      >

        {/* Long description */}
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2
            className="text-xs uppercase tracking-[0.3em]"
            style={{
              color: region.color,
              fontFamily: 'var(--font-mono)',
              marginBottom: 'var(--space-5)',
            }}
          >
            Descripción
          </h2>
          <p
            className="text-base"
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-serif)',
              maxWidth: '680px',
              lineHeight: '1.85',
            }}
          >
            {region.longDescription}
          </p>
        </section>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--border)', marginBottom: 'var(--space-12)' }} />

        {/* Two-column layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: 'var(--space-12)' }}
        >

          {/* Attractions */}
          <section>
            <h2
              className="text-xs uppercase tracking-[0.3em]"
              style={{
                color: region.color,
                fontFamily: 'var(--font-mono)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Atracciones principales
            </h2>
            <div className="flex flex-col" style={{ gap: 'var(--space-4)' }}>
              {region.attractions.map((attr) => (
                <div
                  key={attr.name}
                  style={{
                    padding: 'var(--space-6)',
                    borderRadius: '10px',
                    background: `${ATTRACTION_COLORS[attr.type]}0d`,
                    border: `1px solid ${ATTRACTION_COLORS[attr.type]}28`,
                  }}
                >
                  <div
                    className="flex items-start justify-between"
                    style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}
                  >
                    <span
                      className="font-semibold text-sm leading-snug"
                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
                    >
                      {attr.name}
                    </span>
                    <span
                      className="text-xs shrink-0"
                      style={{
                        background: `${ATTRACTION_COLORS[attr.type]}22`,
                        color: ATTRACTION_COLORS[attr.type],
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.06em',
                        padding: 'var(--space-1) var(--space-3)',
                        borderRadius: '20px',
                      }}
                    >
                      {ATTRACTION_LABELS[attr.type]}
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}
                  >
                    {attr.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Right column */}
          <div className="flex flex-col" style={{ gap: 'var(--space-12)' }}>

            {/* Facts */}
            <section>
              <h2
                className="text-xs uppercase tracking-[0.3em]"
                style={{
                  color: region.color,
                  fontFamily: 'var(--font-mono)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                Datos de la región
              </h2>
              <div className="flex flex-col">
                {region.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-center justify-between"
                    style={{
                      padding: 'var(--space-4) 0',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <span
                      className="text-xs uppercase tracking-wider"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                    >
                      {fact.label}
                    </span>
                    <span
                      className="text-sm font-semibold text-right"
                      style={{
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-serif)',
                        marginLeft: 'var(--space-4)',
                      }}
                    >
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Main activities */}
            <section>
              <h2
                className="text-xs uppercase tracking-[0.3em]"
                style={{
                  color: region.color,
                  fontFamily: 'var(--font-mono)',
                  marginBottom: 'var(--space-5)',
                }}
              >
                Actividades principales
              </h2>
              <div className="flex flex-wrap" style={{ gap: 'var(--space-3)' }}>
                {region.mainActivities.map((activity) => (
                  <span
                    key={activity}
                    className="text-xs"
                    style={{
                      background: `${region.color}12`,
                      border: `1px solid ${region.color}30`,
                      color: region.color,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.04em',
                      padding: 'var(--space-2) var(--space-4)',
                      borderRadius: '4px',
                    }}
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* Bottom spacer */}
        <div style={{ paddingBottom: 'var(--space-16)' }} />
      </div>
    </div>
  );
}
