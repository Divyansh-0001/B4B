import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Be4Breach Platform</h1>
        <p className="mt-4 text-neutral-400 mb-8">Frontend initialized successfully</p>
        
        <Link 
          href="/demo"
          className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
        >
          View 3D Demo
        </Link>
      </div>
    </main>
  );
}
