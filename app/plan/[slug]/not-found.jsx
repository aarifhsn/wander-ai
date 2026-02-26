import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="text-8xl mb-6">🗺️</div>
        <h1 className="text-4xl md:text-5xl font-medium text-slate-900 mb-4">
          Travel Plan Not Found
        </h1>
        <p className="text-xl text-slate-500 mb-8">
          The travel plan you're looking for doesn't exist. Let's create a new
          one!
        </p>
        <Link
          href="/"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg text-lg font-medium"
        >
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
