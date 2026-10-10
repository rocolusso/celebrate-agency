import React from 'react';

/** Renders one JSON-LD script. `<` is escaped so the data can never close the script tag. */
export default function JsonLd({ graph }: { graph: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be embedded as raw script content for crawlers.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
    />
  );
}
