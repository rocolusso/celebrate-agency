'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface PhotoGalleryProps {
  images: string[];
  alt: string;
}

export default function PhotoGallery({ images, alt }: PhotoGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Transform images to slides format for lightbox
  const slides = images.map((img) => ({
    src: img,
    alt,
  }));

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, idx) => (
          <div
            key={idx}
            className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => {
              setIndex(idx);
              setOpen(true);
            }}
          >
            <Image
              src={image}
              alt={`${alt} - фото ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 80,
          border: 0,
          borderRadius: 4,
          padding: 0,
          gap: 16,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
        }}
        styles={{
          container: { 
            backgroundColor: "rgba(0, 0, 0, 0.95)" 
          },
          button: { 
            filter: "none",
            color: "#FF1493",
          },
          navigationPrev: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "2px solid #FF1493",
          },
          navigationNext: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "2px solid #FF1493",
          },
        }}
      />
    </>
  );
}
