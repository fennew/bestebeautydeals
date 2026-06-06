const items = [
  {
    title: "Altijd de scherpste deals",
    sub: "voor jouw beauty",
    icon: (
      <>
        <path d="M12 2v20M7 5h8a3 3 0 010 6H8a3 3 0 000 6h9" />
      </>
    ),
  },
  {
    title: "Altijd de beste producten",
    sub: "zorgvuldig geselecteerd",
    icon: (
      <path d="M12 2l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.8 6.8 18.1l1-5.8L3.5 8.2l5.9-.9L12 2z" />
    ),
  },
  {
    title: "Vertrouwd door 200.000+",
    sub: "vrouwen gingen je voor",
    icon: (
      <path d="M9 11a3 3 0 100-6 3 3 0 000 6zM2 20a7 7 0 0114 0zM17 11a3 3 0 10-2-5.2M22 20a7 7 0 00-5-6.7" />
    ),
  },
  {
    title: "Zo geregeld",
    sub: "in 1 minuut jouw match",
    icon: <path d="M12 22a10 10 0 100-20 10 10 0 000 20zM8 12l3 3 5-6" />,
  },
];

export function TrustBar() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-2xl font-semibold tracking-tight text-teal">
          Jij verdient de beste deal
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center"
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-teal)"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {item.icon}
              </svg>
              <p className="mt-3 font-display text-lg leading-tight text-teal">
                {item.title}
              </p>
              <p className="text-sm text-muted">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
