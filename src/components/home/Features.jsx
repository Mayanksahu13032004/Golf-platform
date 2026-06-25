export default function Features() {
  const features = [
    "Monthly Prize Draws",
    "Charity Donations",
    "Track Golf Scores",
    "Secure Membership",
  ];

  return (
    <section className="py-20 px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        Why Join?
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {features.map((item) => (
          <div
            key={item}
            className="bg-zinc-900 p-6 rounded-xl text-center"
          >
            <h3 className="font-bold">
              {item}
            </h3>
          </div>
        ))}

      </div>

    </section>
  );
}