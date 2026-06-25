"use client";

export default function Error({
  error,
  reset,
}) {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <div className="text-center">

        <h1 className="text-red-500 text-7xl font-black">
          Oops!
        </h1>

        <p className="text-white text-2xl mt-4">
          Something went wrong.
        </p>

        <button
          onClick={reset}
          className="bg-blue-600 mt-8 px-8 py-3 rounded-xl"
        >
          Try Again
        </button>

      </div>

    </div>
  );
}