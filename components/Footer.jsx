export default function Footer() {
  return (
    <footer className="w-full bg-[#0d0d0d] border-t border-[#c9a84c]/20 py-6 px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
        <span className="font-serif text-base font-black tracking-tight text-[#f5f0e8]">
          Wander<span className="text-[#c9a84c]">.</span>AI
        </span>

        <p className="text-xs tracking-widest text-[#6b6255]">
          Press{" "}
          <span className="font-mono border border-[#c9a84c]/30 text-[#c9a84c] px-2 py-0.5 text-xs tracking-wider">
            ENTER
          </span>{" "}
          to generate your itinerary
        </p>

        <span className="text-xs tracking-widest uppercase text-[#6b6255]">
          AI-Powered Travel Planning
        </span>
      </div>
    </footer>
  );
}
