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
          style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}
        >
          Cargando región…
        </div>
      </div>
    );
  }

  if (error || !region) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: 'var(--navy)' }}
      >
        <div className="text-3xl" style={{ color: 'var(--accent)' }}>⚠</div>
        <p style={{ color: 'var(--text-secondary)' }}>{error ?? 'Región no encontrada.'}</p>
        <button
          onClick={() => navigate('/')}
          className="text-sm px-4 py-2 rounded"
          style={{
            border: '1px solid var(--border)',
            color: 'var(--accent)',
            background: 'transparent',
            cursor: 'pointer',
            fontFamily: 'monospace',
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
        className="relative px-6 md:px-12 py-10"
        style={{
          background: `linear-gradient(135deg, ${region.color}22 0%, var(--navy) 60%)`,
          borderBottom: `1px solid ${region.color}30`,
        }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs mb-6 transition-colors"
          style={{
            color: 'var(--text-secondary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M12 7H2M6 11L2 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver al Atlas
        </button>

        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div
              className="text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: region.color, fontFamily: 'monospace' }}
            >
              Región {region.number} · {region.capital}
            </div>
            <h1
              className="text-3xl md:text-5xl font-normal leading-tight"
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em', maxWidth: '600px' }}
            >
              {region.name}
            </h1>
            <p
              className="mt-3 text-base max-w-xl leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontFamily: 'Georgia, serif' }}
            >
              {region.description}
            </p>
          </div>

          {/* Key stats */}
          <div
            className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm"
            style={{ fontFamily: 'monospace' }}
          >
            {[
              { label: 'Población', value: region.population.toLocaleString('es-CL') },
              { label: 'Superficie', value: `${region.area.toLocaleString('es-CL')} km²` },
              { label: 'Capital', value: region.capital },
              { label: 'Clima', value: region.climate },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>
                  {label}
                </div>
                <div style={{ color: 'var(--text-primary)' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 md:px-12 py-10 max-w-5xl">
        {/* Long description */}
        <section className="mb-10">
          <h2
            className="text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: region.color, fontFamily: 'monospace' }}
          >
            Descripción
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: 'Georgia, serif', maxWidth: '680px' }}
          >
            {region.longDescription}
          </p>
        </section>

        {/* Two-column layout: Attractions + Facts/Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Attractions */}
          <section>
            <h2
              className="text-xs uppercase tracking-[0.25em] mb-4"
              style={{ color: region.color, fontFamily: 'monospace' }}
            >
              Atracciones principales
            </h2>
            <div className="flex flex-col gap-3">
              {region.attractions.map((attr) => (
                <div
                  key={attr.name}
                  className="p-4 rounded"
                  style={{
                    background: `${ATTRACTION_COLORS[attr.type]}10`,
                    border: `1px solid ${ATTRACTION_COLORS[attr.type]}30`,
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span
                      className="font-semibold text-sm"
                      style={{ color: 'var(--text-primary)', fontFamily: 'Georgia, serif' }}
                    >
                      {attr.name}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        background: `${ATTRACTION_COLORS[attr.type]}25`,
                        color: ATTRACTION_COLORS[attr.type],
                        fontFamily: 'monospace',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {ATTRACTION_LABELS[attr.type]}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {attr.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Right column: Facts + Activities */}
          <div className="flex flex-col gap-10">
            {/* Facts */}
            <section>
              <h2
                className="text-xs uppercase tracking-[0.25em] mb-4"
                style={{ color: region.color, fontFamily: 'monospace' }}
              >
                Datos de la región
              </h2>
              <div className="flex flex-col gap-2">
                {region.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-center justify-between py-2"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                      {fact.label}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'Georgia, serif' }}>
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Main activities */}
            <section>
              <h2
                className="text-xs uppercase tracking-[0.25em] mb-4"
                style={{ color: region.color, fontFamily: 'monospace' }}
              >
                Actividades principales
              </h2>
              <div className="flex flex-wrap gap-2">
                {region.mainActivities.map((activity) => (
                  <span
                    key={activity}
                    className="text-xs px-3 py-1.5 rounded"
                    style={{
                      background: `${region.color}15`,
                      border: `1px solid ${region.color}35`,
                      color: region.color,
                      fontFamily: 'monospace',
                    }}
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
