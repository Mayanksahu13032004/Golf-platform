export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <h2 className="text-white text-2xl font-bold">
          Loading...
        </h2>
      </div>
    </div>
  );
}