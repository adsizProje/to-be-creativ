"use client";

export default function WaveBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050505]">
      <div className="wave-layer wave-layer--primary" />
      <div className="wave-layer wave-layer--secondary" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
    </div>
  );
}

