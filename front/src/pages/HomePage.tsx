import { useEffect, useState } from 'react';
import ChileMap from '../components/ChileMap';
import RegionCard from '../components/RegionCard';
import { getRegions } from '../services/api';
import type { RegionSummary } from '../types/region';

export default function HomePage() {
  const [regions, setRegions] = useState<RegionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  useEffect(() => {
    getRegions()
      .then(setRegions)
      .catch(() => setError('No se pudo cargar la información de las regiones.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--navy)', color: 'var(--text-primary)' }}
    >
      {/* Header */}
      <header
        className="flex items-end justify-between px-10 pt-10 pb-8"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div>
          <div
            className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: 'var(--accent)', fontFamily: 'monospace' }}
          >
            República de Chile · 16 Regiones
          </div>
          <h1
            className="text-4xl md:text-5xl font-normal leading-none mb-3"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Atlas de Chile
          </h1>
          <p
            className="text-sm max-w-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: 'Georgia, serif' }}
          >
            Selecciona una región en el mapa o en la lista para explorar su geografía, cultura e historia.
          </p>
        </div>

        {/* Coordinates decoration */}
        <div
          className="hidden md:block text-right text-xs pb-1"
          style={{ color: 'var(--text-muted)', fontFamily: 'monospace', lineHeight: '2' }}
        >
          <div>17°30′S — 55°59′S</div>
          <div>66°09′W — 75°42′W</div>
          <div style={{ color: 'var(--accent)', marginTop: '6px' }}>Cono Sur · Sudamérica</div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 overflow-hidden">
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div
              className="text-sm tracking-widest uppercase"
              style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}
            >
              Cargando regiones…
            </div>
          </div>
        )}

        {error && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-10">
              <div className="text-3xl mb-4" style={{ color: 'var(--accent)' }}>⚠</div>
              <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{error}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Asegúrate de que el backend esté corriendo en puerto 3001
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Map column — sticky sidebar */}
            <div
              className="hidden lg:flex flex-col items-center justify-start py-10 px-6"
              style={{
                width: '300px',
                minWidth: '300px',
                borderRight: '1px solid var(--border)',
                position: 'sticky',
                top: 0,
                height: '100vh',
                background: 'rgba(11,20,38,0.6)',
              }}
            >
              {/* Sidebar label */}
              <div
                className="text-xs tracking-[0.3em] uppercase mb-6 self-start"
                style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}
              >
                Mapa de regiones
              </div>
              <ChileMap
                regions={regions}
                hoveredSlug={hoveredSlug}
                onHover={setHoveredSlug}
              />
            </div>

            {/* Region list */}
            <div className="flex-1 overflow-y-auto py-8 px-8 md:px-10">
              {/* Section header */}
              <div className="flex items-baseline justify-between mb-6">
                <div
                  className="text-xs tracking-[0.25em] uppercase"
                  style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}
                >
                  {regions.length} regiones
                </div>
                <div
                  className="text-xs"
                  style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}
                >
                  haz clic para explorar
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {regions.map((region) => (
                  <RegionCard
                    key={region.slug}
                    region={region}
                    isHovered={hoveredSlug === region.slug}
                    onHover={setHoveredSlug}
                  />
                ))}
              </div>

              {/* Stats bar */}
              <div
                className="mt-10 pt-8 mb-4 grid grid-cols-2 sm:grid-cols-4 gap-6"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                {[
                  { label: 'Superficie total', value: '756.102 km²' },
                  { label: 'Población', value: '19,5 millones' },
                  { label: 'Capital', value: 'Santiago' },
                  { label: 'Idioma oficial', value: 'Español' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <div
                      className="text-xs uppercase tracking-wider"
                      style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-base font-semibold"
                      style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif' }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
