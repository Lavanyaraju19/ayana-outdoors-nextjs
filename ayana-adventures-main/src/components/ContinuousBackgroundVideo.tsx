"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX } from 'lucide-react';

const HERO_BANNER_VIDEO_WITH_AUDIO = '/videos/hero-loop-audio.mp4';
const HERO_BANNER_VIDEO_FALLBACK = '/videos/hero-loop.mp4';

interface ContinuousBackgroundVideoProps {
  posterSrc: string;
}

const ContinuousBackgroundVideo = ({ posterSrc }: ContinuousBackgroundVideoProps) => {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [useVideo, setUseVideo] = useState(true);

  const isHomepage = pathname === '/';

  // Read the persisted sound preference after mount, not during the initial render — the
  // server has no sessionStorage, so seeding this from it in a lazy useState initializer
  // makes the client's first render diverge from the server's whenever a visitor had
  // previously turned sound on, producing a hydration mismatch on the muted/label markup below.
  useEffect(() => {
    if (window.sessionStorage.getItem('ayana-hero-sound') === 'on') {
      setSoundEnabled(true);
    }
  }, []);

  useEffect(() => {
    const checkMobilePerformance = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

      if (isMobile && isLowEndDevice) {
        setUseVideo(false);
      }
    };

    checkMobilePerformance();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !useVideo) return;

    // Setting defaultMuted (not just muted) reflects the `muted` attribute onto the element
    // itself, which is what browser autoplay-without-gesture policies check.
    video.defaultMuted = !soundEnabled;
    video.muted = !soundEnabled;
    video.volume = soundEnabled ? 1 : 0;

    const playVideo = () => {
      video.play().catch(() => {
        video.muted = true;
        setSoundEnabled(false);
      });
    };

    playVideo();
    video.addEventListener('canplay', playVideo);

    return () => video.removeEventListener('canplay', playVideo);
  }, [soundEnabled, useVideo]);

  const toggleSound = () => {
    const video = videoRef.current;
    const nextSoundState = !soundEnabled;

    if (video) {
      video.muted = !nextSoundState;
      video.defaultMuted = !nextSoundState;
      video.volume = nextSoundState ? 1 : 0;
      video.play().then(() => {
        setSoundEnabled(nextSoundState);
        window.sessionStorage.setItem('ayana-hero-sound', nextSoundState ? 'on' : 'off');
      }).catch(() => {
        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;
        setSoundEnabled(false);
        window.sessionStorage.setItem('ayana-hero-sound', 'off');
      });

      return;
    }

    setSoundEnabled(nextSoundState);
    window.sessionStorage.setItem('ayana-hero-sound', nextSoundState ? 'on' : 'off');
  };

  if (!isHomepage) return null;

  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-10">
        {useVideo ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={!soundEnabled}
            playsInline
            preload="metadata"
            poster={posterSrc}
            aria-label="Ayana Outdoors continuous background video"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          >
            <source src={HERO_BANNER_VIDEO_WITH_AUDIO} type="video/mp4" />
            <source src={HERO_BANNER_VIDEO_FALLBACK} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${posterSrc})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {useVideo && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundEnabled ? 'Sound Off' : 'Sound On'}
          aria-pressed={soundEnabled}
          className="fixed right-4 top-24 z-50 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl transition-all hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-none sm:right-6 sm:top-28"
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          {soundEnabled ? 'Sound Off' : 'Sound On'}
        </button>
      )}
    </>
  );
};

export default ContinuousBackgroundVideo;
