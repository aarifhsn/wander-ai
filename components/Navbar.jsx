import { Map } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ecfdf5_100%)]"></div>

      <nav className="absolute top-0 left-0 right-0 z-50 w-full py-6 px-6 lg:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-slate-900">
          <Map className="w-6 h-6 text-emerald-600" />
          <span className="text-lg font-medium tracking-tight">Wanderlust</span>
        </Link>
      </nav>
    </>
  );
}
