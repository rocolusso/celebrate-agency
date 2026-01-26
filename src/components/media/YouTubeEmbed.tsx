import React from 'react';

interface YouTubeEmbedProps {
  videoUrl: string;
  title: string;
}

export default function YouTubeEmbed({ videoUrl, title }: YouTubeEmbedProps) {
  // Extract video ID from URL
  const getVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(videoUrl);

  if (!videoId) {
    return null;
  }

  return (
    <div className="relative w-full max-w-[800px] mx-auto rounded-xl overflow-hidden shadow-lg">
      <div className="relative pb-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
