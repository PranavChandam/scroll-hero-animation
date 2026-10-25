// Original top-view sports car drawn as inline SVG (front of the car points up).
export default function Car() {
  return (
    <svg
      viewBox="0 0 200 440"
      className="block h-auto w-full"
      role="img"
      aria-label="Top view of an orange sports car"
    >
      <defs>
        <linearGradient id="car-body" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#b93d1b" />
          <stop offset=".35" stopColor="#ee633a" />
          <stop offset=".5" stopColor="#f77b4f" />
          <stop offset=".65" stopColor="#ee633a" />
          <stop offset="1" stopColor="#b93d1b" />
        </linearGradient>
        <linearGradient id="car-glass" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#141c27" />
          <stop offset="1" stopColor="#3a4a5e" />
        </linearGradient>
        <filter id="car-blur">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="104" cy="238" rx="84" ry="200" fill="#000" opacity=".3" filter="url(#car-blur)" />

      {/* wheels (tucked under the body) */}
      <g fill="#0d1117">
        <rect x="12" y="88" width="28" height="60" rx="9" />
        <rect x="160" y="88" width="28" height="60" rx="9" />
        <rect x="10" y="292" width="30" height="68" rx="10" />
        <rect x="160" y="292" width="30" height="68" rx="10" />
      </g>

      {/* body */}
      <path
        fill="url(#car-body)"
        d="M100 6 C128 6 150 30 160 70 C168 100 170 130 168 170 C166 210 176 240 178 290 C180 340 172 390 150 416 C135 430 118 434 100 434 C82 434 65 430 50 416 C28 390 20 340 22 290 C24 240 34 210 32 170 C30 130 32 100 40 70 C50 30 72 6 100 6 Z"
      />

      {/* hood crease + vents */}
      <path d="M100 16 L100 138" stroke="#000" strokeOpacity=".14" strokeWidth="2" />
      <path d="M72 84 L88 112 M128 84 L112 112" stroke="#000" strokeOpacity=".3" strokeWidth="4" strokeLinecap="round" />

      {/* headlights */}
      <g fill="#fff7d6">
        <path d="M56 56 L86 38 L84 53 Z" />
        <path d="M144 56 L114 38 L116 53 Z" />
      </g>

      {/* windshield, roof, rear glass */}
      <path fill="url(#car-glass)" d="M66 152 C80 140 120 140 134 152 L140 192 L60 192 Z" />
      <rect x="64" y="192" width="72" height="66" rx="16" fill="url(#car-body)" stroke="#000" strokeOpacity=".15" />
      <path fill="url(#car-glass)" d="M62 258 L138 258 L130 294 C116 302 84 302 70 294 Z" />

      {/* side intakes */}
      <g fill="#10161e" opacity=".75">
        <path d="M30 220 C36 232 40 250 40 268 L28 268 C28 250 28 236 30 220 Z" />
        <path d="M170 220 C164 232 160 250 160 268 L172 268 C172 250 172 236 170 220 Z" />
      </g>

      {/* mirrors */}
      <ellipse cx="28" cy="168" rx="10" ry="5" fill="#d8532c" />
      <ellipse cx="172" cy="168" rx="10" ry="5" fill="#d8532c" />

      {/* engine louvres */}
      <g stroke="#000" strokeOpacity=".28" strokeWidth="3" strokeLinecap="round">
        <path d="M66 318 H134" />
        <path d="M66 334 H134" />
        <path d="M68 350 H132" />
        <path d="M72 366 H128" />
      </g>

      {/* tail light bar */}
      <rect x="48" y="418" width="104" height="5" rx="2.5" fill="#ff2d2d" />
    </svg>
  )
}
