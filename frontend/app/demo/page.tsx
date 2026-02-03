import { SplineSceneBasic } from "@/components/demo"

export default function DemoPage() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Spline 3D Integration Demo
          </h1>
          <p className="text-neutral-400 text-lg">
            Interactive 3D scenes powered by Spline, integrated with shadcn/ui components
          </p>
        </div>

        <div className="space-y-8">
          <SplineSceneBasic />
        </div>

        <div className="mt-12 text-center text-neutral-500">
          <p>Built with Next.js, TypeScript, Tailwind CSS, and Spline</p>
        </div>
      </div>
    </main>
  )
}
