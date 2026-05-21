export default function DashboardLoading() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <p className="text-sm text-zinc-500">Loading dashboard…</p>
      </div>
    </div>
  );
}
