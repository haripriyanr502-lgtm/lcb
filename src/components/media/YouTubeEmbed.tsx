'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
  thumbnailUrl?: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title,
  className = '',
  thumbnailUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Fallback to high-quality YouTube thumbnail
  const thumb =
    thumbnailUrl || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className={`relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200/80 shadow-inner group ${className}`}
    >
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="relative w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-amber-400 group cursor-pointer block"
          aria-label={`Play video: ${title}`}
        >
          {/* Video Thumbnail */}
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Play Button Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-amber-300 transition-all duration-200 border-2 border-white/50">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-950 ml-1" />
            </div>
          </div>

          {/* Bottom Title Bar on Poster */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-950/95 to-transparent text-white">
            <span className="text-[11px] font-semibold text-slate-200 line-clamp-1">
              {title}
            </span>
          </div>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="w-full h-full border-0 absolute inset-0"
        />
      )}
    </div>
  );
};
