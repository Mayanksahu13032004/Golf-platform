export default function Pricing() {
  return (
    <section className="py-20 px-6">

      <h2 className="text-4xl font-bold text-center mb-10">
        Membership Plans
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-zinc-900 p-8 rounded-xl">

          <h3 className="text-2xl font-bold">
            Monthly
          </h3>

          <p className="text-5xl font-bold mt-5">
            ₹499
          </p>

        </div>

        <div className="bg-zinc-900 p-8 rounded-xl">

          <h3 className="text-2xl font-bold">
            Yearly
          </h3>

          <p className="text-5xl font-bold mt-5">
            ₹4999
          </p>

        </div>

      </div>

    </section>
  );
}