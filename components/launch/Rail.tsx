/**
 * Desktop-only (≥1320px) scroll rail. The marker is translated by
 * ScrollEffects; everything else is static.
 */
export default function Rail() {
  return (
    <div className="rail" aria-hidden="true">
      <svg viewBox="0 0 34 240">
        <path
          d="M17 4 L27 40 L27 190 L33 214 L1 214 L7 190 L7 40 Z"
          fill="none"
          stroke="#4A5A73"
          strokeWidth="1"
        />
        <line x1="7" y1="60" x2="27" y2="60" stroke="#2A3547" />
        <line x1="7" y1="110" x2="27" y2="110" stroke="#2A3547" />
        <line x1="7" y1="150" x2="27" y2="150" stroke="#2A3547" />
        <line x1="7" y1="190" x2="27" y2="190" stroke="#2A3547" />
        <g className="mk" id="railmk">
          <circle cx="17" cy="20" r="4" fill="#F2A93B" />
          <circle cx="17" cy="20" r="8" fill="none" stroke="#F2A93B" opacity=".4" />
        </g>
        <text className="lbl" x="17" y="236" textAnchor="middle">
          STA
        </text>
      </svg>
    </div>
  );
}
