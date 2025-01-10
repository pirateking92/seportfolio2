// loading.tsx (in the same directory as your page)
export default function Loading() {
  return (
    <div className="relative flex flex-col min-h-screen animate-pulse">
      <main className="flex-grow pt-24">
        <div className="w-full h-[400px] bg-slate-700/20 rounded-lg mb-6" />
        <div className="mx-auto max-w-4xl px-6">
          <div className="h-8 bg-slate-700/20 w-3/4 rounded mb-4" />
          <div className="space-y-3">
            <div className="h-4 bg-slate-700/20 w-full rounded" />
            <div className="h-4 bg-slate-700/20 w-5/6 rounded" />
            <div className="h-4 bg-slate-700/20 w-4/6 rounded" />
          </div>
        </div>
      </main>
    </div>
  );
}
