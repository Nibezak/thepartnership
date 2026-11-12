import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export interface InstagramEmbedProps {
  permalink: string;
  campaignTitle?: string;
  posterSrc?: string;
  aspectRatio?: string;
  height?: string;
  borderRadius?: string;
  scrollAutoPlay?: boolean;
}

function extractShortcode(url: string): string {
  const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/i);
  return match ? match[1] : 'DdGpBHmiERt';
}

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
  permalink,
  campaignTitle = 'Campaign Video Reel',
  posterSrc,
  aspectRatio = '1.95 / 1',
  height,
  borderRadius = '28px',
  scrollAutoPlay = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(!scrollAutoPlay);
  const [loaded, setLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [embedEpoch, setEmbedEpoch] = useState(0);

  const shortcode = extractShortcode(permalink);
  const embedSrc = `https://www.instagram.com/reel/${shortcode}/embed/?cr=1&v=14&autoplay=1&loop=1&muted=${isMuted ? 1 : 0}`;

  useEffect(() => {
    if (!scrollAutoPlay) {
      setIsInView(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const visible = entry.isIntersecting;
        setIsInView(visible);
        if (!visible) {
          setLoaded(false);
        }
      },
      {
        threshold: 0.45,
        rootMargin: '-6% 0px -6% 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollAutoPlay]);

  const handleToggleVolume = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
    setLoaded(false);
    setEmbedEpoch((n) => n + 1);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        ...(height ? { height } : { aspectRatio }),
        borderRadius,
        backgroundColor: '#231B14',
        overflow: 'hidden',
      }}
    >
      {/* Crisp poster shown before play or while scrolled out of viewport */}
      {(!loaded || !isInView) && posterSrc && (
        <img
          src={posterSrc}
          alt={campaignTitle}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      )}

      {/* Subtle dark veil when paused out of view */}
      {!isInView && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(35, 27, 20, 0.25)',
            zIndex: 1,
          }}
        />
      )}

      {/* Mount live autoplaying Instagram reel only when active/in-view */}
      {isInView && (
        <iframe
          key={`${shortcode}-${embedEpoch}-${isMuted ? 'm' : 'u'}`}
          src={embedSrc}
          title={campaignTitle}
          onLoad={() => setLoaded(true)}
          scrolling="no"
          allow="autoplay *; encrypted-media *; fullscreen *; picture-in-picture *; clipboard-write *"
          allowFullScreen
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
          style={{
            position: 'absolute',
            top: '-60px',
            left: '-1%',
            width: '102%',
            height: 'calc(100% + 460px)',
            border: 'none',
            display: 'block',
            backgroundColor: 'transparent',
            zIndex: 2,
          }}
        />
      )}

      {/* User Volume Toggle (Starts muted; user can toggle volume anytime) */}
      <button
        type="button"
        onClick={handleToggleVolume}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        aria-pressed={!isMuted}
        title={isMuted ? 'Turn sound on' : 'Mute sound'}
        style={{
          position: 'absolute',
          right: '16px',
          bottom: '16px',
          zIndex: 12,
          width: '44px',
          height: '44px',
          borderRadius: '999px',
          backgroundColor: isMuted ? 'rgba(35, 27, 20, 0.84)' : '#FFCD06',
          color: isMuted ? '#FFCD06' : '#30261D',
          border: '1.5px solid rgba(255, 205, 6, 0.72)',
          backdropFilter: 'blur(8px)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.32)',
          transition: 'transform 0.18s ease, background-color 0.2s ease, color 0.2s ease',
        }}
      >
        {isMuted ? <VolumeX size={19} /> : <Volume2 size={19} />}
      </button>
    </div>
  );
};
