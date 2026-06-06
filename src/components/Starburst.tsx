/** Coral starburst-badge met %-teken, in de stijl van een kortingslabel. */
export function Starburst({ size = 150 }: { size?: number }) {
  const points = 12;
  const cx = 100;
  const cy = 100;
  const outer = 96;
  const inner = 80;
  const path = Array.from({ length: points * 2 })
    .map((_, i) => {
      const r = i % 2 === 0 ? outer : inner;
      const a = (Math.PI / points) * i - Math.PI / 2;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <path d={`${path} Z`} fill="var(--color-coral)" />
      <text
        x="100"
        y="100"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="78"
        fontWeight="700"
        fill="#fff"
        fontFamily="var(--font-inter), sans-serif"
      >
        %
      </text>
    </svg>
  );
}
