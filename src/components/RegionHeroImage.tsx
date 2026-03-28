'use client';

import Image from 'next/image';
import { useState } from 'react';

interface RegionHeroImageProps {
  imageUrl: string;
  regionColor: string;
  alt: string;
}

/**
 * RegionHeroImage
 *
 * Renders a full-width hero image for a region detail page.
 * Falls back to a color gradient when imageUrl is empty or the image fails to load.
 * The overlay gradient blends the image into the page background below it.
 */
export default function RegionHeroImage({
  imageUrl,
  regionColor,
  alt,
}: RegionHeroImageProps) {
  const [hasError, setHasError] = useState(false);

  const showImage = imageUrl && !hasError;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(220px, 30vw, 340px)',
        overflow: 'hidden',
      }}
    >
      {/* Fallback gradient — always rendered, hidden behind image when available */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${regionColor}44 0%, var(--color-bg) 70%)`,
        }}
      />

      {/* Hero image */}
      {showImage && (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center 30%',
            transition: 'opacity 0.3s ease',
          }}
          onError={() => setHasError(true)}
        />
      )}

      {/* Overlay: blends image into page background below */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 60%, var(--color-bg) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
