export default function HowItWorks() {
  return (
    <section className="py-20 px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="font-bold text-xl">
            1. Subscribe
          </h3>

          <p className="text-zinc-400 mt-3">
            Join monthly or yearly.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="font-bold text-xl">
            2. Add Scores
          </h3>

          <p className="text-zinc-400 mt-3">
            Keep your latest 5 scores.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="font-bold text-xl">
            3. Win Rewards
          </h3>

          <p className="text-zinc-400 mt-3">
            Enter monthly prize draws.
          </p>
        </div>

      </div>

    </section>
  );
}