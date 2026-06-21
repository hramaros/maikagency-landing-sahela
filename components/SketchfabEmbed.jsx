"use client";

/* Sketchfab 3D viewer embed. Attribution kept visible per Sketchfab's
   embed terms (required for the free/credited tier). */
export default function SketchfabEmbed() {
  return (
    <div className="sketchfab-embed-wrapper relative h-full w-full overflow-hidden rounded-[2rem] shadow-soft">
      <iframe
        title="Chanel Makeup"
        className="absolute inset-0 h-full w-full"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking=""
        execution-while-out-of-viewport=""
        execution-while-not-rendered=""
        web-share=""
        loading="lazy"
        src="https://sketchfab.com/models/6ebed1875087472c9b846c504560c5b4/embed"
      />
      <p className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-full bg-black/45 px-3 py-1.5 text-[11px] leading-none text-white/85 backdrop-blur">
        <a
          href="https://sketchfab.com/3d-models/chanel-makeup-6ebed1875087472c9b846c504560c5b4?utm_medium=embed&utm_campaign=share-popup&utm_content=6ebed1875087472c9b846c504560c5b4"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="pointer-events-auto font-semibold text-white hover:underline"
        >
          Chanel Makeup
        </a>{" "}
        by{" "}
        <a
          href="https://sketchfab.com/lewisschaefer?utm_medium=embed&utm_campaign=share-popup&utm_content=6ebed1875087472c9b846c504560c5b4"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="pointer-events-auto font-semibold text-white hover:underline"
        >
          lewisschaefer
        </a>{" "}
        on{" "}
        <a
          href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=6ebed1875087472c9b846c504560c5b4"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="pointer-events-auto font-semibold text-white hover:underline"
        >
          Sketchfab
        </a>
      </p>
    </div>
  );
}
