// app/cv/loading.tsx
export default function Loading() {
  return (
    <div className="flex-grow pt-24 m-5 mb-6 px-10">
      <div className="h-8 bg-slate-700 w-48 rounded animate-pulse"></div>
      <div className="mt-10 space-y-4">
        <div className="h-4 bg-slate-700 w-full rounded animate-pulse"></div>
        <div className="h-4 bg-slate-700 w-3/4 rounded animate-pulse"></div>
        <div className="h-4 bg-slate-700 w-5/6 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
