/**
 * Trustpilot-sterren als scherpe SVG: vaste groene vlakken met witte ster,
 * identiek aan de officiële Trustpilot-rating. `rating` 0–5 (hele sterren).
 */
export function TrustpilotStars({
  rating = 5,
  size = 28,
}: {
  rating?: number;
  size?: number;
}) {
  const gap = 3;
  const width = size * 5 + gap * 4;
  return (
    <svg
      width={width}
      height={size}
      viewBox={`0 0 ${width} ${size}`}
      role="img"
      aria-label={`${rating} van 5 sterren`}
      shapeRendering="crispEdges"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const x = i * (size + gap);
        const filled = i < rating;
        return (
          <g key={i}>
            <rect
              x={x}
              y={0}
              width={size}
              height={size}
              fill={filled ? "#00b67a" : "#dcdce6"}
            />
            <path
              transform={`translate(${x + size / 2}, ${size / 2}) scale(${size / 28})`}
              d="M0 -9 L2.6 -3.2 L9 -2.4 L4.3 1.9 L5.5 8.3 L0 5.2 L-5.5 8.3 L-4.3 1.9 L-9 -2.4 L-2.6 -3.2 Z"
              fill="#ffffff"
              shapeRendering="geometricPrecision"
            />
          </g>
        );
      })}
    </svg>
  );
}
