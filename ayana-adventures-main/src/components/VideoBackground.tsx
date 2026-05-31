import { useLocation } from 'react-router-dom';
import campHero from '@/assets/camp-hero.jpg';

const VideoBackground = () => {
  const location = useLocation();
  const isExcludedPage = location.pathname.includes('/summer-camp') ||
    location.pathname.includes('/weekend-treks') ||
    location.pathname.includes('/booking') ||
    location.pathname.includes('/about') ||
    location.pathname.includes('/programs') ||
    location.pathname.includes('/safety') ||
    location.pathname.includes('/gallery');

  if (isExcludedPage) return null;

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster={campHero}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

export default VideoBackground;
