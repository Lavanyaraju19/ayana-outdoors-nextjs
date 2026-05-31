import { motion } from 'framer-motion';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';
import trek1 from '@/assets/trek-1.jpg';
import trek2 from '@/assets/trek-2.jpg';
import trek3 from '@/assets/trek-3.jpg';
import trek4 from '@/assets/trek-4.jpg';
import campHero from '@/assets/camp-hero.jpg';
import contactImage from '@/assets/contact-image.jpg';

const photos = [
  { src: trek1, title: 'Himalayan Base Camp' },
  { src: trek2, title: 'Skandagiri Night Trek' },
  { src: trek3, title: 'Forest Trail Adventure' },
  { src: trek4, title: 'Savandurga Summit' },
  { src: campHero, title: 'Western Ghats Explorer' },
  { src: contactImage, title: 'Campfire Moments' },
];

const Gallery = () => {
  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl text-white mb-4">
            Our <span className="text-primary">Gallery</span>
          </h1>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto shadow-sm">
            Moments captured from our treks and camps — the joy, the adventure, and the wild beauty of nature.
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl text-white mb-6">Featured <span className="text-primary">Video</span></h2>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{ aspectRatio: '16/9' }}>
            <video
              src="/assets/internal-video.mp4"
              controls
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Photos Grid */}
        <h2 className="font-display text-2xl text-foreground mb-6">Photo <span className="text-primary">Gallery</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border/30 shadow-lg"
              style={{ aspectRatio: '4/5' }}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="font-display text-lg text-white">{photo.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Gallery;
