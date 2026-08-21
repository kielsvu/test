'use client'

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="jhner-ambient jhner-ambient-one" />
      <div className="jhner-ambient jhner-ambient-two" />
      <div className="jhner-ambient jhner-ambient-three" />
      <div className="jhner-grid" />
    </div>
  )
}
