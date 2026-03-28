'use client';

import { useEffect, useState } from 'react';
import ChileMap from '@/src/components/ChileMap';
import RegionCard from '@/src/components/RegionCard';
import { ThemeToggle } from '@/src/components/ThemeToggle';
import { getRegions } from '@/src/services/api';
import type { RegionSummary } from '@/src/types/region';

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
      style={{ background: 'var(--color-bg)', color: 'var(--color-text-primary)' }}
    >
      {/* Header */}
      <header
        className="flex items-end justify-between"
        style={{
          padding: 'var(--space-12) var(--space-12) var(--space-10)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div>
          <div
            className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            República de Chile · 16 Regiones
          </div>
          <h1
            className="text-4xl md:text-5xl font-normal leading-none mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Atlas de Chile
          </h1>
          <p
            className="text-sm max-w-sm leading-relaxed"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-serif)' }}
          >
            Selecciona una región en el mapa o en la lista para explorar su geografía, cultura e historia.
          </p>
        </div>

        {/* Right side: coordinates + toggle */}
        <div className="flex items-end gap-4">
          <div
            className="hidden md:block text-right text-xs pb-1"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-mono)',
              lineHeight: '2.2',
            }}
          >
            <div>17°30′S — 55°59′S</div>
            <div>66°09′W — 75°42′W</div>
            <div style={{ color: 'var(--color-accent)', marginTop: 'var(--space-2)' }}>
              Cono Sur · Sudamérica
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 overflow-hidden">
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div
              className="text-sm tracking-widest uppercase"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              Cargando regiones…
            </div>
          </div>
        )}

        {error && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center" style={{ padding: '0 var(--space-10)' }}>
              <div className="text-3xl mb-4" style={{ color: 'var(--accent)' }}>
                ⚠
              </div>
              <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                {error}
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Map column — sticky sidebar */}
            <div
              className="hidden lg:flex flex-col items-center justify-start"
              style={{
                width: '320px',
                minWidth: '320px',
                padding: 'var(--space-10) var(--space-6)',
                borderRight: '1px solid var(--border)',
                position: 'sticky',
                top: 0,
                height: '100vh',
                background: 'var(--color-bg-surface)',
              }}
            >
              {/* Sidebar label */}
              <div
                className="text-xs tracking-[0.3em] uppercase self-start"
                style={{
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                Mapa de regiones
              </div>
              <ChileMap regions={regions} hoveredSlug={hoveredSlug} onHover={setHoveredSlug} />
            </div>

            {/* Region list */}
            <div
              className="flex-1 overflow-y-auto"
              style={{
                padding: 'var(--space-10) var(--space-10) var(--space-10) var(--space-12)',
              }}
            >
              {/* Section header */}
              <div
                className="flex items-baseline justify-between"
                style={{ marginBottom: 'var(--space-6)' }}
              >
                <div
                  className="text-xs tracking-[0.25em] uppercase"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  {regions.length} regiones
                </div>
                <div
                  className="text-xs"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  haz clic para explorar
                </div>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                style={{ gap: 'var(--space-4)' }}
              >
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
                className="grid grid-cols-2 sm:grid-cols-4"
                style={{
                  marginTop: 'var(--space-12)',
                  paddingTop: 'var(--space-10)',
                  marginBottom: 'var(--space-6)',
                  gap: 'var(--space-8)',
                  borderTop: '1px solid var(--border)',
                }}
              >
                {[
                  { label: 'Superficie total', value: '756.102 km²' },
                  { label: 'Población', value: '19,5 millones' },
                  { label: 'Capital', value: 'Santiago' },
                  { label: 'Idioma oficial', value: 'Español' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
                    <div
                      className="text-xs uppercase tracking-wider"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-base font-semibold"
                      style={{ color: 'var(--accent)', fontFamily: 'var(--font-serif)' }}
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
