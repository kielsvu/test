'use client'

export default function AnimatedBackground() {
  return (
    <div
      className="bg-blob"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Top-left blob */}
      <div
        className="bg-blob blob-anim-1"
        style={{
          position: 'absolute',
          top: '-60px',
          left: '-40px',
          width: 'clamp(180px, 28vw, 340px)',
          height: 'clamp(180px, 28vw, 340px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(178,132,255,0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Top-right blob */}
      <div
        className="bg-blob blob-anim-2"
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-60px',
          width: 'clamp(160px, 22vw, 280px)',
          height: 'clamp(160px, 22vw, 280px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197,163,255,0.12) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />

      {/* Center blob */}
      <div
        className="bg-blob blob-anim-3"
        style={{
          position: 'absolute',
          top: '40%',
          left: '45%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(120px, 18vw, 220px)',
          height: 'clamp(120px, 18vw, 220px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(178,132,255,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Bottom-left blob */}
      <div
        className="bg-blob blob-anim-4"
        style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-30px',
          width: 'clamp(160px, 24vw, 300px)',
          height: 'clamp(160px, 24vw, 300px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(178,132,255,0.13) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />

      {/* Bottom-right blob */}
      <div
        className="bg-blob blob-anim-1"
        style={{
          position: 'absolute',
          bottom: '-40px',
          right: '-50px',
          width: 'clamp(140px, 20vw, 260px)',
          height: 'clamp(140px, 20vw, 260px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214,190,255,0.09) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDelay: '-6s',
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="bg-grid"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(178,132,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  )
}
