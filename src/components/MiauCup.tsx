interface MiauCupProps {
  label: string
  progress: number
}

export function MiauCup({ label, progress }: MiauCupProps) {
  const clampedProgress = Math.min(1, Math.max(0, progress))
  const fillTop = 482 - clampedProgress * 352
  const fillHeight = clampedProgress * 352
  const surfaceProgress = Math.min(1, Math.max(0, (clampedProgress - .8) / .2))

  return (
    <svg className="miau-cup-svg" viewBox="0 0 520 520" role="img" aria-label={label}>
      <defs>
        <filter id="paper-wobble" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" />
        </filter>
        <pattern id="pencil-grain" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M2 4l7-2M4 12l10-3M12 17l4-1" stroke="#78534a" strokeWidth=".8" opacity=".12" />
        </pattern>
        <clipPath id="cup-fill-clip">
          <path d="M132 114C174 75 393 67 462 108l-20 296c-4 55-55 79-151 78-98-1-143-24-148-77z" />
        </clipPath>
      </defs>

      <ellipse className="cup-shadow-svg" cx="275" cy="474" rx="185" ry="19" />

      <g className="cup-character" filter="url(#paper-wobble)">
        <path className="handle-outline" d="M151 172C69 149 43 204 49 279c5 64 45 89 110 62" />
        <path className="handle-fill" d="M151 172C69 149 43 204 49 279c5 64 45 89 110 62" />

        <path className="cup-body-svg" d="M132 114C174 75 393 67 462 108l-20 296c-4 55-55 79-151 78-98-1-143-24-148-77z" />
        <g className="brew-level" clipPath="url(#cup-fill-clip)">
          <rect className="brew-fill" x="130" y={fillTop} width="335" height={fillHeight} />
          {clampedProgress > .01 && <path className="brew-level-line" d={`M132 ${fillTop + 4}c48-13 77 13 123 0s79 13 126 0 65 10 83 0`} />}
        </g>
        <ellipse className="cup-rim-outline" cx="297" cy="116" rx="166" ry="55" />
        <ellipse className="cup-inside-svg" cx="297" cy="116" rx="154" ry="44" />
        <ellipse className="svg-liquid" cx="297" cy="122" rx="142" ry="34" style={{ opacity: surfaceProgress * .88 }} />

        <g className="cup-hearts">
          <path d="M169 176c-15-18-34 4-4 27 30-24 9-45 4-27Z" />
          <path d="M411 177c-12-15-28 3-3 23 25-20 8-37 3-23Z" />
          <path d="M391 242c-10-13-25 2-3 20 23-18 7-33 3-20Z" />
          <path d="M423 313c-11-14-27 3-3 21 24-19 7-35 3-21Z" />
        </g>

        <g className="cat-shape">
          <path className="cat-tail-outline" d="M196 309c-56-22-74 13-101 23-18 7-35-2-47-15" />
          <path className="cat-tail-fill" d="M194 309c-49-17-66 14-93 25-20 8-40-1-51-13" />
          <path className="cat-body" d="M177 256c17-18 40-19 63-8l37 17 3-81 47 34 59-24 8 87c29 54 25 125 6 201l-58-1-9-57-38 6-1 52-69-2c-18-62-38-135-49-224Z" />
          <path className="cat-ear cat-ear-left" d="M281 218l-1-61 48 43Z" />
          <path className="cat-ear cat-ear-right" d="M342 205l49-29-2 71Z" />
          <path className="ear-inner" d="M291 194l1-21 18 20ZM365 201l15-9-1 24Z" />

          <path className="cat-patch patch-back" d="M180 267c22-25 58-23 87-1l-20 67c-34 3-54-23-67-66Z" />
          <path className="cat-patch patch-face" d="M331 207c28-5 48-19 59-25l2 103c-21 4-43-14-63-34Z" />
          <path className="cat-patch patch-side" d="M363 339c26 14 39 39 42 78l-48 37c-20-35-22-76 6-115Z" />
          <path className="cat-patch patch-foot" d="M220 405c27-15 57 5 73 21l-4 54-54-2c-14-22-19-47-15-73Z" />

          <g className="cat-eyes">
            <ellipse cx="321" cy="265" rx="12" ry="16" />
            <ellipse cx="365" cy="263" rx="12" ry="16" />
            <circle className="eye-shine" cx="325" cy="260" r="3" />
            <circle className="eye-shine" cx="369" cy="258" r="3" />
          </g>
          <path className="cat-nose" d="M343 284l12 1-7 9Z" />
          <path className="cat-mouth" d="M348 293c-1 18-22 17-24 6m24-6c1 18 21 17 24 5" />
          <path className="whiskers" d="M332 293l-42-8m41 17-43 5m72-15 43-13m-42 22 45 3" />
        </g>

        <path className="grain-overlay" d="M132 114C174 75 393 67 462 108l-20 296c-4 55-55 79-151 78-98-1-143-24-148-77z" />
      </g>
    </svg>
  )
}
