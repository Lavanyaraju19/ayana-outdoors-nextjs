"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { GalleryPhoto } from '@/lib/content';

const GalleryContent = ({ photos }: { photos: GalleryPhoto[] }) => {
  return (
    <div className="container mx-auto px-4 relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-6xl text-white mb-4">
          Our <span className="text-primary">Gallery</span>
        </h1>
        <p className="font-body text-lg text-white/80 max-w-2xl mx-auto shadow-sm">
          Browse photo and video highlights from our camps, treks, and family adventures. See the energy, landscapes, and nature-based learning that define Ayana Outdoors.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
        <h2 className="font-display text-2xl text-white mb-6">Featured <span className="text-primary">Video</span></h2>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{ aspectRatio: '16/9' }}>
          <video src="/assets/internal-video.mp4" controls className="w-full h-full object-cover" />
        </div>
      </motion.div>

      <h2 className="font-display text-2xl text-foreground mb-6">Photo <span className="text-primary">Gallery</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-border/30 shadow-lg"
            style={{ aspectRatio: '4/5' }}
          >
            <Image
              src={photo.image_path}
              alt={photo.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="font-display text-lg text-white">{photo.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GalleryContent;
