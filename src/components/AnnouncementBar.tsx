const usps = [
  "Altijd korting op make-up",
  "Vergelijk & bespaar direct",
  "Honderden exclusieve deals",
];

export function AnnouncementBar() {
  return (
    <div className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 py-2 text-xs font-medium text-charcoal sm:text-sm">
        {usps.map((u) => (
          <span key={u} className="flex items-center gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-coral)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {u}
          </span>
        ))}
      </div>
    </div>
  );
}
