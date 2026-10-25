export default function Stat({ value, label, shift, align = 'left' }) {
  return (
    // outer = scroll parallax target, inner = intro animation target (no prop clashes)
    <div data-shift={shift} className="will-change-transform">
      <div
        data-stat
        className={`max-w-64 ${align === 'right' ? 'lg:ml-auto lg:text-right' : ''}`}
      >
        <p className="font-display text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-8xl">
          <span data-count={value} />
          <span className="text-signal">%</span>
        </p>
        <p className="mt-2 text-sm text-ink/70 sm:text-base">{label}</p>
      </div>
    </div>
  )
}
