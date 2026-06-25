export default function Stats() {
  const stats = [
    {
      title: "Active Players",
      value: "2,500+",
    },
    {
      title: "Prize Pool",
      value: "₹25 Lakh+",
    },
    {
      title: "Charities Supported",
      value: "100+",
    },
    {
      title: "Monthly Winners",
      value: "250+",
    },
  ];

  return (
    <section className="py-20 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center"
            >
              <h3 className="text-4xl font-extrabold text-blue-500">
                {item.value}
              </h3>

              <p className="mt-3 text-zinc-400">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}