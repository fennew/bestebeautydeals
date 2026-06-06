const items = [
  {
    title: "30 dagen garantie",
    sub: "Niet tevreden? Geld terug.",
    icon: (
      <path d="M12 2l8 3v6c0 5-3.4 8.5-8 11-4.6-2.5-8-6-8-11V5l8-3z" />
    ),
  },
  {
    title: "Gratis verzending",
    sub: "Op alle bestellingen in Nederland.",
    icon: <path d="M3 6h11v8H3zM14 9h4l3 3v2h-7zM7 18a2 2 0 100-4 2 2 0 000 4zM18 18a2 2 0 100-4 2 2 0 000 4z" />,
  },
  {
    title: "200.000+ klanten",
    sub: "Vertrouwd door meer dan 200.000+ vrouwen.",
    icon: (
      <path d="M9 11a3 3 0 100-6 3 3 0 000 6zM2 20a7 7 0 0114 0zM17 11a3 3 0 10-2-5.2M22 20a7 7 0 00-5-6.7" />
    ),
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-line bg-cream">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-teal)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              {item.icon}
            </svg>
            <div>
              <p className="font-display text-lg leading-tight text-teal">
                {item.title}
              </p>
              <p className="text-sm text-muted">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
