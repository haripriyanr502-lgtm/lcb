'use client';

import React from 'react';
import { VideoItem } from '@/types';
import { YouTubeEmbed } from './YouTubeEmbed';
import { Video, ExternalLink, Calendar, MapPin } from 'lucide-react';

interface VideoCardProps {
  video: VideoItem;
  showCategoryBadge?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  showCategoryBadge = false,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Responsive YouTube Embed */}
        <YouTubeEmbed videoId={video.youtubeId} title={video.title} />

        {/* Video Card Content */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              <Video className="w-3 h-3 text-blue-800" />
              Field Recording
            </span>

            {video.channel && (
              <span className="text-[10px] font-semibold text-slate-500">
                via {video.channel}
              </span>
            )}
          </div>

          <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-blue-950 transition-colors mb-2">
            {video.title}
          </h4>

          {video.description && (
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
              {video.description}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer with Direct YouTube Link */}
      <div className="px-4 sm:px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="font-mono text-[10px] text-slate-400">
          ID: {video.youtubeId}
        </span>
        <a
          href={`https://youtu.be/${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold text-blue-900 hover:text-blue-950 hover:underline"
        >
          <span>Watch on YouTube</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
